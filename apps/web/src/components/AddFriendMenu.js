import convertedStyle from "../styleUtils";
import ComponentFromTheme from "../ComponentFromTheme";
import {useRef, useState} from "react";
import {getAvailableFriendsById} from "@myorg/shared/api/user";
import {useStore} from "../store";
import {cancelFriendRequest, requestFriend} from "@myorg/shared/api/friend";
import {defaultProfileImage} from "@myorg/shared/api/media";

export default function AddFriendMenu({elementData, showing}) {

    const styleData = convertedStyle(elementData.style);
    const itemStyle = convertedStyle(elementData.item.style);
    if(!showing) {
        styleData["display"] = "none";
    }
    else {
        styleData["display"] = "block";
    }
    const children = [];
    const idRef = useRef();
    const {userInfo, stompClient} = useStore();
    const [users, setUsers] = useState([]);
    for (let i = 0; i < users.length; i++){
        const user = users[i];
        const itemChildren = [];
        const replacements = {
            "@profile": user.userProfileImage ?? defaultProfileImage,
            "@name": `${user.userName} (${user.userId})`,
            "@label": user.status === "SEND" ? "취소" : "친구요청",
            "@request-friend": async () => {
                if(user.status === "SEND") {
                    await cancelFriendRequest({
                        id: user.userId,
                        onFailed: (error, response) => {
                            alert(error);
                        },
                        onSuccess: () => {
                            users[i].status = "NONE";
                            setUsers([...users]);
                        },
                    });
                }
                else {
                    await requestFriend({
                        id: user.userId,
                        onFailed: (error, response) => {
                            alert(error);
                        },
                        onSuccess: () => {
                            users[i].status = "SEND";
                            setUsers([...users]);
                        },
                    });
                }
            }
        };
        for(const itemData of elementData.item.children) {
          itemChildren.push(<ComponentFromTheme elementData={itemData} replacements={replacements}/>)
        }
        children.push(
            <div style={itemStyle}>
                {itemChildren}
            </div>
        );
    }

    const searchBarStyle = elementData["search-bar"].style;

    return (
        <div style={styleData} onClick={(e) => {
            e.stopPropagation();
        }}>
            <input style={searchBarStyle} ref={idRef} onKeyDown={ async (e) => {
                if (e.key === 'Enter') {
                    await getAvailableFriendsById({
                        id: idRef.current.value,
                        currentUserId: userInfo.userId,
                        onFailed: (e, response) => {
                            console.log(response);
                        },
                        onSuccess: (userList) => {
                            const list = [];
                            for(const user of userList) {
                                if(user.status === "NONE" || user.status === "SEND") {
                                    list.push(user);
                                }
                            }
                            setUsers(list);
                        }
                    });
                }
            }}/>
            {children}
        </div>
    );
}