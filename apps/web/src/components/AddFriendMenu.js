import convertedStyle from "../styleUtils";
import ComponentFromTheme from "../ComponentFromTheme";
import {useRef, useState} from "react";
import {getUsersById} from "@myorg/shared/api/user";
import {useStore} from "../store";
import Cookies from "js-cookie";
import {requestFriend} from "@myorg/shared/api/friend";
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
    for(const user of users) {
        const itemChildren = [];
        const replacements = {
            "@profile": user.userProfileImage ?? defaultProfileImage,
            "@name": user.userName,
            "@request-friend": async () => {
                await requestFriend({
                    id: user.userId,
                    onFailed: (error, response) => {
                        alert(error);
                    },
                    onSuccess: () => {
                        alert("친구요청이 완료되었습니다");
                    },
                });
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
                    await getUsersById({
                        id: idRef.current.value,
                        currentUserId: userInfo.userId,
                        onFailed: (e, response) => {
                            console.log(response);
                        },
                        onSuccess: (userList) => {
                            setUsers(userList);
                        }
                    });
                }
            }}/>
            {children}
        </div>
    );
}