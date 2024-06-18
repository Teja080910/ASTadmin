import xlsx from 'xlsx';
import { db1 } from "../../db.js";
export const UploadStudents = async(files,res) => {
    try {
        let xlfile = xlsx.read(files[0].buffer, { type: 'buffer' });
        let sheet = xlfile.Sheets[xlfile.SheetNames[0]];
        let jsonfile = xlsx.utils.sheet_to_json(sheet);
        const filters = jsonfile.map(student => ({
            Reg_No: student.Reg_No,
            Gmail: student.Gmail
        }));
        if (!filters[0]?.Reg_No && !filters[0]?.Gmail) {
            res.json({ duplicates: "please set columns names properly" })
        }
        else {
            const existingStudents = await db1.collection('Hackathondata').find().toArray();
            const existingStudentIdentifiers = existingStudents.map(student => `${student.Reg_No}_${student.Gmail}`);
            const newStudents = jsonfile.filter(student => !existingStudentIdentifiers.includes(`${student.Reg_No}_${student.Gmail}`));
            if (newStudents.length > 0) {
                await db1.collection('Hackathondata').createIndex({ Reg_No: 1 }, { unique: true })
                await db1.collection('Hackathondata').insertMany(newStudents)
                    .then((details) => {
                        res.json({ message: "inserted", details })
                    })
                    .catch((e) => {
                        res.json({ error: "File columns not match" })
                    });
            }
            else {
                res.json({ duplicates: "Already this file uploaded" })
            }
        }
    }
    catch (e) {
        if (e.code === 11000) {
            res.json({ error: "File data exist" })
        }
        else {
            res.json({ error: "No file found" })
        }
    }
}