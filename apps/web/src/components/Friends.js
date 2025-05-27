import ComponentFromTheme from "../ComponentFromTheme";
import {VerticalLinearLayout} from "../App";
import convertedStyle from "../styleUtils";
import {useStore} from "../store";
import {defaultProfileImage} from "@myorg/shared/api/media";

export default function Friends({elementData}) {
    const children = [];

    const {friends} = useStore();

    for(const friend of friends) {
        const replacements = {
            "@name": friend.userName,
            "@image": friend.userProfileImage ?? defaultProfileImage,
        };
        children.push(
            <ComponentFromTheme elementData={elementData.item} replacements={replacements}/>
        );
    }

    const styleData = convertedStyle(elementData.style);

    return (
        <VerticalLinearLayout style={styleData}>
            {children}
        </VerticalLinearLayout>
    );
}