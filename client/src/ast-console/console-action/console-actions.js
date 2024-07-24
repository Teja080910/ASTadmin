import axios from "axios";
import { api } from "../../actions/api";

export const ConsoleActions = {
  ConsoleLogin: async (mail, password) => {
    return await axios.post(api + "/consolelogin", { mail, password })
  },

  ConsoleRegister: async (mail, password, phone, event, date, club, members, admail, adpass) => {
    return await axios.post(api + "/consoleregister", { mail, password, phone, event, club, date, members, admail, adpass })
  },

  AnotherConsoleRegister: async (mail, password, phone, admail) => {
    return await axios.post(api + "/anotherconsoleregister", { mail, password, phone, admail });
  },

  fetchRoutes: async (admail) => {
    return await axios.get(api + "/ast-console/allroutes", { params: { admail } });
  },

  toggleRouteVisibility: async (path, admail, adpass) => {
    return await axios.post(api + "/ast-console/routes/toggle", { path, admail, adpass });
  },

  addRoute: async (newRoute, admail, adpass) => {
    return await axios.post(api + "/ast-console/add-route", { ...newRoute, admail, adpass });
  },

  deleteRoute: async (path, admail, adpass) => {
    return await axios.post(api + "/ast-console/delete-route", { path, admail, adpass });
  },

  updateRouteName: async (oldPath, newPath, admail, adpass) => {
    return await axios.post(api + "/ast-console/update-route-name", { oldPath, newPath, admail, adpass });
  }
};
