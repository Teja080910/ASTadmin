import { db1 } from "../../db.js";

export const AllTeamRegistrers = async (req, res) => {
  try {
    const allteams = await db1
      .collection("Htrs")
      .find({}, { projection: { Password: 0 } }) // Exclude the password field
      .toArray();
    if (allteams) {
      res.json(allteams);
    }
  } catch (error) {
    console.error("Error fetching team registrers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
