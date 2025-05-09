import axios from 'axios';
import {BACKEND_URL} from "./serverAddress";
import Cookies from "js-cookie";

export async function getGroups() {
    return [
        {
            name: "000 기획팀",
            thumbnail: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/flat-white-3402c4f.jpg"
        },
        {
            name: "플레이스토어 테스팅 품앗이",
            thumbnail: "https://www.huaweicentral.com/wp-content/uploads/2023/03/play-store-img2.jpg"
        },
        {
            name: "컴소과 YD반",
            thumbnail: "https://mblogthumb-phinf.pstatic.net/MjAxNzAzMzBfMjQ2/MDAxNDkwODYzMDg2Njk4.x44aVYp4dgoXa1fG6orCgxK4HlJCTDno2V4lorvo3Zgg.QxYrzIBRauTps07O-Cc1T2UPXJjOef4Wb9IxbXM9m7sg.JPEG.overtherefishing/%EC%A0%9C%EB%AA%A9_%EC%97%86%EC%9D%8C-1.jpg?type=w420"
        }
    ];
}

export async function getFriends({onFailed, onSuccess}) {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/friend/list`, {
            withCredentials: true,
            headers: { 'Authorization': Cookies.get('Authorization') },
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