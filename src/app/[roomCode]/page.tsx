'use client';

import { useParams } from 'next/navigation';

import { useRoom } from 'hooks';
import { useRoomStore } from 'store/room';
import { Lane } from 'common/layout/Lane';
import { AddCardModal } from 'modules/modals/AddCardModal';

const Room = () => {
  const { roomCode } = useParams<{ roomCode: string }>();

  const { username } = useRoomStore();
  const { dispatch, roomState } = useRoom({
    roomCode: roomCode as string,
    username: username!,
  });

  console.log({ roomState });

  return (
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
    </section>
  );
};

export default Room;
