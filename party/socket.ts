const addLog = (message: string, logs: RoomState['log']): RoomState['log'] => {
  return [
    {
      dt: new Date().getTime(),
      message: message,
    },
    ...logs,
  ].slice(0, MAX_LOG_SIZE);
};

export type WebsocketStates = 'join' | 'add_vote' | 'remove_vote' | 'final';

export type RoomUser = {
  id: string;
};

type BaseRoomState = {
  users: RoomUser[];
  log: {
    dt: number;
    message: string;
  }[];
};

export type RoomAction = DefaultAction | RoomActions;

export type ServerAction = WithUser<DefaultAction> | WithUser<RoomActions>;

const MAX_LOG_SIZE = 4;

type WithUser<T> = T & {
  user: RoomUser;
};

export type DefaultAction =
  | {
      type: 'UserEntered';
    }
  | {
      type: 'UserExit';
    };

export type CardsState = {
  id?: string;
  voters: string[];
};

export type State = CardsState[] | null;

export type RoomState = BaseRoomState & {
  state: State;
  status: WebsocketStates | null;
};

export const initialRoom: () => RoomState = () => ({
  users: [],
  state: null,
  status: null,
  log: addLog('Room Created!', []),
});

type RoomActions = {
  type: 'SetState';
  state: State;
  status: WebsocketStates;
};

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
        ...{ ...(action.state !== undefined ? { roomState: action.state } : {}) },
        status: action.status,
        log: addLog(`Room status "${action.status}" set by ${action.user.id} ⚡`, state.log),
      };
  }
};
