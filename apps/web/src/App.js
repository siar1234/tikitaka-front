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
import {getGroups, getNotifications, getPeoples, getUserInfo} from "@myorg/shared/api/user";
import {themeModeOnWeb} from "@myorg/shared/themeMode";
import Marketplace from "./pages/Marketplace";
import Cookies from "js-cookie";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import defaultTheme from "../src/assets/default-theme.json";
import theme1 from "../src/assets/default-theme-test1.json";
import theme2 from "../src/assets/default-theme-test2.json";

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

    const token = Cookies.get("Authorization");

    const {notificationsDialogShowing, setNotificationDialogShowing, theme,setgroups, setPeoples, setNotifications, setChatRoom, setUser, setTheme} = useStore();

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
                title: "이승용",
                subtitle: "접속중",
                messages: getChattingMessages(),
                thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHP-ZLzyQ4v-BQNFrYI459cPc82Xfc8OfmA&s"
            }
        );
        setUser(getUserInfo());
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

    const buttonPanel = document.createElement("div");
    const button1 = document.createElement("button");
    button1.innerText = "기본 테마";
    button1.onclick = () => {
      setTheme(defaultTheme);
    };
    const button2 = document.createElement("button");
    button2.innerText = "테마1";
    button2.onclick = () => {
        setTheme(theme1);
    };
    const button3 = document.createElement("button");
    button3.innerText = "테마2";
    button3.onclick = () => {
        setTheme(theme2);
    };
    buttonPanel.innerHTML = "";
    buttonPanel.appendChild(button1);
    buttonPanel.appendChild(button2);
    buttonPanel.appendChild(button3);
    buttonPanel.style.zIndex = "99999";
    buttonPanel.style.position = "fixed";
    //buttonPanel.style.display = "none";
    document.body.appendChild(buttonPanel);

    document.addEventListener('keydown', function(event) {
        if (event.key === 'k' || event.key === 'K') {
            buttonPanel.style.display = "block";
        }
        if (event.key === 'o' || event.key === 'O') {
            buttonPanel.style.display = "none";
        }
    });

  return (
      <>
          <Routes>
              <Route path="/" element={<MainPage/>} />
              <Route path="/community" element={<Community/>} />
              <Route path="/marketplace" element={<Marketplace/>} />
              <Route path="/profile" element={<ProfilePage/>} />
          </Routes>
          {sharedComponents}
          <NotificationsDialog isOpen={notificationsDialogShowing} onClose={() => {
              setNotificationDialogShowing(false);
          }} />
      </>
  );
}

export default App;
