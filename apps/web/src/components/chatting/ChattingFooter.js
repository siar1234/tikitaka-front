import {IconButton, RelativeLayout} from "../../App";
import convertedStyle from "../../styleUtils";
import {useStore} from "../../store";
import Cookies from "js-cookie";
import {useRef} from "react";

export default function ChattingFooter({elementData}) {

    const styleData = convertedStyle(elementData.style);
    const {stompClient, chatRoom} = useStore();

    const sendButtonStyle = convertedStyle(elementData["send-button"].style);
    const inputFieldStyle = convertedStyle(elementData["input-field"].style);
    const inputStyle = convertedStyle(elementData["input-field"].input.style);
    const popupMenuButtonStyle = convertedStyle(elementData["input-field"]["popup-menu-button"].style);
    const popupMenuStyle = convertedStyle(elementData["input-field"]["popup-menu"].style);

    const inputRef = useRef(null);

    const sendMessage = () => {
        const sendJson = {
            "chatId": chatRoom.chatId,
            "content": inputRef.current.value,
        };
        stompClient.send('/app/send', { "token": `${Cookies.get("Authorization")}`}, JSON.stringify(sendJson));
        inputRef.current.value = "";
    };

    return (
        <RelativeLayout style={styleData}>

            <div style={inputFieldStyle}>
                <input style={inputStyle} placeholder={"Type your message here..."} ref={inputRef}
                       onKeyDown={(e) => {
                           if (e.key === "Enter") {
                               sendMessage();
                           }
                       }}
                onSubmit={() => {
                    sendMessage();
                }}/>
                <IconButton style={popupMenuButtonStyle}>
                    <i className="fa-solid fa-plus"></i>
                </IconButton>
            </div>

            <IconButton style={sendButtonStyle} onClick={() => {
                sendMessage();
            }}>
                <i className="fa-solid fa-paper-plane"></i>
            </IconButton>
        </RelativeLayout>
    );
}