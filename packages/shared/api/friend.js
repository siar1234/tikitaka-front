import axios from "axios";
import {BACKEND_URL} from "./serverAddress";
import Cookies from "js-cookie";

export async function acceptFriend({id, onFailed, onSuccess}) {
    try {
        const response = await axios.patch(`${BACKEND_URL}/api/friend/accept?friendId=${id}`, {
        }, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('Authorization')}`
            }
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

export async function requestFriend({id, onFailed, onSuccess}) {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/friend/send?friendId=${id}`, {
        }, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('Authorization')}`
            }
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

export async function getFriends({onFailed, onSuccess}) {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/friend/list`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('Authorization')}`,
                'Content-Type': 'application/json; charset=utf-8'
            },
        });

        if(response.status === 200){
            onSuccess(response.data.friends);
        }
        else {
            return onFailed(null, response.status);
        }

    } catch (error) {
        return onFailed(error, null);
    }
}

export async function receivedFriendRequests({onFailed, onSuccess}) {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/friend/receive/list`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('Authorization')}`,
                'Content-Type': 'application/json; charset=utf-8'
            },
        });

        if(response.status === 200){
            onSuccess(response.data.receivedList);
        }
        else {
            return onFailed(null, response.status);
        }

    } catch (error) {
        return onFailed(error, null);
    }
}