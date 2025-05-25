import {useEffect, useRef, useState} from "react";
import {getAvailableParticipants, inviteToChat} from "@myorg/shared/api/chat";
import {useStore} from "../../store";

export default function AddFriendToChat({elementData}) {

    const [friends, setFriends] = useState([]);
    const {chatRoom} = useStore();
    const children = [];
    const selectedFriends = [];

    useEffect(() => {
        if(chatRoom.chatId !== undefined) {
            getAvailableParticipants({
                chatId: chatRoom.chatId,
                onSuccess: (friends) => setFriends(friends),
                onFailed: (error, response) => {

                }
            });
        }
    }, [chatRoom]);

    for(const friend of friends) {
        children.push(
            <div>
                {friend.userName}
                <input type={"checkbox"} onChange={(event) => {
                    if(event.target.checked) {
                        selectedFriends.push(friend.userId);
                    }
                    else {
                        const index = selectedFriends.indexOf(friend.userId);
                        if (index > -1) {
                            selectedFriends.splice(index, 1);
                        }
                    }
                }}/>
            </div>
        );
    }

    return (
        <div>
            {children}
            <button onClick={() => {
                inviteToChat({
                    chatId: chatRoom.chatId,
                    participants: selectedFriends,
                    onSuccess: () => {

                    },
                    onFailed: (error, response) => {
                        alert(error);
                    }
                });
            }}>추가</button>
        </div>
    );
}