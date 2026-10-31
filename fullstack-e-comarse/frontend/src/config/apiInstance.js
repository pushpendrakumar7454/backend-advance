import axios from "axios";
import { store } from "../app/store";
import { setAccessToken } from "../features/auth/state/authSlice";

const BASE_URL = "https://backend-advance-2.onrender.com/api";

const apiInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

apiInstance.interceptors.request.use((config) => {
    const accessToken = store.getState().auth.accessToken;

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

apiInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/auth/refresh")
        ) {
            originalRequest._retry = true;

            try {
                const refreshResponse = await axios.post(
                    `${BASE_URL}/auth/refresh`,
                    {},
                    {
                        withCredentials: true,
                    }
                );

                const newAccessToken =
                    refreshResponse.data.accessToken;

                store.dispatch(setAccessToken(newAccessToken));

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return apiInstance(originalRequest);

            } catch (refreshError) {
                store.dispatch(setAccessToken(null));

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiInstance;