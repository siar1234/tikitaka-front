import convertedStyle from "../styleUtils";
import {useRef} from "react";
import {createChat} from "@myorg/shared/api/chat";
import {useStore} from "../store";

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

    return (
        <div style={styleData} onClick={(e) => {
            e.stopPropagation();
        }}>
            <input style={inputStyle} ref={nameRef} />
            <button style={buttonStyle} onClick={ async (e) => {
                await createChat({
                    name: nameRef.current.value,
                    participants: [],
                    onFailed: (e, response) => {
                        alert(e);
                        alert(response);
                    },
                    onSuccess: (response) => {
                        chats.push({
                           chatName: nameRef.current.value,
                        });
                        onClose();
                    }
                });
            }}>
                Create
            </button>
        </div>
    );
}