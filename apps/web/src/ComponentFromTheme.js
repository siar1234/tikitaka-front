import styled from "styled-components";
import {HorizontalLinearLayout, IconButton, RelativeLayout, VerticalLinearLayout} from "./App";
import SearchBar from "./components/SearchBar";
import {textByDocumentLocale, textByLocale} from "./textUtils";
import Groups from "./components/Groups";

export default function ComponentFromTheme({elementData}) {

    const styleData = {

    };
    for(const styleDataItemKey in elementData.style) {
        let styleKey = styleDataItemKey;
        switch (styleDataItemKey) {
            case "font-weight":
                styleKey = "fontWeight";
                break;
            case "font-size":
                styleKey = "fontSize";
                break;
            case "margin-bottom":
                styleKey = "marginBottom";
                break;
        }
        styleData[styleKey] = elementData.style[styleDataItemKey];
    }

    const childrenOfLayout = [];
    if(typeof elementData.children !== "undefined") {
        for (const child of elementData.children) {
            childrenOfLayout.push(<ComponentFromTheme elementData={child}/>);
        }
    }

    switch (elementData.type) {

        case "linear-layout":

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
        case "relative-layout":
            return (
                <RelativeLayout style={styleData}>
                    {childrenOfLayout}
                </RelativeLayout>
            );
        case "groups":
            return (
              <Groups elementData={elementData}></Groups>
            );
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
        case "github-button":
            return (<IconButton style={styleData}>
                <i className="fa-brands fa-github"></i>
            </IconButton>);
            case "search-bar":
                return (
                    <SearchBar style={styleData}/>
                );
        case "text":
            return (
              <div style={styleData}>
                  {textByDocumentLocale(elementData.text)}
              </div>
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