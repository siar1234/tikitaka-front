import convertedStyle from "../../styleUtils";
import {RelativeLayout, VerticalLinearLayout} from "../../App";
import ComponentFromTheme from "../../ComponentFromTheme";
import {useStore} from "../../store";

export default function ChattingContents({elementData}) {
    const styleData = convertedStyle(elementData.style);

    const children = [];
    const {chatRoom, userInfo} = useStore();

    for(const message of chatRoom.messages) {
        const replacements = {
            "@message": message.content,
            "@date": message.writeDateTime,
        };

        // {
        //     "senderId": "test1",
        //     "senderName": "name1",
        //     "profileImage": null,
        //     "content": "테스트",
        //     "writeDateTime": "2025-04-30T23:50:33.852"
        // }
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
        </VerticalLinearLayout>
    );
}