import axios from 'axios';
import {BACKEND_URL} from "./serverAddress";

export async function login({id, password, onFailed, onSuccess}) {
    try {
        const response = await axios.post(`${BACKEND_URL}/signIn`, {
            id,
            password,
        }, {
            withCredentials: true
        });

        if(response.status === 200){
            console.log(response.data);
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
        const response = await axios.post(`${BACKEND_URL}/signUp`, {
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