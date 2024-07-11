import { db1 } from "../../db.js";

export const AllTeamRegistrers = async ( res) => {
  try {
    const allteams = await db1
      .collection("Htrs")
      .find({}, { projection: { Password: 0 } })
      .toArray();
    if (allteams) {
      res.json(allteams);
    }
  } catch (error) {
    console.error("Error fetching team registrers:", error);
    res.json({ error: "Internal Server Error" });
  }
};
