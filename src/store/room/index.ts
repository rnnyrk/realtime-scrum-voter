import type * as i from 'types';
import { createContext } from 'react';
import { create } from 'zustand';

export const RoomContext = createContext<i.RoomContextType | null>(null);

type RoomStore = {
  username: string | null;
  setUsername: (data: string | null) => void;
};

export const useRoomStore = create<RoomStore>()((set) => ({
  username: null,
  setUsername: (data) => set({ username: data }),
}));
