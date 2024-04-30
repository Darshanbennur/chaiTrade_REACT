import axios from "axios";

const instance = axios.create({
  baseURL: "http://16.170.217.19:4000/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export default instance;