import {useStore} from "../store";
import ComponentFromTheme from "../ComponentFromTheme";

export default function ProfilePage() {
    const {theme} = useStore();
    const children = [];
    const {userInfo} = useStore();
    for(const item of theme["profile-page"].web) {
        const replacements = {
            "@profile": undefined,
            "@name": "Name",
            "@friends": "200",
            "@posts": "100",
            "@bio": "소개"
        };
        children.push(
            <ComponentFromTheme elementData={item} replacements={replacements}/>
        );
    }
    return (
        <>
            {children}
        </>
    );
}