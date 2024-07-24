import { db1 } from "../../db.js";

export const ToggleRoutes = async (req, res) => {
  const { path, adminEmail } = req.body;

  if (!path || !adminEmail) {
    return res.status(400).json({ error: 'Path and admin email are required' });
  }

  try {
    // Find the current visibility status of the route
    const admin = await db1.collection('Hacthonadmin').findOne({ Gmail: adminEmail });

    if (!admin || !admin.Routes || admin.Routes[path] === undefined) {
      return res.status(404).json({ error: 'Route or admin not found' });
    }

    const currentVisibility = admin.Routes[path];

    // Update the visibility status of the route
    const update = { [`Routes.${path}`]: !currentVisibility };
    const result = await db1.collection('Hacthonadmin').updateOne(
      { Gmail: adminEmail },
      { $set: update }
    );

    if (result.modifiedCount > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Route or admin not found' });
    }
  } catch (error) {
    console.error('Error toggling route visibility:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};