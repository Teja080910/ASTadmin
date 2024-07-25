import { db1 } from "../../db.js";

export const deleteAdmin = async (req, res) => {
  const { admail } = req.headers;
  const { adminMail } = req.body; 

  if (!adminMail) {
    return res.json({ error: "Admin email to delete is required" });
  }

  try {
   
    const currentAdmin = await db1.collection("Hackathonadmin").findOne({ Gmail: admail });

    if (!currentAdmin) {
      return res.json({ error: "Current admin not found" });
    }

    if (!currentAdmin.isOrg && !currentAdmin.isSuperAdmin) {
      return res.json({ error: "Unauthorized to delete admins" });
      
    }
   const admindata= await db1.collection("Hackathonadmin").findOne({Gmail:adminMail})
    if(admindata){


      await db1.collection("Hackathonadmin").updateOne(
        { Gmail: admindata.myOrgEmail },
        { $pull: { Admins: adminMail } }
      );

    }
 

    await db1.collection("Hackathonadmin").deleteOne({ Gmail: adminMail });

    
   
   


    res.json({ message: "Admin deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting admin" });
  }
};
