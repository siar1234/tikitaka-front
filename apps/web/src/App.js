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
import {getUserInfo} from "@myorg/shared/api/user";
import {themeModeOnWeb} from "@myorg/shared/themeMode";
import Marketplace from "./pages/Marketplace";
import Cookies from "js-cookie";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import defaultTheme from "@myorg/shared/default-theme.json";
import theme1 from "../src/assets/default-theme-test1.json";
import theme2 from "../src/assets/default-theme-test2.json";
import SplashScreen from "./pages/SplashScreen";
import {getChatRoomMessages, getChats} from "@myorg/shared/api/chat";
import {getFriends, notificationFromFriendRequest, receivedFriendRequests} from "@myorg/shared/api/friend";
import {defaultChattingThumbnail, defaultProfileImage} from "@myorg/shared/api/media";
import {Stomp} from "@stomp/stompjs";
import SockJS from 'sockjs-client';
import Chats from "./components/Chats";
import SettingsPage from "./pages/SettingsPage";

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
        setChats,
        setFriends,
        setNotifications,
        chatRoom,
        setChatRoom,
        userInfo,
        setUserInfo,
        isAuthStateChanged,
        setAuthStateChanged,
        setStompClient,
        notifications,
        receivedMessages,
        setReceivedMessages,
    } = useStore();

    const themeMode = themeModeOnWeb();

    for (const property in theme.style.properties[themeMode]) {
        document.documentElement.style.setProperty(property, theme.style.properties[themeMode][property]);
    }

    useEffect(  () => {

        const handleFocus = () => {
            getFriends({
                onFailed: (e, response) => {
                    Cookies.remove("Authorization");
                },
                onSuccess: (friends) => {
                    setFriends(friends);
                }
            });
            receivedFriendRequests({
                onFailed: (e, response) => {

                },
                onSuccess: (friends) => {
                    const notificationList = [];
                    for(const friend of friends) {
                        notificationList.push(
                            notificationFromFriendRequest(friend)
                        );
                    }
                    setNotifications(notificationList);
                }
            });

            getUserInfo({
                onSuccess: (userInfo) => {

                    const socket = new SockJS('http://localhost:8080/socket/conn');
                    const stompClient = Stomp.over(socket);

                    stompClient.connect({}, () => {

                        stompClient.subscribe(`/queue/${userInfo.userId}`, (messageOutput) => {
                            const jsonData = JSON.parse(messageOutput.body);
                            notifications.push(
                                notificationFromFriendRequest(jsonData)
                            );
                        });

                        getChats({
                            onFailed: (e, response) => {
                                Cookies.remove("Authorization");
                            },
                            onSuccess: (chats) => {
                                setChats(chats);
                                if(chatRoom.chatId === undefined && chats.length > 0) {
                                    getChatRoomMessages({
                                        onSuccess: (messages) => {
                                            setChatRoom( {
                                                title: chats[0].chatName,
                                                subtitle: "",
                                                messages: messages,
                                                thumbnail: defaultChattingThumbnail,
                                                chatId: chats[0].chatId
                                            });
                                        },
                                        chatId: chats[0].chatId,
                                        onFailed: (error) => {}
                                    });
                                }

                                for(const chat of chats) {
                                    stompClient.subscribe(`/topic/chatting/${chat.chatId}`, (messageOutput) => {
                                        if(chatRoom.chatId !== chat.chatId) {
                                            if(typeof receivedMessages[chat.chatId] !== "number") {
                                                receivedMessages[chat.chatId] = 1;
                                            }
                                            else {
                                                receivedMessages[chat.chatId]++;
                                            }
                                            setReceivedMessages(receivedMessages);
                                        }
                                    });
                                }
                            }
                        });

                        setStompClient(stompClient);
                    });
                    setUserInfo(userInfo);
                },
                onFailed: (error, response) => {

                }
            });
            setLoading(false);
            setAuthStateChanged(false);
        };

        handleFocus();
        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, [isAuthStateChanged]);

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
                <Route path="/settings" element={<SettingsPage />}/>
            </Routes>
            {sharedComponents}
            <NotificationsDialog isOpen={notificationsDialogShowing} onClose={() => {
                setNotificationDialogShowing(false);
            }}/>
        </>
    );
}

export default App;
