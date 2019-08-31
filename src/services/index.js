import axios from "./axios";

export default {
  getAuthCode(params) {
    return axios.get("getauthcode", { params });
  },
  register(params) {
    return axios.get("register", { params });
  },
  login(params) {
    return axios.get("login", { params });
  },
  resetpsd(params) {
    return axios.get("resetpsd", { params });
  },
  getStep(params) {
    return axios.get("getuserlevel", { params });
  },
  setuserbaseinfo(params) {
    return axios.get("setuserbaseinfo", { params });
  },
  setuserfamilyinfo(params) {
    return axios.get("setuserfamilyinfo", { params });
  },
  setuserarmyinfo(params) {
    return axios.get("setuserarmyinfo", { params });
  },
  setuserenterinfo(params) {
    return axios.get("setuserenterinfo", { params });
  },
  setuserzhiyuaninfo(params) {
    return axios.get("setuserzhiyuaninfo", { params });
  },
  getmzlist(params) {
    return axios.get("getmzlist", { params });
  },
  getuserbaseinfo(params) {
    return axios.get("getuserbaseinfo", { params });
  },
  getuserfamilyinfo(params) {
    return axios.get("getuserfamilyinfo", { params });
  },
  getuserarmyinfo(params) {
    return axios.get("getuserarmyinfo", { params });
  },
  getuserenterinfo(params) {
    return axios.get("getuserenterinfo", { params });
  },
  getuserzhiyuaninfo(params) {
    return axios.get("getuserzhiyuaninfo", { params });
  },
  getuserbaseinfos(params) {
    return axios.get("getuserbaseinfos", { params });
  }
};
