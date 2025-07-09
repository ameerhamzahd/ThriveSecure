import axios from 'axios';
import React from 'react';
import useAuth from '../useAuth/useAuth';
import { useNavigate } from 'react-router';


const axiosSecure = axios.create({
    baseURL: `http://localhost:3000/`
})

const useAxiosSecure = () => {
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(
        (config) => {
            config.headers.authorization = `Bearer ${user.accessToken}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosSecure.interceptors.response.use(
        res => {
            return res;
        },
        error => {
            const status = error.status;
            if (status === 403) {
                navigate("/forbidden");
            }
            else if (status === 401) {
                logoutUser()
                .then(() => {
                        navigate("/login")
                    })
                    .catch(() => {})
            }

            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;