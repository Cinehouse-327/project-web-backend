import Profile from "../../models/akif/profileModel.js";

/**
 * Get the profile details.
 */
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ email: req.query.email });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile.", error: error.message });
  }
};

/**
 * Update profile details.
 */
export const updateProfile = async (req, res) => {
  try {
    const { email } = req.body;
    const profile = await Profile.findOneAndUpdate({ email }, req.body, { new: true });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }
    res.status(200).json({ message: "Profile updated successfully.", profile });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile.", error: error.message });
  }
};
