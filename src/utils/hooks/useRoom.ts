import type * as i from 'types';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { type Actions, type RoomState } from 'party/types';
import usePartySocket from 'partysocket/react';

import { useRoomStore } from 'store/room';

export const useRoom = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const { username } = useRoomStore();

  const [roomState, setRoomState] = useState<RoomState | null>(null);

  const socket = usePartySocket({
    host: process.env.NEXT_PUBLIC_SERVER_URL || '127.0.0.1:1999',
    room: roomCode,
    id: username!,
    onMessage(event: MessageEvent<string>) {
      setRoomState(JSON.parse(event.data));
    },
  });

  const dispatch = (action: Actions) => {
    socket.send(JSON.stringify(action));
  };

  const getCardsByCategory = (category: i.CardCategories) => {
    return roomState?.cards?.[category];
  };

  return {
    dispatch,
    getCardsByCategory,
    roomCode,
    roomState,
  };
};
