import express from "express";
import { getProfile, updateProfile } from "../../controllers/akif/profileController.js";

const router = express.Router();

/**
 * @route GET /profile
 * @desc Get profile details
 */
router.get("/", getProfile);

/**
 * @route PUT /profile
 * @desc Update profile details
 */
router.put("/", updateProfile);

export default router;
