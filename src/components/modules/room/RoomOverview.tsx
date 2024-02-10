import { Heading } from 'common/typography/Heading';

export function RoomOverview({ roomCode, users }: RoomOverviewProps) {
  return (
    <div className="fixed bottom-4 left-4 flex flex-col items-start p-3 min-w-[160px] rounded-md bg-slate-700 border border-slate-800">
      <Heading
        variant="h3"
        className="mb-2 font-bold text-sm"
      >
        Room: {roomCode || 'No room found'}
      </Heading>
      {users && (
        <ul className="w-full flex flex-col space-y-1">
          {users.map((user, index) => (
            <li
              key={`user_${index}_user`}
              className="w-full py-1 px-2 last:mb-0 rounded-md text-sm bg-slate-600"
            >
              {user}
            </li>
          ))}
        </ul>
      )}
      {!users && <p>No users in the room</p>}
    </div>
  );
}

type RoomOverviewProps = {
  roomCode?: string;
  users?: string[];
};
