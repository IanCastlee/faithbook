import axios from "axios";

export const makeRequest = axios.create({
    baseURL:"https://localhost:8800/api/",
    withCredentials:true,
});