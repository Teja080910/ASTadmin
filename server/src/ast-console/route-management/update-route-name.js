import { db1 } from "../../db.js";

export const updateRouteName = async (req, res) => {
  const { oldPath, newPath, adminEmail } = req.body;

  if (!oldPath || !newPath || !adminEmail) {
    return res.status(400).json({ error: 'Old path, new path, and admin email are required' });
  }

  try {
    // Fetch the existing route details
    const adminData = await db1.collection('Hacthonadmin').findOne(
      { Gmail: adminEmail, [`Routes.${oldPath}`]: { $exists: true } },
      { projection: { [`Routes.${oldPath}`]: 1 } }
    );

    if (!adminData) {
      return res.status(404).json({ error: 'Route or admin not found' });
    }

    const oldRouteDetails = adminData.Routes[oldPath];

    // Set the new route with the value of the old route details
    const result = await db1.collection('Hacthonadmin').updateOne(
      { Gmail: adminEmail },
      { $set: { [`Routes.${newPath}`]: oldRouteDetails } }
    );

    if (result.modifiedCount > 0) {
      // Remove the old route after successfully adding the new one
      await db1.collection('Hacthonadmin').updateOne(
        { Gmail: adminEmail },
        { $unset: { [`Routes.${oldPath}`]: "" } }
      );
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Failed to update route name' });
    }
  } catch (error) {
    console.error('Error updating route name:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
