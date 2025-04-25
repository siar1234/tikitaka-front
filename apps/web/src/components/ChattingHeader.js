import {RelativeLayout} from "../App";
import convertedStyle from "../styleUtils";
import ComponentFromTheme from "../ComponentFromTheme";
import {useStore} from "../store";

export default function ChattingHeader({elementData}) {

    const {chatRoom} = useStore();
    const children = [];

    for(const child of elementData.children) {
        const replacements = {
            "@title": chatRoom.title,
            "@subtitle": chatRoom.subtitle
        };
        children.push(
          <ComponentFromTheme elementData={child} replacements={replacements}/>
        );
    }

    const styleData = convertedStyle(elementData.style);

    return (
        <RelativeLayout style={styleData}>
            {children}
        </RelativeLayout>
    );
}