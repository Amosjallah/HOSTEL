// routes/reviews.js
import express from 'express';
import { submitReview, getPropertyReviews, getMyReviews } from '../controllers/reviewController.js';
import { authenticate, requireStudent } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, requireStudent, submitReview);         // UC-S07 (gated)
router.get('/mine', authenticate, requireStudent, getMyReviews);
router.get('/property/:property_id', getPropertyReviews);

export default router;
