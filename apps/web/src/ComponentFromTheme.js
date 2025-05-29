import {HorizontalLinearLayout, IconButton, RelativeLayout, VerticalLinearLayout} from "./App";
import SearchBar from "./components/SearchBar";
import {textByDocumentLocale} from "./textUtils";
import Chats from "./components/Chats";
import Friends from "./components/Friends";
import ChattingHeader from "./components/chatting/ChattingHeader";
import convertedStyle from "./styleUtils";
import {useNavigate} from "react-router-dom";
import ChattingContents from "./components/chatting/ChattingContents";
import ChattingFooter from "./components/chatting/ChattingFooter";
import {useStore} from "./store";
import profileImage from "../src/assets/profile.png";
import AddFriendButton from "./components/AddFriendButton";
import CreateChattingButton from "./components/CreateChattingButton";
import Cookies from "js-cookie";

export default function ComponentFromTheme({elementData, replacements, children}) {

    const styleData = convertedStyle(elementData.style);
    const navigate = useNavigate();
    const {setNotificationDialogShowing} = useStore();

    const childrenOfLayout = [];
    if (typeof elementData.children !== "undefined") {
        for (const child of elementData.children) {
            childrenOfLayout.push(<ComponentFromTheme elementData={child} replacements={replacements}/>);
        }
    }

    switch (elementData.type) {

        case "linear-layout":

            if (elementData.orientation === "vertical") {
                return (
                    <VerticalLinearLayout style={styleData}>
                        {childrenOfLayout}
                        {children}
                    </VerticalLinearLayout>
                );
            } else {
                return (
                    <HorizontalLinearLayout style={styleData}>
                        {childrenOfLayout}
                        {children}
                    </HorizontalLinearLayout>
                );
            }
        case "relative-layout":
            return (
                <RelativeLayout style={styleData} replacements={replacements}>
                    {childrenOfLayout}
                    {children}
                </RelativeLayout>
            );
        case "chats":
            return (
                <Chats elementData={elementData}></Chats>
            );
        case "create-chatting-button":
            return (
                <CreateChattingButton elementData={elementData}/>
            );
        case "friends":
            return (
                <Friends elementData={elementData}></Friends>
            );
        case "add-friend-button":
            return (
                <AddFriendButton elementData={elementData} />
            );
        case "account-button":
            return (
                <IconButton style={styleData} onClick={() => {
                    navigate("/profile");
                }}>
                <i className="fa-solid fa-user"></i>
            </IconButton>);
        case "home-button":
            return (<IconButton style={styleData} onClick={() => {
                navigate("/");
            }}>
                <i className="fa-solid fa-home"></i>
            </IconButton>);
        case "notifications-button":
            return (<IconButton style={styleData} onClick={() => {
                setNotificationDialogShowing(true);
            }}>
                <i className="fa-solid fa-bell"></i>
            </IconButton>);
        case "settings-button":
            return (<IconButton style={styleData}>
                <i className="fa-solid fa-gear"></i>
            </IconButton>);
        case "community-button":
            return (<IconButton style={styleData} onClick={() => {
                navigate("/community");
            }}>
                <i className="fa-solid fa-compass"></i>
            </IconButton>);
        case "marketplace-button":
            return (<IconButton style={styleData} onClick={() => {
                navigate("/marketplace");
            }}>
                <i className="fa-solid fa-cart-shopping"></i>
            </IconButton>);
        case "logout-button":
            return (
                <button style={styleData} onClick={() => {
                    Cookies.remove("Authorization");
                    navigate("/");
                    document.location.reload();
                }}>
                    로그아웃
                </button>
            );
        case "button":
            if(replacements !== undefined) {
                return (
                    <button onClick={replacements[elementData.onclick]} style={styleData}>
                        {childrenOfLayout}
                        {children}
                    </button>
                );
            }
            else {
                return (
                    <button onClick={() => {}} style={styleData}>
                    </button>
                );
            }
        case "checkbox":
            if(replacements !== undefined) {
                return (
                    <input type={"checkbox"} onChange={replacements[elementData.onchange]} style={styleData}/>
                );
            }
            else {
                return (
                    <input type={"checkbox"} style={styleData}/>
                );
            }
        case "search-bar":
            return (
                <SearchBar style={styleData}/>
            );
        case "chatting-header":
            return (
                <ChattingHeader elementData={elementData}/>
            );
        case "chatting-contents":
            return (
                <ChattingContents elementData={elementData}/>
            );
        case "chatting-footer":
            return (
                <ChattingFooter elementData={elementData}/>
            );
        case "text":
            if (typeof replacements !== "undefined") {
                const text = {...elementData.text};
                for (const key in replacements) {
                    text["default"] = text["default"].replace(key, replacements[key]);
                }
                return (
                    <div style={styleData}>
                        {textByDocumentLocale(text)}
                    </div>
                );
            } else {
                return (
                    <div style={styleData}>
                        {textByDocumentLocale(elementData.text)}
                    </div>
                );
            }
        case "img":
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
                <img style={styleData} src={src}></img>
            );
        default:
            // console.log("Unknown Component");
            // console.log(elementData.type);
            // console.log(elementData);
            return (
                <div style={styleData}>

                </div>
            );
    }
}