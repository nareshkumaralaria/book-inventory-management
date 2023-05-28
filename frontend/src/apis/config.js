import axios from "axios";

export const base_url = "http://localhost:9002/api/v1";
// export const base_url = "https://solar-ladder-backend.vercel.app/api/v1";

export const httpService = {
    // headers: {
    //   Accept: "application/json",
    // },
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};
