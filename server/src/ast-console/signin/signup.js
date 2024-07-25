import { db1 } from "../../db.js";

export const ConsoleRegister = async (data, res) => {
  const { mail, password, phone, event, club, date, members,name } = data.body;
  console.log(data)
  try {
    const admin = await db1
      .collection("Hackathonadmin")
      .findOne({ Gmail: mail });
    if (admin) {
      return res.json({ error: "exist admin" });
    } else {
      await db1
        .collection("Hackathonadmin")
        .insertOne({
          Gmail: mail,
          Event: event,
          Number: phone,
          Password: password,
          Club: club,
          Name:name,
          Date: date,
          NoOfAdmins: members,
          Routes:{},
          Admins: [mail],
          isOwner: false,
          isOrg:true,
          isSuperAdmin: false,
          isAdmin: false,
          isEdit:false

        })
        .then((details) => {
          res.json({ message: "sucess", data: details });
        })
        .catch((e) => console.log(e));
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error during signup" });
  }
};
