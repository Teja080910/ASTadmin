import { db1 } from "../../db.js";

export const CreateRegistrer = async (req, res) => {
    try {
        const { id, name, password } = req.body; // Access data from req.body
        await db1.collection('Htrs').insertOne({ HtrCode: id, Name: name, Password: password })
            .then((details) => {
                if (details?._id) {
                    res.json({ message: "success", data: details });
                }
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
