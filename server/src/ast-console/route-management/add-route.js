import { db1 } from "../../db.js";

export const AddRoute = async (req, res) => {
  const { path, name, adminEmail } = req.body;

  if (path && name && adminEmail) {
    try {
      const newRoute = { path, name, visible: true };
      
      const result = await db1.collection('Hacthonadmin').updateOne(
        { Gmail: adminEmail },
        { $push: { Routes: newRoute } }
      );
console.log(result)
      if (result.modifiedCount > 0) {
        res.json({ success: true });
      } else {
        res.json({ error: 'Admin not found or route not added' });
      }
    } catch (error) {
      console.error('Error adding route:', error);
      res.json({ error: 'Internal server error' });
    }
  } else {
    res.json({ error: 'Invalid route data or admin email' });
  }
};
