import axios from "axios"
import { api } from "./api"
export const Actions = {

    Students: async () => {
        return await axios.post(api + "/bootcampstudents")
    },

    StudentLogin: async (regd, otp) => {
        return await axios.post(api + "/signup-student", { regd, otp })
    },

    SendOtp: async (regd) => {
        return await axios.post(api + "/sendotp", { regd })
    },

    BootAdminLogin: async (mail, password) => {
        return await axios.post(api + "/bootcampadminlogin", { mail, password })
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

    TeamsCodes: async () => {
        return await axios.post(api + "/teamscodes")
    }
}