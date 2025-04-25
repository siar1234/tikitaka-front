import ComponentFromTheme from "../ComponentFromTheme";
import {VerticalLinearLayout} from "../App";
import convertedStyle from "../styleUtils";
import {useStore} from "../store";

export default function Peoples({elementData}) {
    const children = [];

    const {peoples} = useStore();

    for(const people of peoples) {
        const replacements = {
            "@name": people.name
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