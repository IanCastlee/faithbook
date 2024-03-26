import axios from "axios";

export const makeRequest = axios.create({
    baseURL:"http://faithbook-rouge.vercel.app/api/",
    withCredentials:true,
});