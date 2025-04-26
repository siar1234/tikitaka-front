import convertedStyle from "../styleUtils";
import {useEffect, useState} from "react";
import {getPlugins, getThemes} from "@myorg/shared/api/market";

export default function Plugins({elementData}) {

    const [plugins, setPlugins] = useState([]);

    const style = convertedStyle(elementData.style);

    useEffect(() => {
        setPlugins(getPlugins());
    }, []);

    return (
        <div style={style}>

        </div>
    );
}