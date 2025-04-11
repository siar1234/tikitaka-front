import {RelativeLayout} from "../App";
import convertedStyle from "../styleUtils";
import ComponentFromTheme from "../ComponentFromTheme";

export default function ChattingHeader({elementData}) {

    const children = [];

    for(const child of elementData.children) {
        const replacements = {
            "@title": "Seung yong",
            "@subtitle": "Online - Last seen, 2.02pm"
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