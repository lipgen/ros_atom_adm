import axios from "axios";

const token = localStorage.getItem("token");

export default axios.create({
  baseURL: "http://localhost:8001",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "x-access-token": token,
  },
});
