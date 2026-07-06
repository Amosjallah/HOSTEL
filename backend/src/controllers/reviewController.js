// controllers/reviewController.js
// Booking-gated review submission and management.
// UC-S07: Submit Review & Rating
// Section 7.3: Hard review gating rule enforced server-side.

import { supabaseAdmin } from '../config/supabase.js';

// ─── UC-S07: Submit Review (GATED) ───────────────────────────────────────────
export const submitReview = async (req, res) => {
  try {
    const studentId = req.user.user_id;
    const { property_id, booking_id, rating, comment } = req.body;

    // ─── Section 7.3: HARD GATE — Must verify Approved booking server-side ────
    // This check MUST run even if the UI never exposes the form — assume malicious POST
    const { data: booking, error: bookingError } = await supabaseAdmin
      .from('bookings')
      .select('booking_id, student_id, property_id, status')
      .eq('booking_id', booking_id)
      .eq('student_id', studentId)          // must be the same student
      .eq('property_id', property_id)       // must be the same property
      .eq('status', 'Approved')             // MUST be Approved — hard gate
      .single();

    if (bookingError || !booking) {
      return res.status(403).json({
        error: 'You can only review a property after a confirmed and approved reservation. No approved booking found.'
      });
    }

    // Check review doesn't already exist for this booking (UNIQUE constraint)
    const { data: existingReview } = await supabaseAdmin
      .from('reviews')
      .select('review_id')
      .eq('student_id', studentId)
      .eq('booking_id', booking_id)
      .single();

    if (existingReview) {
      return res.status(409).json({
        error: 'You have already submitted a review for this booking.'
      });
    }

    // Validate rating
    const ratingNum = parseInt(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
    }

    const { data: review, error } = await supabaseAdmin
      .from('reviews')
      .insert({
        student_id: studentId,
        property_id: parseInt(property_id),
        booking_id: parseInt(booking_id),
        rating: ratingNum,
        comment: comment?.trim() || null
      })
      .select()
      .single();

    if (error) {
      console.error('submitReview error:', error);
      return res.status(500).json({ error: 'Failed to submit review.' });
    }

    res.status(201).json({
      message: 'Review submitted successfully. Thank you for your feedback!',
      review
    });
  } catch (err) {
    console.error('submitReview controller error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

// ─── GET: All reviews for a property ─────────────────────────────────────────
export const getPropertyReviews = async (req, res) => {
  try {
    const { property_id } = req.params;

    const { data, error } = await supabaseAdmin
      .from('reviews')
      .select('*, users!student_id (full_name)')
      .eq('property_id', property_id)
      .eq('is_flagged', false)
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: 'Failed to fetch reviews.' });

    res.json({ reviews: data || [] });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
};

// ─── GET: Student's own reviews ───────────────────────────────────────────────
export const getMyReviews = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('reviews')
      .select(`*, properties!property_id (title, address, neighborhood)`)
      .eq('student_id', req.user.user_id)
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: 'Failed to fetch reviews.' });

    res.json({ reviews: data || [] });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
};
