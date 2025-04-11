import convertedStyle from "../styleUtils";
import {RelativeLayout, VerticalLinearLayout} from "../App";
import ComponentFromTheme from "../ComponentFromTheme";

export default function ChattingContents({elementData}) {
    const styleData = convertedStyle(elementData.style);

    const children = [];
    const messages = [
        {
            "text": "Hi",
            userId: "ddd"
        },
        {
            "text": "Hi",
            userId: "ttt"
        },
        {
            "text": "Hi",
            userId: "ddd"
        },
        {
            "text": "Hi",
            userId: "ttt"
        },
        {
            "text": "Hi",
            userId: "ttt"
        }
    ];

    for(const message of messages) {
        const replacements = {
            "@message": message.text,
        };
        if(message.userId === "ttt"){
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
        </VerticalLinearLayout>
    );
}