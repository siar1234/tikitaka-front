import {useStore} from "../store";
import ComponentFromTheme from "../ComponentFromTheme";
import convertedStyle from "../styleUtils";
import {useState} from "react";
import Themes from "../components/Themes";
import Plugins from "../components/Plugins";

export default function Marketplace() {

    const {theme} = useStore();
    const [fragmentIndex, setFragmentIndex] = useState(0);
    const themesButtonChildren = [];
    const pluginsButtonChildren = [];

    const tapBarStyle = convertedStyle(theme.marketplace.web["tap-bar"].style);

    const themesButtonStyle = convertedStyle(theme.marketplace.web["tap-bar"]["themes-button"].style);
    const pluginsButtonStyle = convertedStyle(theme.marketplace.web["tap-bar"]["plugins-button"].style);

    for(const item of theme.marketplace.web["tap-bar"]["themes-button"].children) {
        themesButtonChildren.push(
            <ComponentFromTheme elementData={item} />
        );
    }

    for(const item of theme.marketplace.web["tap-bar"]["plugins-button"].children) {
        pluginsButtonChildren.push(
          <ComponentFromTheme elementData={item} />
        );
    }

    const fragments = [
        (
            <Themes elementData={theme.marketplace.web["themes"]}/>
        ),
        (
            <Plugins elementData={theme.marketplace.web["plugins"]}/>
        )
    ];

    return (
      <>
          <div style={tapBarStyle}>
              <button style={themesButtonStyle} onClick={() => {
                  setFragmentIndex(0);
              }}>
                  {themesButtonChildren}
              </button>
              <button style={pluginsButtonStyle} onClick={() => {
                  setFragmentIndex(1);
              }}>
                  {pluginsButtonChildren}
              </button>
          </div>
          {fragments[fragmentIndex]}
      </>
    );
}