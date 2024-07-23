import axios from "axios";
// import { api } from "../../actions/api";
const api = "http://localhost:8000"

export const ConsoleActions={
    ConsoleLogin: async (mail, password) => {
        return await axios.post(api + "/consolelogin", { mail, password })
    },

    ConsoleRegister: async (mail, password,phone,event,date,club,members,admail,adpass) => {
        return await axios.post(api + "/consoleregister", { mail, password,phone,event,club,date,members,admail,adpass})
    },



  AnotherConsoleRegister: async (mail, password, phone, adminmail) => {
    return await axios.post(api + "/anotherconsoleregister", { mail, password, phone, adminmail });
  },

  fetchRoutes: async (adminEmail) => {
    return await axios.get(api + "/ast-console/allroutes", { params: { adminEmail } });
  },

  toggleRouteVisibility: async (path, adminEmail) => {
    return await axios.post(api + "/ast-console/routes/toggle", { path, adminEmail });
  },

  addRoute: async (newRoute, adminEmail) => {
    return await axios.post(api + "/ast-console/add-route", { ...newRoute, adminEmail });
  },

  deleteRoute: async (path, adminEmail) => {
    return await axios.post(api + "/ast-console/delete-route", { path, adminEmail });
  },

  updateRouteName: async (oldPath, newPath, adminEmail) => {
    return await axios.post(api + "/ast-console/update-route-name", { oldPath, newPath, adminEmail });
  }
};
