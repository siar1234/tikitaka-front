import './App.css';
import styled from "styled-components";
import ComponentFromTheme from "./ComponentFromTheme";
import MainPage from "./pages/MainPage";
import Community from "./pages/Community";
import {Route, Routes} from "react-router-dom";
import NotificationsDialog from "./dialogs/NotificationsDialog";
import {useStore} from "./store";
import {useEffect} from "react";
import {getChattingMessages} from "@myorg/shared/api/chattingMessage";
import {getGroups, getNotifications, getPeoples} from "@myorg/shared/api/user";
import {themeModeOnWeb} from "@myorg/shared/themeMode";
import Marketplace from "./pages/Marketplace";
import Cookies from "js-cookie";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

export const RelativeLayout = styled.div`
        position: relative;
    `;

export const VerticalLinearLayout = styled.div`
        display: flex;
        flex-direction: column;
    `;

export const HorizontalLinearLayout = styled.div`
        display: flex;
        flex-direction: row;
    `;

export const IconButton = styled.button`
        background: transparent;
        cursor: pointer;
        border: none;
        outline: none;
    `;

function App() {

    const token = Cookies.get("JSESSIONID");
    console.log(Cookies);

    const {notificationsDialogShowing, setNotificationDialogShowing, theme,setgroups, setPeoples, setNotifications, setChatRoom} = useStore();

    const themeMode = themeModeOnWeb();

    for(const property in theme.style.properties[themeMode]) {
        document.documentElement.style.setProperty(property, theme.style.properties[themeMode][property]);
    }

    useEffect(() => {
        setPeoples(getPeoples());
        setgroups(getGroups());
        setNotifications(getNotifications());
        setChatRoom(
            {
                title: "Seung Yong",
                subtitle: "Online - Last seen, 2.02pm",
                messages: getChattingMessages()
            }
        );
    }, []);

    if(token === undefined) {
        return (
            <Routes>
                <Route path="/" element={<SignInPage/>} />
                <Route path="/signUp" element={<SignUpPage/>} />
            </Routes>
        );
    }

  const sharedComponents = [];

  for(const item of theme["shared-components"].web) {
    sharedComponents.push(  <ComponentFromTheme elementData={item} />);
  }

  const styleData = {};
  for(const styleDataItemKey in theme.style.web) {
    styleData[styleDataItemKey] = theme.style.web[styleDataItemKey];
    document.body.style[styleDataItemKey] = styleData[styleDataItemKey];
  }

  return (
      <>
          <Routes>
              <Route path="/" element={<MainPage/>} />
              <Route path="/community" element={<Community/>} />
              <Route path="/marketplace" element={<Marketplace/>} />
          </Routes>
          {sharedComponents}
          <NotificationsDialog isOpen={notificationsDialogShowing} onClose={() => {
              setNotificationDialogShowing(false);
          }} />
      </>
  );
}

export default App;
