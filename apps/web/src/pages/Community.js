import ComponentFromTheme from "../ComponentFromTheme";
import {useStore} from "../store";
import {themeModeOnWeb} from "@myorg/shared/themeMode";

export default function Community() {
    const {theme} = useStore();
    const children = [];
    for(const item of theme["community"].web) {
        children.push(
            <ComponentFromTheme elementData={item} />
        );
    }
    return (
        <>
        </>
    );
}