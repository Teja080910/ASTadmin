import { db1 } from "../../db.js";

export const AllRoutes = async(req,res)=>{

    const { adminEmail } = req.query;

    if (!adminEmail) {
      return res.status(400).json({ error: 'Admin email is required' });
    }
  
    try {
      const admin = await db1.collection('Hacthonadmin').findOne({ Gmail: adminEmail });
  
      if (admin && admin.Routes) {
        res.json(admin.Routes);
      } else {
        res.json({ error: 'Admin or routes not found' });
      }
    } catch (error) {
      console.error('Error fetching routes:', error);
      res.json({ error: 'Internal server error' });
    }
}