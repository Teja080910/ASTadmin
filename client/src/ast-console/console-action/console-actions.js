import axios from "axios";
import { api } from "../../actions/api";


export const ConsoleActions={
    ConsoleLogin: async (mail, password) => {
        return await axios.post(api + "/consolelogin", { mail, password })
    },

    ConsoleRegister: async (mail, password,phone,event,date,club,members,admail,adpass) => {
        return await axios.post(api + "/consoleregister", { mail, password,phone,event,club,date,members,admail,adpass})
    },

    AnotherConsoleRegister: async (mail, password,phone,adminmail) => {
        return await axios.post(api + "/anotherconsoleregister", { mail, password,phone,adminmail})
    },
}