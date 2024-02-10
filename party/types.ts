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

export type DefaultAction =
  | {
      type: 'UserEntered';
    }
  | {
      type: 'UserExit';
    };

type RoomActions = {
  type: 'SetState';
  state: CardState;
};

export type Actions = DefaultAction | RoomActions;

export type ServerAction = WithUser<DefaultAction> | WithUser<RoomActions>;

type WithUser<T> = T & {
  user: RoomUser;
};

export type CardCategories = 'good' | 'bad' | 'actions' | 'ideas';

export type Card = {
  description: string;
  id: string;
  title: string;
  votes: string[];
};

export type CategoriesData =
  | {
      [key in CardCategories]: Card[];
    }
  | null;

export type CardState = {
  cards: Partial<CategoriesData> | null;
};

export type RoomState = BaseRoomState & CardState;
