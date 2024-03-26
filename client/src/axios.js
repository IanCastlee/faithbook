import axios from "axios";

export const makeRequest = axios.create({
    baseURL:"https://faithbook-rouge.vercel.app/api/",
    withCredentials:true,
});