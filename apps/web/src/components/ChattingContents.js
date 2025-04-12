import convertedStyle from "../styleUtils";
import {RelativeLayout, VerticalLinearLayout} from "../App";
import ComponentFromTheme from "../ComponentFromTheme";

export default function ChattingContents({elementData}) {
    const styleData = convertedStyle(elementData.style);

    const children = [];
    const messages = [
        {
            "text": "Hi",
            userId: "ddd",
            date: "Today, 8.30pm"
        },
        {
            "text": "Hi",
            userId: "ttt",
            date: "Today, 8.30pm"
        },
        {
            "text": "Hi342432h432o432h432j4h32kj32ghkbdfhkjldsfs9f83298432748932dfkdshf23894832djksf",
            userId: "ddd",
            date: "Today, 8.30pm"
        },
        {
            "text": "34i32u43248324y234k23jh423j4g23l4h23423g423hj4g23j4h32g4j32h4g32j4hg324j32hg432j4g23j423lg",
            userId: "ttt",
            date: "Today, 8.30pm"
        },
        {
            "text": "Hi",
            userId: "ttt",
            date: "Today, 8.30pm"
        }
    ];

    for(const message of messages) {
        const replacements = {
            "@message": message.text,
            "@date": message.date,
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