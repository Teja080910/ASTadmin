import { db1 } from "../../db.js";

export const AllTechTeamMembers = async (res) => {
  try {
    const allTechTeamMembers = await db1
      .collection("TechTeamMembers")
      .find({}, { projection: { Password: 0 } })
      .toArray();
    if (allTechTeamMembers) {
      res.json(allTechTeamMembers);
    }
  } catch (error) {
    console.error("Error fetching tech team members:", error);
    res.json({ error: "Internal Server Error" });
  }
};
