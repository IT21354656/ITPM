import axios from "axios";

const Axioss = axios.create({
  baseURL: "http://localhost:7000",
  headers: {
    "Content-Type": "application/json", // Set the request content type to JSON
  },
  withCredentials: true,
});

export default Axioss;
