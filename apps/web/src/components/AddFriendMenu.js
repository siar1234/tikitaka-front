import convertedStyle from "../styleUtils";
import ComponentFromTheme from "../ComponentFromTheme";
import {useRef, useState} from "react";
import {getUsersById} from "@myorg/shared/api/user";
import {useStore} from "../store";

export default function AddFriendMenu({elementData, showing}) {

    const styleData = convertedStyle(elementData.style);
    if(!showing) {
        styleData["display"] = "none";
    }
    else {
        styleData["display"] = "block";
    }
    const children = [];
    const idRef = useRef();
    const {userInfo} = useStore();
    const [users, setUsers] = useState([]);
    for(const user of users) {
        const itemChildren = [];
        const replacements = {
            "@profile": user.userProfileImage,
            "@name": user.userName
        };
        for(const itemData of elementData.item.children) {
          itemChildren.push(<ComponentFromTheme elementData={itemData} replacements={replacements}/>)
        }
        children.push(
            <div onClick={() => {

            }}>
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