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

export async function getUserInfo() {
    return {
        name: "이승용",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHP-ZLzyQ4v-BQNFrYI459cPc82Xfc8OfmA&s"
    };
}

export async function getUsersById({id, onSuccess, onFailed, currentUserId}) {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/user/search/${id}`, {
            withCredentials: true,
            headers: { 'Authorization': Cookies.get('Authorization') },
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