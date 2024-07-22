// Import necessary modules
import { db1 } from "../../db.js";

export const deleteRoute = async (req, res) => {
  const { path, adminEmail } = req.body;

  if (!path || !adminEmail) {
    return res.json({ error: 'Path and admin email are required' });
  }

  try {
    const result = await db1.collection('Hacthonadmin').updateOne(
      { Gmail: adminEmail },
      { $pull: { Routes: { path } } }
    );

    if (result.modifiedCount > 0) {
      res.json({ success: true });
    } else {
      res.json({ error: 'Route or admin not found' });
    }
  } catch (error) {
    console.error('Error deleting route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
