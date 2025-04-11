import { create } from 'zustand';

export const useStore = create((set) => ({
    fragmentIndex: 0,
    setFragmentIndex: (fragmentIndex) => set({ fragmentIndex }),
}));
