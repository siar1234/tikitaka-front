import axios from 'axios';
import {BACKEND_URL} from "./serverAddress";
import Cookies from "js-cookie";

export async function login({id, password, onFailed, onSuccess}) {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/user/signIn`, {
            id,
            password,
        }, {
            withCredentials: true
        });

        if(response.status === 200){
            const token = response.data["token"];
            Cookies.set("Authorization", token);
            onSuccess();
        }
        else {
            onFailed(null,response.status);
        }

    } catch (error) {
        onFailed(error, null);
    }
}

export async function register({username, id, password, onFailed, onSuccess}) {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/user/signUp`, {
            name: username,
            id,
            password,
        });

        if(response.status === 200){
            onSuccess();
        }
        else {
            onFailed(null, response);
        }

    } catch (error) {
        onFailed(error, null);
    }
}