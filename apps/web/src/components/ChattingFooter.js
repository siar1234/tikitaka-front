import {IconButton, RelativeLayout} from "../App";
import convertedStyle from "../styleUtils";

export default function ChattingFooter({elementData}) {

    const styleData = convertedStyle(elementData.style);

    const sendButtonStyle = convertedStyle(elementData["send-button"].style);

    return (
        <RelativeLayout style={styleData}>
            <IconButton style={sendButtonStyle} onClick={() => {

            }}>
                <i className="fa-solid fa-paper-plane"></i>
            </IconButton>
        </RelativeLayout>
    );
}