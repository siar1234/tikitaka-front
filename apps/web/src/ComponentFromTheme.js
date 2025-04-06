import styled from "styled-components";
import {HorizontalLinearLayout, IconButton, VerticalLinearLayout} from "./App";
import SearchBar from "./components/SearchBar";

export default function ComponentFromTheme({elementData}) {

    const styleData = {

    };
    for(const styleDataItemKey in elementData.style) {
        styleData[styleDataItemKey] = elementData.style[styleDataItemKey];
    }

    switch (elementData.type) {

        case "linear-layout":
            const childrenOfLayout = [];

            for (const child of elementData.children) {
                childrenOfLayout.push(<ComponentFromTheme elementData={child}/>);
            }

            if (elementData.orientation === "vertical") {
                return (
                    <VerticalLinearLayout style={styleData}>
                        {childrenOfLayout}
                    </VerticalLinearLayout>
                );
            } else {
                return (
                    <HorizontalLinearLayout style={styleData}>
                        {childrenOfLayout}
                    </HorizontalLinearLayout>
                );
            }
        case "account-button":
            return (<IconButton style={styleData}>
                <i className="fa-solid fa-user"></i>
            </IconButton>);
        case "home-button":
            return (<IconButton style={styleData}>
                <i className="fa-solid fa-home"></i>
            </IconButton>);
        case "notifications-button":
            return (<IconButton style={styleData}>
                <i className="fa-solid fa-bell"></i>
            </IconButton>);
        case "settings-button":
            return (<IconButton style={styleData}>
                <i className="fa-solid fa-gear"></i>
            </IconButton>);
        case "google-button":
            return (<IconButton style={styleData}>
                <i className="fa-brands fa-google"></i>
            </IconButton>);
        case "forum-button":
            return (<IconButton style={styleData}>
                <i className="fa-solid fa-compass"></i>
            </IconButton>);
            case "search-bar":
                return (
                    <SearchBar style={styleData}/>
                );
        default:
            console.log("Unknown Component");
            console.log(elementData.type);
            console.log(elementData);
            return (
                <div>

                </div>
            );
    }
}