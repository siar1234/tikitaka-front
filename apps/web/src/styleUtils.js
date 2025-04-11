export default function convertedStyle(style) {
    const styleData = {

    };
    for(const styleDataItemKey in style) {
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
            case "margin-top":
                styleKey = "marginTop";
                break;
            case "margin-left":
                styleKey = "marginLeft";
                break;
            case "margin-right":
                styleKey = "marginRight";
                break;
            case "padding-top":
                styleKey = "paddingTop";
                break;
            case "padding-bottom":
                styleKey = "paddingBottom";
                break;
            case "padding-left":
                styleKey = "paddingLeft";
                break;
            case "padding-right":
                styleKey = "paddingRight";
                break;
            case "background-color":
                styleKey = "backgroundColor";
                break;
            case "text-align":
                styleKey = "textAlign";
                break;
            case "line-height":
                styleKey = "lineHeight";
                break;
            case "letter-spacing":
                styleKey = "letterSpacing";
                break;
            case "border-radius":
                styleKey = "borderRadius";
                break;
            case "border":
                styleKey = "border";
                break;
            case "color":
                styleKey = "color";
                break;
            case "width":
                styleKey = "width";
                break;
            case "height":
                styleKey = "height";
                break;
            case "display":
                styleKey = "display";
                break;
            case "justify-content":
                styleKey = "justifyContent";
                break;
            case "align-items":
                styleKey = "alignItems";
                break;
            case "flex-direction":
                styleKey = "flexDirection";
                break;
            case "position":
                styleKey = "position";
                break;
            case "top":
                styleKey = "top";
                break;
            case "bottom":
                styleKey = "bottom";
                break;
            case "left":
                styleKey = "left";
                break;
            case "right":
                styleKey = "right";
                break;
            case "z-index":
                styleKey = "zIndex";
                break;
            case "overflow-y":
                styleKey = "overflowY";
                break;
        }
        styleData[styleKey] = style[styleDataItemKey];
    }

    return styleData;
}