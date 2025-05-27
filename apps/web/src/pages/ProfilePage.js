import {useStore} from "../store";
import ComponentFromTheme from "../ComponentFromTheme";
import {BACKEND_URL} from "@myorg/shared/api/serverAddress";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

export default function ProfilePage() {
    
    const {theme} = useStore();
    const children = [];
    const {userInfo} = useStore();
    for(const item of theme["profile-page"].web) {
        const replacements = {
            "@profile": userInfo.profileImage ?? `${BACKEND_URL}/file/default-profile-image.png`,
            "@name": userInfo.userName,
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