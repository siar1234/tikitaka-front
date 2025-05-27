import {RelativeLayout} from "../../App";
import convertedStyle from "../../styleUtils";
import ComponentFromTheme from "../../ComponentFromTheme";
import {useStore} from "../../store";
import {useState} from "react";
import AddFriendMenu from "../AddFriendMenu";
import ChattingHeaderMenu from "./ChattingHeaderMenu";

export default function ChattingHeader({elementData}) {

    const [menuShowing, setMenuShowing] = useState(false);
    const onClose = () => {
        console.log("3");
        setMenuShowing(false);
        document.body.removeEventListener("click", onClose);
    };
    const {chatRoom} = useStore();
    const children = [];
    const popupMenuButtonStyle = convertedStyle(elementData["popup-menu-button"]["style"]);

    for(const child of elementData.children) {
        const replacements = {
            "@title": chatRoom.title,
            "@subtitle": chatRoom.subtitle,
            "@thumbnail": chatRoom.thumbnail
        };
        children.push(
          <ComponentFromTheme elementData={child} replacements={replacements}/>
        );
    }

    const styleData = convertedStyle(elementData.style);

    return (
        <>
            <RelativeLayout style={styleData}>
                {children}
                <button style={popupMenuButtonStyle} onClick={(e) => {
                    e.stopPropagation();
                    console.log("4");
                    setMenuShowing(true);
                    document.body.addEventListener("click", onClose);
                }}>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
            </RelativeLayout>
            <ChattingHeaderMenu showing={menuShowing} elementData={elementData["popup-menu-button"].menu} requestClose={() => {
                setMenuShowing(false);
            }}/>
        </>
    );
}