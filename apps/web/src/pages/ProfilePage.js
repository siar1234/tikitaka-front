import {useStore} from "../store";
import ComponentFromTheme from "../ComponentFromTheme";
import {BACKEND_URL} from "@myorg/shared/api/serverAddress";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import convertedStyle from "../styleUtils";
import profileImage from "../assets/profile.png";
import {HorizontalLinearLayout, IconButton, RelativeLayout, VerticalLinearLayout} from "../App";
import {textByDocumentLocale} from "../textUtils";
import {useRef, useState} from "react";
import {updateUserInfo} from "@myorg/shared/api/user";

function ProfilePageComponentFromTheme({elementData, replacements, profileEditable, usernameRef}) {

    const styleData = convertedStyle(elementData.style);
    const navigate = useNavigate();

    const childrenOfLayout = [];
    if (typeof elementData.children !== "undefined") {
        for (const child of elementData.children) {
            childrenOfLayout.push(<ProfilePageComponentFromTheme elementData={child} replacements={replacements} profileEditable={profileEditable} usernameRef={usernameRef} />);
        }
    }
    switch (elementData.type) {
        case "linear-layout":

            if (elementData.orientation === "vertical") {
                return (
                    <VerticalLinearLayout style={styleData}>
                        {childrenOfLayout}
                    </VerticalLinearLayout>
                );
            } else {
                return (
                    <HorizontalLinearLayout style={styleData}>
                        {childrenOfLayout}
                    </HorizontalLinearLayout>
                );
            }
        case "relative-layout":
            return (
                <RelativeLayout style={styleData} replacements={replacements}>
                    {childrenOfLayout}
                </RelativeLayout>
            );
        case "profile-image":
            let src = elementData.src;
            if (typeof replacements !== "undefined") {
                for (const key in replacements) {
                    if(key === src) {
                        src = replacements[key];
                    }
                }
            }
            else if (typeof src === "undefined") {
                src = profileImage;
            }
            else {
                src = profileImage;
            }
            return (
                <img style={styleData} src={src} onClick={() => {
                    replacements["@selectProfileImage"]();
                }}></img>
            );
        case "bio":
            const text = {...elementData.text};
            for (const key in replacements) {
                text["default"] = text["default"].replace(key, replacements[key]);
            }

            return (
                    <div style={styleData} contentEditable={profileEditable} ref={usernameRef}>
                        {textByDocumentLocale(text)}
                    </div>
            );
        case "username":
            if (typeof replacements !== "undefined") {
                const text = {...elementData.text};
                for (const key in replacements) {
                    text["default"] = text["default"].replace(key, replacements[key]);
                }

                return (
                    <div style={{
                        "width": `200px`,
                        "justify-content": "center",
                        "align-items": "center",
                        "text-align": "center",
                        "position": "relative",
                        "display": "flex",
                        "flexDirection": "row",
                    }}>
                        <div style={styleData} contentEditable={profileEditable} ref={usernameRef}>
                            {textByDocumentLocale(text)}
                        </div>
                        <IconButton style={{
                            "right": "0",
                            "position": "absolute"
                        }} onClick={() => {
                            replacements["@onclick"](usernameRef.current.value);
                        }}>
                            <i className={`fa-solid ${profileEditable === true ? "fa-check" : "fa-pencil"}`}></i>
                        </IconButton>
                    </div>
                );
            } else {
                return (
                    <div style={styleData}>
                        {textByDocumentLocale(elementData.text)}
                    </div>
                );
            }
        default:
            return (
                <ComponentFromTheme elementData={elementData} replacements={replacements}/>
            );

    }
}

export default function ProfilePage() {


    const [editable, setEditable] = useState(false);
    const {theme} = useStore();
    const children = [];
    const {userInfo, setUserInfo} = useStore();
    const usernameRef = useRef(userInfo.userName);
    const bioRef = useRef(userInfo.bio);

    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log("Selected file:", file);
        // do something with the file (upload, preview, etc.)
    };

    for(const item of theme["profile-page"].web) {
        const replacements = {
            "@profile": userInfo.profileImage ?? `${BACKEND_URL}/file/default-profile-image.png`,
            "@name": userInfo.userName,
            "@friends": "200",
            "@posts": "100",
            "@bio": userInfo.bio ?? "소개",
            "@selectProfileImage": () => {
                fileInputRef.current.click();
            },
            "@onclick": (username) => {
                if(editable) {
                    updateUserInfo({
                        onSuccess: () => {
                            userInfo.userName = username;
                            setUserInfo(userInfo);
                        },
                        onFailed: () => {
                            alert("수정에 실패했습니다.");
                        },
                        name: username,
                        password: null,
                        profileImage: null
                    });
                    setEditable(false);
                }
                else {
                    setEditable(true);
                }
            }
        };
        children.push(
            <ProfilePageComponentFromTheme elementData={item} replacements={replacements} profileEditable={editable} usernameRef={usernameRef}/>
        );
    }
    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            {children}
        </>
    );
}