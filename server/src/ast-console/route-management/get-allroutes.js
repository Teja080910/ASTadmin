import { db1 } from "../../db.js";

export const AllRoutes = async (req, res) => {

  const { admail } = req.query;
  try {
    const admin = await db1.collection('Hackathonadmin').findOne({ Gmail: admail });
    if (admin) {
      const route = await db1.collection('Hackathonadmin').findOne({ Gmail: "hackathon@gmail.com" })
      res.json({ routes: route?.Routes });
    } else {
      res.json({ error: 'Admin or routes not found' });
    }
  } catch (error) {
    console.error('Error fetching routes:', error);
    res.json({ error: 'Internal server error' });
  }
}