import {VerticalLinearLayout} from "../App";
import ComponentFromTheme from "../ComponentFromTheme";
import convertedStyle from "../styleUtils";
import {useStore} from "../store";

export default function Chats({elementData}) {

    const children = [];

    const {chats} = useStore();
    for(const chat of chats) {
        const replacements = {
            "@name": chat.chatName,
            "@thumbnail": chat.chatName
        };
        children.push(
            <ComponentFromTheme elementData={elementData.item} replacements={replacements}/>
        );
    }

    const styleData = convertedStyle(elementData.style);

    return (
        <VerticalLinearLayout style={styleData}>
            {children}
        </VerticalLinearLayout>
    );
}