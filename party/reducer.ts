import { type RoomState, type ServerAction } from './types';

const MAX_LOG_SIZE = 4;

const addLog = (message: string, logs: RoomState['log']): RoomState['log'] => {
  return [
    {
      dt: new Date().getTime(),
      message: message,
    },
    ...logs,
  ].slice(0, MAX_LOG_SIZE);
};

export const initialRoom: () => RoomState = () => ({
  users: [],
  cards: null,
  log: addLog('Room Created!', []),
});

export const roomUpdater = (action: ServerAction, state: RoomState): RoomState => {
  switch (action.type) {
    case 'UserEntered':
      return {
        ...state,
        users: [...state.users, action.user],
        log: addLog(`user ${action.user.id} joined 🎉`, state.log),
      };

    case 'UserExit':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.user.id),
        log: addLog(`user ${action.user.id} left 😢`, state.log),
      };

    case 'SetState':
      return {
        ...state,
        ...{
          ...(action.state !== undefined
            ? {
                cards: action.state.cards,
              }
            : {}),
        },
        log: addLog(`State updated by ${action.user.id} ⚡`, state.log),
      };
  }
};
