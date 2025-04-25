import ComponentFromTheme from "../ComponentFromTheme";
import {useStore} from "../store";
import {themeModeOnWeb} from "@myorg/shared/themeMode";

export default function Forum() {
    const themeMode = themeModeOnWeb();
    const {theme} = useStore();
    const children = [];
    for(const item of theme["forum"].web) {
        children.push(
            <ComponentFromTheme elementData={item} />
        );
    }
    return (
        <>
        </>
    );
}