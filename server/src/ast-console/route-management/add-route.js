import { db1 } from "../../db.js";

export const AddRoute = async (req, res) => {
  const { path } = req.body;

  if (path) {
    try {
      const result = await db1.collection('Hackathonadmin').updateOne(
        { Gmail: "hackathon@gmail.com" },
        {
          $set: { [`Routes.${path}`]: true }
        }
      );

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
