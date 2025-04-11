import ComponentFromTheme from "../ComponentFromTheme";
import {VerticalLinearLayout} from "../App";
import convertedStyle from "../styleUtils";

export default function Peoples({elementData}) {
    const children = [];

    const peoples = [
        {
            name: "Sam"
        },
        {
            name: "John"
        },
        {
            name: "Jackson"
        },
        {
            name: "George"
        },
        {
            name: "Carl"
        },
    ];

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