import axios from "axios";
import { setUser } from "../reducers/userReducer";
import { API_URL } from "../config";
import { hideLoader, showLoader } from "../reducers/appReducer";

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      const res = await axios.post(`${API_URL}api/auth/login`, {
        email,
        password,
      });

      dispatch(setUser(res.data.user));
      localStorage.setItem("token", res.data.token);
    } catch (e) {
      alert(e.res.data.message);
    } finally {
      dispatch(hideLoader());
    }
  };
};

export const auth = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${API_URL}api/auth/auth`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(setUser(res.data.user));
      localStorage.setItem("token", res.data.token);
    } catch (e) {
      localStorage.removeItem("token");
    }
  };
};

export const uploadAvatar = (file) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(`${API_URL}api/files/avatar`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(setUser(res.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteAvatar = () => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`${API_URL}api/files/avatar`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(setUser(res.data));
    } catch (e) {
      console.log(e);
    }
  };
};
