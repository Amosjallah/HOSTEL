// routes/map.js
import express from 'express';
import { getMapProperties } from '../controllers/propertyController.js';

const router = express.Router();

// Public endpoint for map pins
router.get('/pins', getMapProperties);

export default router;
