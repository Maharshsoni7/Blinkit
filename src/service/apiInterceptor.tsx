import axios from "axios";
import { BASE_URL } from "./config";
import { refresh_token } from "./authService";

import { tokenStorage } from "@state/storage";



export const appAxios = axios.create({
    baseURL: BASE_URL
})

appAxios.interceptors.request.use(async config => {
    const accessToken = tokenStorage.getString('accessToken')
    if (accessToken) {
        config.headers.Authorization = `Bearer${accessToken}`
    }
    return config

})



appAxios.interceptors.response.use(
    response => response,
    async error => {
        if (error.response && error.response.status === 401) {
            try {
                let newAccessToken = await refresh_token();
                if (newAccessToken) {
                    error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axios(error.config);
                }
            } catch (error) {
                console.log('error RefreshToken ', error);

            }

        }

        if (error.response && error.response.status != 401) {
            const errorMessage = error.response.data.message || 'Something Went wrong'
            console.log("error RefreshToken ", errorMessage);
        }
        return Promise.resolve(error)
    }
)