import {IconButton, RelativeLayout} from "../App";
import convertedStyle from "../styleUtils";

export default function ChattingFooter({elementData}) {

    const styleData = convertedStyle(elementData.style);

    const sendButtonStyle = convertedStyle(elementData["send-button"].style);
    const inputFieldStyle = convertedStyle(elementData["input-field"].style);
    const inputStyle = convertedStyle(elementData["input-field"].input.style);
    const popupMenuButtonStyle = convertedStyle(elementData["input-field"]["popup-menu-button"].style);
    const popupMenuStyle = convertedStyle(elementData["input-field"]["popup-menu"].style);

    return (
        <RelativeLayout style={styleData}>

            <div style={inputFieldStyle}>
                <input style={inputStyle} placeholder={"Type your message here..."}/>
                <IconButton style={popupMenuButtonStyle}>
                    <i className="fa-solid fa-plus"></i>
                </IconButton>
            </div>

            <IconButton style={sendButtonStyle} onClick={() => {

            }}>
                <i className="fa-solid fa-paper-plane"></i>
            </IconButton>
        </RelativeLayout>
    );
}