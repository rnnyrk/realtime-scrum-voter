import { create } from 'zustand';

type RoomStore = {
  username: string | null;
  setUsername: (data: string | null) => void;
};

export const useRoomStore = create<RoomStore>()((set) => ({
  username: null,
  setUsername: (data) => set({ username: data }),
}));
