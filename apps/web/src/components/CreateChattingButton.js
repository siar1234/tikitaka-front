import {IconButton} from "../App";
import convertedStyle from "../styleUtils";
import {useState} from "react";
import CreateChattingMenu from "./CreateChattingMenu";

export default function CreateChattingButton({elementData}) {

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
            <CreateChattingMenu showing={menuShowing} elementData={elementData.menu} onClose={onClose} />
        </>
    );
}