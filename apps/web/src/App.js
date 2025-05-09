import './App.css';
import styled from "styled-components";
import ComponentFromTheme from "./ComponentFromTheme";
import MainPage from "./pages/MainPage";
import Community from "./pages/Community";
import {Route, Routes} from "react-router-dom";
import NotificationsDialog from "./dialogs/NotificationsDialog";
import {useStore} from "./store";
import {useEffect, useState} from "react";
import {getChattingMessages} from "@myorg/shared/api/chattingMessage";
import {getGroups, getNotifications, getFriends, getUserInfo} from "@myorg/shared/api/user";
import {themeModeOnWeb} from "@myorg/shared/themeMode";
import Marketplace from "./pages/Marketplace";
import Cookies from "js-cookie";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import defaultTheme from "../src/assets/default-theme.json";
import theme1 from "../src/assets/default-theme-test1.json";
import theme2 from "../src/assets/default-theme-test2.json";
import SplashScreen from "./pages/SplashScreen";

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

    const [loading, setLoading] = useState(true);
    const token = Cookies.get("Authorization");

    const {
        notificationsDialogShowing,
        setNotificationDialogShowing,
        theme,
        setgroups,
        setFriends,
        setNotifications,
        setChatRoom,
        setUserInfo
    } = useStore();

    const themeMode = themeModeOnWeb();

    for (const property in theme.style.properties[themeMode]) {
        document.documentElement.style.setProperty(property, theme.style.properties[themeMode][property]);
    }

    useEffect(  () => {
        getFriends({
            onFailed: (e, response) => {
                if( (e !== null && e !== undefined) || (response !== null && response !== undefined)  ) {
                    console.log(e);
                    console.log(response);
                    //Cookies.remove("Authorization");
                }
            },
            onSuccess: (friends) => {
                setFriends(friends);
            }
        });
        //setgroups(getGroups());
        setNotifications(getNotifications());
        setChatRoom(
            {
                title: "이승용",
                subtitle: "접속중",
                messages: getChattingMessages(),
                thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHP-ZLzyQ4v-BQNFrYI459cPc82Xfc8OfmA&s"
            }
        );
        setUserInfo(getUserInfo());
        setLoading(false);
    }, []);

    if (token === undefined) {
        return (
            <Routes>
                <Route path="/" element={<SignInPage/>}/>
                <Route path="/signUp" element={<SignUpPage/>}/>
            </Routes>
        );
    }

    const sharedComponents = [];

    for (const item of theme["shared-components"].web) {
        sharedComponents.push(<ComponentFromTheme elementData={item}/>);
    }

    const styleData = {};
    for (const styleDataItemKey in theme.style.web) {
        styleData[styleDataItemKey] = theme.style.web[styleDataItemKey];
        document.body.style[styleDataItemKey] = styleData[styleDataItemKey];
    }

    if (loading) {
        return (
            <SplashScreen/>
        );
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/community" element={<Community/>}/>
                <Route path="/marketplace" element={<Marketplace/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
            </Routes>
            {sharedComponents}
            <NotificationsDialog isOpen={notificationsDialogShowing} onClose={() => {
                setNotificationDialogShowing(false);
            }}/>
        </>
    );
}

export default App;
