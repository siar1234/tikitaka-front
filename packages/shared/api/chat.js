import axios from "axios";
import {BACKEND_URL} from "./serverAddress";
import Cookies from "js-cookie";

export async function getChats({onFailed, onSuccess}) {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/chat/list`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('Authorization')}`,
                'Content-Type': 'application/json; charset=utf-8'
            },
        });

        if(response.status === 200){
            onSuccess(response.data.chatList);
        }
        else {
            return onFailed(null, response.status);
        }

    } catch (error) {
        return onFailed(error, null);
    }
}

export async function createChat({onFailed, onSuccess, name, participants}) {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/chat/create`, {
            chatName: name,
            participants: participants
        } ,{
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('Authorization')}`,
                'Content-Type': 'application/json; charset=utf-8'
            },
        });

        if(response.status === 200){
            onSuccess(response);
        }
        else {
            return onFailed(null, response);
        }

    } catch (error) {
        return onFailed(error, null);
    }
}

export async function getChatRoomMessages({onFailed, onSuccess, chatId}) {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/chat/message/list/${chatId}`,{
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('Authorization')}`,
                'Content-Type': 'application/json; charset=utf-8'
            },
        });

        if(response.status === 200){
            onSuccess(response.data.messages);
        }
        else {
            return onFailed(null, response);
        }

    } catch (error) {
        return onFailed(error, null);
    }
}

export async function inviteToChat({onFailed, onSuccess, participants, chatId}) {
    console.log(participants);
    console.log(chatId);
    try {
        const response = await axios.post(`${BACKEND_URL}/api/chat/add`, {
            chatId: chatId,
            participants: participants
        } ,{
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${Cookies.get('Authorization')}`,
                'Content-Type': 'application/json; charset=utf-8'
            },
        });

        if(response.status === 200){
            onSuccess(response);
        }
        else {
            return onFailed(null, response);
        }

    } catch (error) {
        return onFailed(error, null);
    }
}

export async function getAvailableParticipants({onFailed, onSuccess, chatId}) {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/chat/add/list/${chatId}`,{
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
            return onFailed(null, response);
        }
    } catch (error) {
        return onFailed(error, null);
    }
}

export async function connectWebsocket() {

}