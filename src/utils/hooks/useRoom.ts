import { useState } from 'react';
import { type RoomAction, type RoomState } from 'party/socket';
import usePartySocket from 'partysocket/react';

export const useRoom = ({ username, roomCode }: UseRoomProps) => {
  const [roomState, setRoomState] = useState<RoomState | null>(null);

  const socket = usePartySocket({
    host: process.env.NEXT_PUBLIC_SERVER_URL || '127.0.0.1:1999',
    room: roomCode,
    id: username,
    onMessage(event: MessageEvent<string>) {
      setRoomState(JSON.parse(event.data));
    },
  });

  const dispatch = (action: RoomAction) => {
    socket.send(JSON.stringify(action));
  };

  // React.useEffect(() => {
  //   if (process.env.NODE_ENV !== 'production') console.info(roomState);
  //   if (roomState?.status) {
  //     updateRoomStatus.mutateAsync({
  //       roomCode,
  //       status: {
  //         status: roomState.status,
  //       },
  //     });
  //   }
  // }, [roomState?.status]);

  return {
    roomState,
    dispatch,
  };
};

type UseRoomProps = {
  username?: string;
  roomCode: string;
};
