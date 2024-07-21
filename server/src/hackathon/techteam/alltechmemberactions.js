import { db1 } from "../../db.js";

export const CreateTechTeamMember = async (req, res) => {
    try {
        const { id, name, subject, password } = req.body; // Access data from req.body

        // Check if member ID already exists
        const existingMember = await db1.collection('TechTeamMembers').findOne({ MemberID: id });
        if (existingMember) {
            return res.json({ message: "Member ID already exists", error: true });
        }

        // Insert new tech team member document
        const insertedMember = await db1.collection('TechTeamMembers').insertOne({ MemberID: id, Name: name, Subject: subject, Password: password, Status: "active" });
        if (insertedMember?.insertedId) {
            return res.json({ message: "Success", data: insertedMember });
        } else {
            throw new Error("Failed to insert tech team member record");
        }
    } catch (error) {
        console.error("Error creating tech team member:", error);
        return res.status(500).json({ message: "Error creating tech team member", error });
    }
};

export const DeleteTechTeamMember = async (req, res) => {
    try {
        const { id } = req.params;
        await db1.collection('TechTeamMembers').deleteOne({ MemberID: id })
            .then(() => {
                res.json({ message: "Success" });
            })
            .catch((e) => {
                console.log(e);
                res.status(500).json({ message: "Error", error: e });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error", error });
    }
};

export const UpdateTechTeamMemberStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        await db1.collection('TechTeamMembers').updateOne({ MemberID: id }, { $set: { Status: status } })
            .then(() => {
                res.json({ message: "Success" });
            })
            .catch((e) => {
                console.log(e);
                res.status(500).json({ message: "Error", error: e });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error", error });
    }
};
export const UpdateTechTeamMemberSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const { subject } = req.body;

        await db1.collection('TechTeamMembers').updateOne({ MemberID: id }, { $set: { Subject: subject } })
            .then(() => {
                res.json({ message: "Success" });
            })
            .catch((e) => {
                console.log(e);
                res.status(500).json({ message: "Error", error: e });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error", error });
    }
};
