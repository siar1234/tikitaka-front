import { create } from 'zustand';
import lightTheme from './assets/default-theme.json';

export const useStore = create((set) => ({
    fragmentIndex: 0,
    setFragmentIndex: (fragmentIndex) => set({ fragmentIndex }),
    notificationsDialogShowing: false,
    setNotificationDialogShowing: (notificationsDialogShowing) => set({notificationsDialogShowing}),
    theme: lightTheme,
    setTheme: (theme) => set({ theme }),
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