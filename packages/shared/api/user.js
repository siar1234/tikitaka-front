import axios from 'axios';
import {BACKEND_URL} from "./serverAddress";
import Cookies from "js-cookie";

export async function getNotifications() {
    return [
        {
            "title": "고길동님이 당신에게 친구신청을 했습니다."
        },
        {
            "title": "황근출님이 당신을 채팅방으로 초대했습니다."
        }
    ];
}

export async function getUserInfo({onSuccess, onFailed}) {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/member`, {
            withCredentials: true,
            headers: { 'Authorization': `Bearer ${Cookies.get('Authorization') }` },
        });

        if(response.status === 200){
            onSuccess(response.data.user);
        }
        else {
            return onFailed(null, response);
        }

    } catch (error) {
        return onFailed(error, null);
    }
}

export async function getAvailableFriendsById({id, onSuccess, onFailed, currentUserId}) {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/friend/add/list/${id}`, {
            withCredentials: true,
            headers: { 'Authorization': `Bearer ${Cookies.get('Authorization') }` },
        });

        if(response.status === 200){
            const result = [];
            for(const user of response.data.users) {
                if(currentUserId !== user.userId){
                    result.push(user);
                }
            }
            onSuccess(result);
        }
        else {
            return onFailed(null, response.status);
        }

    } catch (error) {
        return onFailed(error, null);
    }
}

export async function updateUserInfo({onSuccess, onFailed, name, password, profileImage}) {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/member/update`,
            {
                name: name,
                password: password,
                profileImage: profileImage
            }
            ,{
            withCredentials: true,
            headers: { 'Authorization': `Bearer ${Cookies.get('Authorization') }` },
        });

        if(response.status === 200){
            onSuccess();
        }
        else {
            return onFailed(null, response.status);
        }

    } catch (error) {
        return onFailed(error, null);
    }
}

