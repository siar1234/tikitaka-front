import {useStore} from "../store";
import {textByDocumentLocale} from "../textUtils";
import convertedStyle from "../styleUtils";
import ComponentFromTheme from "../ComponentFromTheme";

export default function SettingsPage() {

    const {themes, theme} = useStore();

    const cardStyle = convertedStyle(theme.settings.web);

    const children = [];

    for(const itemData of theme.settings.web) {
        children.push(
            <ComponentFromTheme elementData={itemData} />
        );
    }

    return (
        <>
            {children}
        </>
    );
}