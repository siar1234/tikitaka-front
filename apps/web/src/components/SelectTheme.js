import {useStore} from "../store";
import {textByDocumentLocale} from "../textUtils";

export default function SelectTheme() {

    const themeItems = [];
    const {themes, setTheme} = useStore();

    for(const item of themes) {
        themeItems.push(
            <div onClick={() => {
                setTheme(item);
            }}>
                <div>

                </div>
                {textByDocumentLocale(item.name)}
            </div>
        );
    }
    return (
        <>
            {themeItems}
        </>
    );
}