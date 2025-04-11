import {HorizontalLinearLayout, IconButton, RelativeLayout, VerticalLinearLayout} from "./App";
import SearchBar from "./components/SearchBar";
import {textByDocumentLocale} from "./textUtils";
import Groups from "./components/Groups";
import Peoples from "./components/Peoples";
import ChattingHeader from "./components/ChattingHeader";
import convertedStyle from "./styleUtils";
import {useNavigate} from "react-router-dom";
import ChattingContents from "./components/ChattingContents";

export default function ComponentFromTheme({elementData, replacements}) {

    const styleData = convertedStyle(elementData.style);
    const navigate = useNavigate();

    const childrenOfLayout = [];
    if(typeof elementData.children !== "undefined") {
        for (const child of elementData.children) {
            childrenOfLayout.push(<ComponentFromTheme elementData={child} replacements={replacements}/>);
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
                <RelativeLayout style={styleData} replacements={replacements}>
                    {childrenOfLayout}
                </RelativeLayout>
            );
        case "groups":
            return (
              <Groups elementData={elementData}></Groups>
            );
        case "peoples":
            return (
              <Peoples elementData={elementData}></Peoples>
            );
        case "account-button":
            return (<IconButton style={styleData}>
                <i className="fa-solid fa-user"></i>
            </IconButton>);
        case "home-button":
            return (<IconButton style={styleData} onClick={() => {
                navigate("/");
            }}>
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
            return (<IconButton style={styleData} onClick={() => {
                navigate("/forum");
            }}>
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
        case "chatting-header":
            return (
              <ChattingHeader elementData={elementData}/>
            );
        case "chatting-contents":
            return (
                <ChattingContents elementData={elementData}/>
            );
        case "text":
            if(typeof replacements !== "undefined") {
                const text = {...elementData.text};
                for(const key in replacements) {
                    text["default"] = text["default"].replace(key, replacements[key]);
                }
                return (
                    <div style={styleData}>
                        {textByDocumentLocale(text)}
                    </div>
                );
            }
            else {
                return (
                    <div style={styleData}>
                        {textByDocumentLocale(elementData.text)}
                    </div>
                );
            }
        case "img":
            let src = elementData.src;
            if(typeof src === "undefined") {
                src = elementData.src;
            }
            return (
                <img style={styleData} src={src}></img>
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