import {IconButton} from "../App";
import convertedStyle from "../styleUtils";
import {useState} from "react";
import AddFriendMenu from "./AddFriendMenu";

export default function AddFriendButton({elementData}) {

    const styleData = convertedStyle(elementData.style);
    const [menuShowing, setMenuShowing] = useState(false);

    const onClose = () => {
        setMenuShowing(false);
        document.body.removeEventListener("click", onClose);
    };
    return (
        <>
        <IconButton style={styleData} onClick={(e) => {
            e.stopPropagation();
            setMenuShowing(true);
            document.body.addEventListener("click", onClose);
        }}>
            <i className="fa-solid fa-circle-plus"></i>
        </IconButton>
            <AddFriendMenu showing={menuShowing} elementData={elementData.menu}/>
        </>
    );
}