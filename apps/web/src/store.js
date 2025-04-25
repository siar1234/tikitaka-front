import { create } from 'zustand';
import lightTheme from './assets/default-theme.json';

export const useStore = create((set) => ({
    fragmentIndex: 0,
    setFragmentIndex: (fragmentIndex) => set({ fragmentIndex }),
    notificationsDialogShowing: false,
    setNotificationDialogShowing: (notificationsDialogShowing) => set({notificationsDialogShowing}),
    theme: lightTheme,
    setTheme: (theme) => set({ theme }),
    groups: [],
    setgroups: (groups) => set({ groups }),
    peoples: [],
    setPeoples: (peoples) => set({ peoples }),
    notifications: [],
    setNotifications: (notifications) => set({ notifications }),
    chatRoom: {
        title: "",
        subtitle: "",
        messages: []
    },
    setChatRoom: (chatRoom) => set({ chatRoom }),
}));