import { db1 } from "../../db.js";

export const CreateRegistrer = async (req, res) => {
    try {
        const { id, name, password } = req.body; // Access data from req.body

        // Check if HtrCode already exists
        const existingHtr = await db1.collection('Htrs').findOne({ HtrCode: id });
        if (existingHtr) {
            return res.json({ message: "HtrCode already exists", error: true });
        }

        // Insert new HTR document
        const insertedHtr = await db1.collection('Htrs').insertOne({ HtrCode: id, Name: name, Password: password, Status: "active" });
        if (insertedHtr?.insertedId) {
            return res.json({ message: "Success", data: insertedHtr });
        } else {
            throw new Error("Failed to insert HTR record");
        }
    } catch (error) {
        console.error("Error creating HTR:", error);
        return res.status(500).json({ message: "Error creating HTR", error });
    }
};


export const DeleteRegistrer = async (req, res) => {
    try {
        const { id } = req.params;
        await db1.collection('Htrs').deleteOne({ HtrCode: id })
            .then(() => {
                res.json({ message: "success" });
            })
            .catch((e) => {
                console.log(e);
                res.status(500).json({ message: "error", error: e });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error", error });
    }
};

export const UpdateRegistrerStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        await db1.collection('Htrs').updateOne({ HtrCode: id }, { $set: { Status: status } })
            .then(() => {
                res.json({ message: "success" });
            })
            .catch((e) => {
                console.log(e);
                res.status(500).json({ message: "error", error: e });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error", error });
    }
};
