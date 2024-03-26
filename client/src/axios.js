import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "https://faithbook-api-five.vercel.app/api/",
    withCredentials:true,
});