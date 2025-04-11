import lightTheme from "../assets/light-theme.json";
import ComponentFromTheme from "../ComponentFromTheme";

export default function MainPage() {
    const children = [];
    for(const item of lightTheme["main-page"].web) {
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