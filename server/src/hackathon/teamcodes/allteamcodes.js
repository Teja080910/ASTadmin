import { db1 } from "../../db.js";

export const AllTeamCodes = async (res) => {
  try {
    const allteams = await db1.collection("Teams").find({}, { projection: { Password: 0 } }).toArray();
    if (allteams) {
      res.json(allteams);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
