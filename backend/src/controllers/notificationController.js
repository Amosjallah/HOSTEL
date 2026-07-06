// controllers/notificationController.js
// In-app notification center + SMS stub integration.
// UC-S08 (Vacancy Alerts), UC-L04 (Booking notifications), UC-A01 (Verification)

import { supabaseAdmin } from '../config/supabase.js';
import { getSmsProvider } from '../services/smsProviderFactory.js';

/**
 * Core utility: create an in-app notification record.
 * Called from all other controllers whenever an event occurs.
 */
export const notifyUser = async (
  recipientId, type, message, relatedPropertyId = null,
  relatedBookingId = null, channel = 'InApp'
) => {
  try {
    const { error } = await supabaseAdmin
      .from('notifications')
      .insert({
        recipient_id: recipientId,
        type,
        message,
        related_property_id: relatedPropertyId,
        related_booking_id: relatedBookingId,
        delivery_channel: channel
      });

    if (error) console.error('Notification insert error:', error);

    // SMS delivery via pluggable provider (if channel includes SMS)
    if (channel === 'SMS' || channel === 'Both') {
      const smsProvider = getSmsProvider();
      const { data: recipient } = await supabaseAdmin
        .from('users').select('phone').eq('user_id', recipientId).single();
      if (recipient?.phone) {
        await smsProvider.send(recipient.phone, message);
      }
    }
  } catch (err) {
    console.error('notifyUser error:', err);
  }
};

/**
 * GET /api/notifications
 * Fetch all notifications for the authenticated user.
 * Returns unread count for badge display.
 */
export const getNotifications = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('notifications')
      .select('*')
      .eq('recipient_id', req.user.user_id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) return res.status(500).json({ error: 'Failed to fetch notifications.' });

    const unreadCount = data.filter(n => !n.is_read).length;

    res.json({ notifications: data, unread_count: unreadCount });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
};

/**
 * PATCH /api/notifications/:id/read
 * Mark a single notification as read.
 */
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabaseAdmin
      .from('notifications')
      .update({ is_read: true })
      .eq('notification_id', id)
      .eq('recipient_id', req.user.user_id); // Security: user can only mark their own

    if (error) return res.status(500).json({ error: 'Failed to update notification.' });

    res.json({ message: 'Notification marked as read.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
};

/**
 * PATCH /api/notifications/mark-all-read
 * Mark all of the user's notifications as read.
 */
export const markAllAsRead = async (req, res) => {
  try {
    const { error } = await supabaseAdmin
      .from('notifications')
      .update({ is_read: true })
      .eq('recipient_id', req.user.user_id)
      .eq('is_read', false);

    if (error) return res.status(500).json({ error: 'Failed to update notifications.' });

    res.json({ message: 'All notifications marked as read.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
};
