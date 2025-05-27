import {useEffect, useRef, useState} from "react";
import {getAvailableParticipants, inviteToChat} from "@myorg/shared/api/chat";
import {useStore} from "../../store";
import {defaultProfileImage} from "@myorg/shared/api/media";
import ComponentFromTheme from "../../ComponentFromTheme";
import convertedStyle from "../../styleUtils";

export default function AddFriendToChat({elementData, requestClose}) {

    const [friends, setFriends] = useState([]);
    const {chatRoom} = useStore();
    const children = [];
    const selectedFriends = [];

    const itemStyle = convertedStyle(elementData.items.item.style);
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
        const itemChildren = [];
        const replacements = {
            "@profile": friend.userProfileImage ?? defaultProfileImage,
            "@name": friend.userName,
            "@onchange": (event) => {
                if(event.target.checked) {
                    selectedFriends.push(friend.userId);
                }
                else {
                    const index = selectedFriends.indexOf(friend.userId);
                    if (index > -1) {
                        selectedFriends.splice(index, 1);
                    }
                }
            }
        };
        for(const itemData of elementData.items.item.children) {
            itemChildren.push(
              <ComponentFromTheme elementData={itemData} replacements={replacements} />
            );
        }
        children.push(
            <div style={itemStyle}>
                {itemChildren}
            </div>
        );
    }

    const buttonStyle = convertedStyle(elementData.button.style);
    const style = convertedStyle(elementData.style);
    const itemsStyle = convertedStyle(elementData.items.style);

    return (
        <div style={style}>
            <div style={itemsStyle}>
                {children}
            </div>
            <button style={buttonStyle} onClick={() => {
                inviteToChat({
                    chatId: chatRoom.chatId,
                    participants: selectedFriends,
                    onSuccess: () => {

                    },
                    onFailed: (error, response) => {
                        alert(error);
                    }
                });
                requestClose();
            }}>추가</button>
        </div>
    );
}