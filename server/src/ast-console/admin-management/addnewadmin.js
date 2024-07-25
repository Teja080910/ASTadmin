import { db1 } from "../../db.js";

export const addNewAdmin = async (req, res) => {
  const { mail, password, phone, adminType } = req.body;
  const { admail } = req.headers;

  let isSuperAdmin = false;
  let isEdit = false;
  let isAdmin = false;

  if (adminType === "superAdmin") {
    isSuperAdmin = true;
    isAdmin = true;
    isEdit = true;
  } else if (adminType === "admin") {
    isAdmin = true;
  }
  else if (adminType === "edit") {

    isAdmin = true;
    isEdit=true;
  
  } else {
    return res.json({ error: "admin type invalid" });
  }

  try {
    const ownerAdmin = await db1.collection("Hackathonadmin").findOne({ Gmail: admail });
    if (!ownerAdmin || (!ownerAdmin.isOwner && !ownerAdmin.isSuperAdmin)) {
      return res.json({ error: "You do not have the required permissions to add a new admin" });
    }

    const existingAdmin = await db1.collection("Hackathonadmin").findOne({ Gmail: mail });
    if (existingAdmin) {
      return res.json({ error: "Admin with this email already exists" });
    } else {
      const details = await db1.collection("Hackathonadmin").insertOne({
        Gmail: mail,
        myOrgEmail: admail,
        Number: phone,
        Password: password,
        isOwner: false,
        isOrg:false,
        isSuperAdmin: isSuperAdmin,
        isAdmin: isAdmin,
        isEdit:isEdit
      });

      await db1.collection("Hackathonadmin").findOneAndUpdate(
        { Gmail: admail },
        { $push: { Admins: mail } }
      );

      res.json({ message: "success", data: details });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error during signup" });
  }
};
