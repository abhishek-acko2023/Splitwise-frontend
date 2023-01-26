import axios from "axios";

// axios header instance
const instance = axios.create({
  baseURL: "localhost:3000/splitwise",
});

export default instance;
