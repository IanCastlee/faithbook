import axios from "axios";

export const makeRequest = axios.create({
    baseURL:"https://faithbook-p1qjikf1m-eyhan.vercel.app/api/",
    withCredentials:true,
});