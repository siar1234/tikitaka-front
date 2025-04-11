import {RelativeLayout} from "../App";
import convertedStyle from "../styleUtils";

export default function ChattingHeader({elementData}) {

    const styleData = convertedStyle(elementData.style);

    return (
        <RelativeLayout style={styleData}>

        </RelativeLayout>
    );
}