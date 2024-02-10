import type * as Party from 'partykit/server';

import {
  initialRoom,
  roomUpdater,
  type RoomAction,
  type RoomState,
  type ServerAction,
} from './socket';

export type ServerMessage = {
  state: RoomState;
};

export default class Server implements Party.Server {
  private roomState: RoomState;

  constructor(readonly party: Party.Room) {
    this.roomState = initialRoom();
    console.info('Room created:', party.id);
    console.info('Room target', this.roomState.state);
  }

  onConnect(connection: Party.Connection, ctx: Party.ConnectionContext) {
    this.roomState = roomUpdater(
      {
        type: 'UserEntered',
        user: { id: connection.id },
      },
      this.roomState,
    );

    // when a user reconnects, the server will send the current game state
    // and broadcoast it to the users so a redirect will happen
    this.party.broadcast(JSON.stringify(this.roomState));
  }

  onClose(connection: Party.Connection) {
    this.roomState = roomUpdater(
      {
        type: 'UserExit',
        user: { id: connection.id },
      },
      this.roomState,
    );

    this.party.broadcast(JSON.stringify(this.roomState));
  }

  onMessage(message: string, sender: Party.Connection) {
    const action: ServerAction = {
      ...(JSON.parse(message) as RoomAction),
      user: { id: sender.id },
    };

    console.info(`Received action ${action.type} from user ${sender.id}`);

    this.roomState = roomUpdater(action, this.roomState);
    this.party.broadcast(JSON.stringify(this.roomState));
  }
}

Server satisfies Party.Worker;
