import axios from "axios";

export default axios.create({
  baseURL: "https://mrw-backend.onrender.com",
  headers: {
    "skip-browser-warning": "true",
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
});