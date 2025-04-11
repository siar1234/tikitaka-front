import convertedStyle from "../styleUtils";
import {RelativeLayout} from "../App";

export default function ChattingContents({elementData}) {
    const styleData = convertedStyle(elementData.style);

    return (
        <RelativeLayout style={styleData}>

        </RelativeLayout>
    );
}