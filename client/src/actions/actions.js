import axios from "axios"
import { api, face_api } from "./api"
export const Actions = {

    FaceVerify: async (regd, photo) => {
        return await axios.post(face_api + "/face", { regd, photo })
    },

    Headers: async (mail, password) => {
        return { mail, password }
    },


    // **********************************************************Bootcamp data************************************************ //

    Students: async () => {
        return await axios.post(api + "/bootcampstudents")
    },

    StudentLogin: async (regd) => {
        return await axios.post(api + "/signin-student", { regd })
    },

    SendOtp: async (regd) => {
        return await axios.post(api + "/sendotp", { regd })
    },

    BootAdminLogin: async (mail, password) => {
        return await axios.post(api + "/bootcampadminlogin", { mail, password })
    },

    AttendanceAdminLogin: async () => {
        return await axios.post(process.env.REACT_APP_database + "/admincheck/" + sessionStorage.gmail)
    },

    BootAdminRegister: async (email, password, name, phone) => {
        return await axios.post(api + "/bootcampadminregister", { email, password, name, phone })
    },

    Givenmarks: async (user, marks, dayindex, taskindex) => {
        return await axios.post(api + "/givenmarks", { user, marks, dayindex, taskindex })
    },

    AllMaterials: async () => {
        return await axios.post(api + "/files")
    },

    UploadMaterials: async (formData) => {
        return await axios.post(api + "/uploadfile", formData)
    },

    EditMaterials: async (theme) => {
        return await axios.post(api + "/editfile", { theme })
    },

    DeleteMaterial: async (photo, pdf, theme) => {
        return await axios.post(api + "/deletefile", { photo, pdf, theme })
    },

    DeleteAllMaterials: async () => {
        return await axios.post(api + "/deleteallfiles")
    },

    inputTeams: async (teams) => {
        return await axios.post(api + "/teamsinput", { teams })
    },

    DeleteTeam: async (teams) => {
        return await axios.post(api + "/deleteteam", { teams })
    },

    InternalMarks: async (user, marks) => {
        return await axios.post(api + "/internalmarks", { user, marks })
    },

    ActivityMarks: async (user, marks) => {
        return await axios.post(api + "/activitymarks", { user, marks })
    },

    FeedbackOnDateByType: async (date, type) => {
        return await axios.post(api + `/feedbacks`, { date, type })
    },

    FeedbackInitial: async () => {
        return await axios.get(api + `/feedbacks/unique-dates`)
    },




    // *********************************************** Hackathon data ***************************************** //

    UploadPhotos: async (formData) => {
        return await axios.post(api + "/uploadphotos", formData)
    },

    EditPhotos: async (theme) => {
        return await axios.post(api + "/editphoto", { theme })
    },

    DeletePhoto: async (photo, team) => {
        return await axios.post(api + "/deletephoto", { photo, team })
    },

    DeleteAllPhotos: async (team) => {
        return await axios.post(api + "/deleteallphotos", { team })
    },

    UpdateTeam: async (team, gmail, phone, code, members) => {
        return await axios.post(api + "/updateteam/" + team + "/" + gmail + "/" + phone + "/" + code + "/" + members)
    },

    TeamsCodes: async () => {
        return await axios.post(api + "/teamscodes")
    },

    PSSC: async () => {
        return await axios.post(api + "/pssc")
    },

    PssCount: async (count) => {
        return await axios.post(api + "/psscount", { count })
    },

    TeamRegistrers: async () => {
        return await axios.post(api + "/teamregistrers")
    },

    CreateRegistrer: async (id, name, password) => {
        return await axios.post(api + "/createregistrer", { id, name, password });
    },

    DeleteRegistrer: async (id) => {
        return await axios.delete(api + `/deleteregistrer/${id}`);
    },

    UpdateRegistrerStatus: async (id, status) => {
        return await axios.put(api + `/updateregistrerstatus/${id}`, { status });
    },

    TeamMembers: async () => {
        return await axios.post(api + "/teammembers");
    },

    CreateTechTeamMember: async (id, name, subject, password) => {
        return await axios.post(api + "/createtechteammember", { id, name, subject, password });
    },

    DeleteTechTeamMember: async (id) => {
        return await axios.delete(api + `/deletetechteammember/${id}`);
    },

    UpdateTechTeamMemberStatus: async (id, status) => {
        return await axios.put(api + `/updatetechteammemberstatus/${id}`, { status });
    },

    UpdateTechTeamMemberSubject: async (id, subject) => {
        return await axios.put(api + `/updatetechteammembersubject/${id}`, { subject });
    },

    InsertRound: async (code, roundno, task, desc) => {
        return await axios.post(api + "/insertround", { code, roundno, task, desc })
    },

    DeleteRound: async (code, roundno, task, desc) => {
        return await axios.post(api + "/deleteround", { code, roundno, task, desc })
    },

    Roundmarks: async (code, marks, taskindex) => {
        return await axios.post(api + "/roundmarks", { code, marks, taskindex })
    },

    Start: async () => {
        return await axios.post(api + "/starthack")
    },

    Stop: async () => {
        return await axios.post(api + "/stophack")
    },

    HackInternalMarks: async (code, marks) => {
        return await axios.post(api + "/hackinternalmarks", { code, marks })
    },

    HackActivityMarks: async (code, marks) => {
        return await axios.post(api + "/hackactivitymarks", { code, marks })
    },
}