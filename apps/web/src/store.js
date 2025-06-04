import { create } from 'zustand';
import lightTheme from '@myorg/shared/default-theme.json';
import cherryTheme from '@myorg/shared/cherry-theme.json';
import fogForrestTheme from '@myorg/shared/fog-forrest-theme.json';

export const useStore = create((set) => ({
    fragmentIndex: 0,
    setFragmentIndex: (fragmentIndex) => set({ fragmentIndex }),
    notificationsDialogShowing: false,
    setNotificationDialogShowing: (notificationsDialogShowing) => set({notificationsDialogShowing}),
    theme: lightTheme,
    setTheme: (theme) => set({ theme }),
    themes: [lightTheme, cherryTheme, fogForrestTheme],
    setThemes: (themes) => set({themes}),
    chats: [],
    setChats: (chats) => set({ chats }),
    friends: [],
    setFriends: (friends) => set({ friends }),
    notifications: [],
    setNotifications: (notifications) => set({ notifications }),
    chatRoom: {
        title: "",
        subtitle: "",
        messages: []
    },
    setChatRoom: (chatRoom) => set({ chatRoom }),
    userInfo: {},
    setUserInfo: (userInfo) => set({ userInfo }),
    isAuthStateChanged: false,
    setAuthStateChanged: (isAuthStateChanged) => set({ isAuthStateChanged }),
    stompClient: null,
    setStompClient: (stompClient) => set({ stompClient }),
    receivedMessages: {},
    setReceivedMessages: (receivedMessages) => set({receivedMessages})
}));