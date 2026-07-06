// services/holdExpiryService.js
// Idempotent 24-hour hold expiry logic.
// Section 7.2: expires holds Pending→Expired regardless of user page-loads.
// Called by: cron schedule in server.js (every 5 min) AND lazily before placeHold.

import { supabaseAdmin } from '../config/supabase.js';
import { notifyUser } from '../controllers/notificationController.js';

/**
 * Finds all Pending bookings past their expires_at timestamp and flips them to Expired.
 * Also reverts the property's availability_status to 'Available'.
 *
 * This function is idempotent — safe to run multiple times concurrently.
 * Returns the number of holds expired in this run.
 */
export const expireHolds = async () => {
  try {
    const now = new Date().toISOString();

    // Find all expired-but-still-Pending bookings
    const { data: expiredBookings, error } = await supabaseAdmin
      .from('bookings')
      .select('booking_id, student_id, property_id, properties!property_id (title, landlord_id)')
      .eq('status', 'Pending')
      .lt('expires_at', now); // expires_at < NOW

    if (error) {
      console.error('expireHolds query error:', error);
      return 0;
    }

    if (!expiredBookings?.length) return 0;

    const bookingIds = expiredBookings.map(b => b.booking_id);

    // Update all expired bookings in one query
    await supabaseAdmin
      .from('bookings')
      .update({ status: 'Expired' })
      .in('booking_id', bookingIds)
      .eq('status', 'Pending'); // extra guard — idempotent

    // Revert each property to Available and notify parties
    for (const booking of expiredBookings) {
      // Revert property availability
      await supabaseAdmin
        .from('properties')
        .update({ availability_status: 'Available' })
        .eq('property_id', booking.property_id)
        .eq('availability_status', 'Pending'); // only revert if it's still Pending

      const title = booking.properties?.title || 'the property';

      // Notify the student
      await notifyUser(
        booking.student_id,
        'System',
        `Your 24-hour reservation hold for "${title}" has expired because the landlord did not respond in time. The property is now available for others.`,
        booking.property_id, booking.booking_id, 'InApp'
      );

      // Notify the landlord (if they missed it)
      if (booking.properties?.landlord_id) {
        await notifyUser(
          booking.properties.landlord_id,
          'System',
          `A reservation hold for "${title}" expired without a response. The property has been returned to Available.`,
          booking.property_id, booking.booking_id, 'InApp'
        );
      }
    }

    console.log(`✅ expireHolds: ${expiredBookings.length} hold(s) expired.`);
    return expiredBookings.length;
  } catch (err) {
    console.error('expireHolds service error:', err);
    return 0;
  }
};
