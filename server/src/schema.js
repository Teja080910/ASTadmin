import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();
mongoose.connect("mongodb+srv://aolsrkr2002:aol1234@ast.th0xtim.mongodb.net/?retryWrites=true&w=majority");

const attendanceSchema = new mongoose.Schema({
    Date: { type: Date, required: true },
    Data: [{
        Gmail: { type: String, required: true }
    }]
});

export const AttendaceModel = mongoose.model('Attendance', attendanceSchema);

// export const AttendaceModel = mongoose.model('Attendance',AttendanceSchema);