// Import necessary modules
import { db1 } from "../../db.js";

export const updateRouteName = async (req, res) => {
  const { path, newName, adminEmail } = req.body;

  if (!path || !newName || !adminEmail) {
    return res.status(400).json({ error: 'Path, new name, and admin email are required' });
  }

  try {
    const result = await db1.collection('Hacthonadmin').updateOne(
      { Gmail: adminEmail, 'Routes.path': path },
      { $set: { 'Routes.$.name': newName } }
    );

    if (result.modifiedCount > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Route or admin not found' });
    }
  } catch (error) {
    console.error('Error updating route name:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
