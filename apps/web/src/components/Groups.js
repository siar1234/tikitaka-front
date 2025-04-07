import {VerticalLinearLayout} from "../App";
import ComponentFromTheme from "../ComponentFromTheme";

export default function Groups({elementData}) {

    const children = [];

    const groups = [
        {
            name: "Project1"
        },
        {
            name: "Project1"
        },
        {
            name: "Project1"
        },
        {
            name: "Project1"
        },
    ];

    for(const group of groups) {
        let itemData = elementData.item;
        if(typeof itemData.children !== "undefined") {
            for(const child of itemData.children) {
                if(child.type === "text") {
                    child.text = {
                        "default": group.name
                    }
                }
            }
        }
        children.push(
            <ComponentFromTheme elementData={elementData.item}/>
        );
    }

    return (
        <VerticalLinearLayout style={elementData.style}>
            {children}
        </VerticalLinearLayout>
    );
}