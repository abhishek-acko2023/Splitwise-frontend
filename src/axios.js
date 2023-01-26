import axios from "axios";

// axios header instance
const instance = axios.create({
  baseURL: "http://localhost:3024/splitwise",
});

export default instance;
