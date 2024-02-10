'use client';

import { useRoom } from 'hooks';
import { RoomContext } from 'store/room';
import { Lane } from 'common/layout/Lane';
import { AddCardModal } from 'modules/room/AddCardModal';
import { RoomOverview } from 'modules/room/RoomOverview';

const Room = () => {
  const { dispatch, getCardsByCategory, roomCode, roomState } = useRoom();

  return (
    <RoomContext.Provider value={{ getCardsByCategory, dispatch, roomState }}>
      <section className="w-full flex justify-center py-4 space-x-2">
        <Lane.Container
          title="Good"
          category="good"
        />
        <Lane.Container
          title="Bad"
          category="bad"
        />
        <Lane.Container
          title="Actions"
          category="actions"
        />
        <Lane.Container
          title="Ideas"
          category="ideas"
        />

        <AddCardModal />
        <RoomOverview
          roomCode={roomCode}
          users={roomState?.users.map((user) => user.id)}
        />
      </section>
    </RoomContext.Provider>
  );
};

export default Room;
