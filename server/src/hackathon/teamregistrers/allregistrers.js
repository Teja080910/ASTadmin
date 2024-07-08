import { db1 } from "../../db.js"
export const AllTeamRegistrers = async (res) => {
   try {
    const allteams = await db1.collection("Htrs").find().toArray()
    if (allteams) {
        res.json(allteams)
    }
   } catch (error) {
    
   }
}