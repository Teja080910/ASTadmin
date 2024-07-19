import { db1 } from "../../db.js";
import { message } from "./message.js";


export const UpdateTeam = async (req, res, resend) => {
  const { team, gmail, phone, code, members } = req.params;

  try {
    const existingTeam = await db1.collection('Teams').findOne({ Team: team });
    if (!existingTeam) {
      return res.json({ error: "Team not found" });
    }

    const memberDetailsArray = members.split(',').map(detail => detail.trim().toUpperCase());
    const students = await db1.collection("Hackathondata").find({
      Reg_No: { 
        $in: memberDetailsArray.map(regNo => new RegExp(`^${regNo}$`, 'i')) 
      }
    }).toArray();
    if (students.length !== memberDetailsArray.length) {
      const existingMembers = students.map(student => student.Reg_No.toUpperCase());
      const missingMembers = memberDetailsArray.filter(member => !existingMembers.includes(member));
      return res.json({ error: "One or more registration numbers are invalid or not found in Hackathon Registrations", missingNumbers: missingMembers });
    }

    // Check for existing members in other teams
    const existingMembers = await db1.collection('Teams').find({ Members: { $in: memberDetailsArray } }).toArray();
    const teamsWithMemberConflicts = existingMembers.filter(existingTeam => existingTeam.Team !== team);
    if (teamsWithMemberConflicts.length > 0) {
      const matchingNumbers = teamsWithMemberConflicts.reduce((acc, team) => {
        team.Members.forEach(member => {
          if (memberDetailsArray.includes(member)) {
            acc.add(member);
          }
        });
        return acc;
      }, new Set());

      return res.json({ 
        error: "One or more registration numbers are already part of another team",
        matchingNumbers: Array.from(matchingNumbers)
      });
    }

    // Update team details in the database
    const updateResult = await db1.collection('Teams').updateOne(
      { Team: team },
      {
        $set: {
          Gmail: gmail,
          Phone: phone,
          TeamCode: parseInt(code),
          Members: memberDetailsArray,
        }
      }
    );
    if (updateResult.modifiedCount > 0) {
      try {
        const { data, error } = await resend.emails.send({
          from: 'Vedic Vision <hackathon@ast-admin.in>',
          to: [gmail],
          subject: 'Your Team Details Updated for Vedic Vision Hackathon',
          html: message.sendUpdatedTeamDetails(team, parseInt(code), memberDetailsArray),
        });

        if (error) {
          console.log("Error sending email:", error);
          return res.json({ error: "Team updated but failed to send email" ,code:true });
        }

        return res.json({ message: "Success", data: updateResult, emailStatus: "Email sent successfully" });
      } catch (emailError) {
        return res.json({ error: "Team updated but failed to send email" ,code:true });
      }
    } else {
      res.json({ error: "no modifications to update" ,code:true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
