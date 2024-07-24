// Import necessary modules
import { db1 } from "../../db.js";

export const deleteRoute = async (req, res) => {
  const { path } = req.body;

  if (!path) {
    return res.status(400).json({ error: 'Path and admin email are required' });
  }

  try {
    // Unset the specified route
    const result = await db1.collection('Hackathonadmin').updateOne(
      { Gmail: "hackathon@gmail.com" },
      { $unset: { [`Routes.${path}`]: "" } }
    );

    if (result.modifiedCount > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Route or admin not found' });
    }
  } catch (error) {
    console.error('Error deleting route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
