import axios from "axios";
import { api } from "../../actions/api";

export const ConsoleActions = {
  ConsoleLogin: async (mail, password) => {
    return await axios.post(api + "/consolelogin", { mail, password })
  },

  ConsoleRegister: async (mail, password, phone, event, date, club, members) => {
    return await axios.post(api + "/consoleregister", { mail, password, phone, event, club, date, members })
  },

  AnotherConsoleRegister: async (mail, password, phone) => {
    return await axios.post(api + "/anotherconsoleregister", { mail, password, phone });
  },

  fetchRoutes: async (admail) => {
    return await axios.get(api + "/ast-console/allroutes", { params: { admail } });
  },

  toggleRouteVisibility: async (path) => {
    return await axios.post(api + "/ast-console/routes/toggle", { path });
  },

  addRoute: async (newRoute) => {
    return await axios.post(api + "/ast-console/add-route", { ...newRoute });
  },

  deleteRoute: async (path) => {
    return await axios.post(api + "/ast-console/delete-route", { path });
  },

  updateRouteName: async (oldPath, newPath) => {
    return await axios.post(api + "/ast-console/update-route-name", { oldPath, newPath });
  }
  
};
