import axios from "axios"
export const Actions = {

    Students: async () => {
        return await axios.post(process.env.REACT_APP_database + "/bootcampstudents")
    },

    Givenmarks: async (user, marks, dayindex, taskindex) => {
        return await axios.post(process.env.REACT_APP_database + "/givenmarks", { user, marks, dayindex, taskindex })
    }
}