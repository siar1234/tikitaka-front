import convertedStyle from "../../styleUtils";
import {textByDocumentLocale} from "../../textUtils";
import {useState} from "react";
import AddFriendToChat from "./AddFriendToChat";

export default function ChattingHeaderMenu({elementData, showing}) {

    const styleData = convertedStyle(elementData.style);
    if(!showing) {
        styleData["display"] = "none";
    }
    else {
        styleData["display"] = "block";
    }
    const children = [

    ];
    const menuList = [

    ];

    const onClickMethod = (type) => {
        switch (type) {
            case "add-friend-button":
                return () => {

                }
            default:
                return (e) => {

                }
        }
    }

    for(const child of elementData.children) {
        // children.push(
        //   <button style={convertedStyle(child.style)} onClick={onClickMethod(child.type)}>
        //       {textByDocumentLocale(child.text)}
        //   </button>
        // );
        switch (child.type) {
            case "add-friend-button":
                children.push(
                  <AddFriendToChat elementData={child}/>
                );
                break;
        }
    }

    return (
        <>
            <div style={styleData} onClick={(e) => {
                e.stopPropagation();
            }}>
                {children}
            </div>
        </>
    );
}