import {VerticalLinearLayout} from "../App";
import ComponentFromTheme from "../ComponentFromTheme";
import convertedStyle from "../styleUtils";
import {useStore} from "../store";

export default function Groups({elementData}) {

    const children = [];

    const {groups} = useStore();
    for(const group of groups) {
        const replacements = {
            "@name": group.name
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