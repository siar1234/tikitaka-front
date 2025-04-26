import convertedStyle from "../styleUtils";
import {useEffect, useState} from "react";
import {getThemes} from "@myorg/shared/api/market";

export default function Themes({elementData}) {

    const [themes, setThemes] = useState([]);
    const style = convertedStyle(elementData.style);
    const children = [];

    useEffect(() => {
        setThemes(getThemes());
    }, []);



    return (
        <div style={style}>
            {children}
        </div>
    );
}