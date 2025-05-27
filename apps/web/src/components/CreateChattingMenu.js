import convertedStyle from "../styleUtils";
import {useRef} from "react";
import {createChat} from "@myorg/shared/api/chat";
import {useStore} from "../store";
import ComponentFromTheme from "../ComponentFromTheme";
import {defaultProfileImage} from "@myorg/shared/api/media";
import {requestFriend} from "@myorg/shared/api/friend";

export default function CreateChattingMenu({elementData, showing, onClose}) {
    const styleData = convertedStyle(elementData.style);
    if(!showing) {
        styleData["display"] = "none";
    }
    else {
        styleData["display"] = "block";
    }
    const nameRef = useRef();
    const {chats, setChats} = useStore();

    const inputStyle = elementData["input"].style;
    const buttonStyle = elementData["button"].style;
    const friendsStyle = elementData["friends"].style;
    const friendItemStyle = elementData["friends"]["item"].style;
    const friendsChildren = [];
    const {friends} = useStore();
    const selectedFriends = [];

    for(const friend of friends) {
        const children = [];
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
        for(const item of elementData["friends"].item.children) {
            children.push(
              <ComponentFromTheme elementData={item} replacements={replacements} />
            );
        }
        friendsChildren.push(
          <div style={friendItemStyle}>
              {children}
          </div>
        );
    }

    return (
        <div style={styleData} onClick={(e) => {
            e.stopPropagation();
        }}>
            <input style={inputStyle} ref={nameRef} />
            <div style={friendsStyle}>
                {friendsChildren}
            </div>
            <button style={buttonStyle} onClick={ async (e) => {
                await createChat({
                    name: nameRef.current.value,
                    participants: selectedFriends,
                    onFailed: (e, response) => {
                        alert(e);
                        alert(response);
                    },
                    onSuccess: (response) => {
                        chats.push({
                           chatName: nameRef.current.value,
                        });
                        setChats(chats);
                        onClose();
                    }
                });
            }}>
                생성
            </button>
        </div>
    );
}