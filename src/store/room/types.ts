import type * as i from 'types';

export type RoomContextType = {
  dispatch: (action: i.Actions) => void;
  getCardsByCategory: (category: i.CardCategories) => i.Card[] | undefined;
  roomState: i.RoomState | null;
};
