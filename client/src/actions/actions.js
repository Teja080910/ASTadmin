import axios from "axios"
export const Actions = {

    Students: async () => {
        return await axios.post(process.env.REACT_APP_database + "/bootcampstudents")
    },

    BootAdminLogin: async (mail, password) => {
        return await axios.post(process.env.REACT_APP_database + "/bootcampadminlogin", { mail, password })
    },

    BootAdminRegister: async (email, password, name, phone) => {
        return await axios.post(process.env.REACT_APP_database + "/bootcampadminregister", { email, password, name, phone })
    },

    Givenmarks: async (user, marks, dayindex, taskindex) => {
        return await axios.post(process.env.REACT_APP_database + "/givenmarks", { user, marks, dayindex, taskindex })
    },

    AllMaterials: async () => {
        return await axios.post(process.env.REACT_APP_database + "/files")
    },

    UploadMaterials: async (formData) => {
        return await axios.post(process.env.REACT_APP_database + "/uploadfile", formData)
    },

    EditMaterials: async (theme) => {
        return await axios.post(process.env.REACT_APP_database + "/editfile", { theme })
    },

    DeleteMaterial: async (photo, pdf, theme) => {
        return await axios.post(process.env.REACT_APP_database + "/deletefile", { photo, pdf, theme })
    },

    DeleteAllMaterials: async () => {
        return await axios.post(process.env.REACT_APP_database + "/deleteallfiles")
    },

    inputTeams: async (teams) => {
        return await axios.post(process.env.REACT_APP_database + "/teamsinput", { teams })
    },

    TeamsCodes: async () => {
        return await axios.post(process.env.REACT_APP_database + "/teamscodes")
    }
}