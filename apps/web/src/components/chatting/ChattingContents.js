import convertedStyle from "../../styleUtils";
import {RelativeLayout, VerticalLinearLayout} from "../../App";
import ComponentFromTheme from "../../ComponentFromTheme";
import {useStore} from "../../store";
import {useEffect, useRef} from "react";

export default function ChattingContents({elementData}) {
    const styleData = convertedStyle(elementData.style);

    const children = [];
    const {chatRoom, userInfo} = useStore();

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatRoom]);

    for(const message of chatRoom.messages) {

        const replacements = {
            "@message": message.content,
            "@date": message.writeDateTime,
        };

        if(message.senderId !== userInfo.userId) {
            children.push(
                <ComponentFromTheme elementData={elementData["item-partner"]} replacements={replacements}/>
            );
        }
        else {
            children.push(
                <ComponentFromTheme elementData={elementData.item} replacements={replacements}/>
            );
        }

    }

    return (
        <VerticalLinearLayout style={styleData}>
            {children}
            <div ref={bottomRef} />
        </VerticalLinearLayout>
    );
}