import lightTheme from "../assets/light-theme.json";
import ComponentFromTheme from "../ComponentFromTheme";

export default function Forum() {
    const children = [];
    for(const item of lightTheme["forum"].web) {
        children.push(
            <ComponentFromTheme elementData={item} />
        );
    }
    return (
        <>
        </>
    );
}