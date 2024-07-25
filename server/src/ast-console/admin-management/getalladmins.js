import { db1 } from "../../db.js";

export const getAdmins = async (req, res) => {
  const { admail } = req.headers;

  try {
    const currentAdmin = await db1.collection("Hackathonadmin").findOne({ Gmail: admail });
    if (!currentAdmin) {
      return res.json({ error: "Admin not found" });
    }
    let adminEmails;
    if (currentAdmin.isOrg) {
      adminEmails = currentAdmin.Admins;
    } else {
      const orgAdmin = await db1.collection("Hackathonadmin").findOne({ Gmail: currentAdmin.myOrgEmail });
      if (orgAdmin) {
        adminEmails = orgAdmin.Admins;
      } else {
        return res.status(404).json({ error: "Organization admin not found" });
      }
    }
    const adminDetails = await db1.collection("Hackathonadmin").find({ Gmail: { $in: adminEmails } }).toArray();

    return res.json({ admins: adminDetails });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching admins" });
  }
};
