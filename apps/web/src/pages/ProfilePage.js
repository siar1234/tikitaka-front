import {useStore} from "../store";
import ComponentFromTheme from "../ComponentFromTheme";

export default function ProfilePage() {
    const {theme} = useStore();
    const children = [];
    for(const item of theme["profile-page"].web) {
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