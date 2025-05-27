import convertedStyle from "../../styleUtils";
import {textByDocumentLocale} from "../../textUtils";
import {useState} from "react";
import AddFriendToChat from "./AddFriendToChat";

export default function ChattingHeaderMenu({elementData, showing, requestClose}) {

    const styleData = convertedStyle(elementData.style);
    if(!showing) {
        styleData["display"] = "none";
    }
    else {
        styleData["display"] = "block";
    }
    const children = [

    ];

    for(const child of elementData.children) {
        switch (child.type) {
            case "add-friend":
                children.push(
                  <AddFriendToChat elementData={child} requestClose={requestClose}/>
                );
                break;
                case "delete-button":
                    children.push(
                        <button style={convertedStyle(child.style)}>
                            삭제
                        </button>
                    );
                    break;
        }
    }

    return (
            <div style={{
                ...styleData,
                zIndex: "1000 !important",
            }} onClick={(e) => {
                e.stopPropagation();
            }}>
                {children}
            </div>
    );
}