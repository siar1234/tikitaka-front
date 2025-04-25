import ComponentFromTheme from "../ComponentFromTheme";
import {useStore} from "../store";

export default function MainPage() {
    const {theme} = useStore();
    const children = [];
    for(const item of theme["main-page"].web) {
        children.push(
            <ComponentFromTheme elementData={item} />
        );
    }
    return (
        <>
            {children}
        </>
    );
}