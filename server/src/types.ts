export interface Room {
  hostId: string;
  players: Set<string>;
}

export interface CreateRoomPayload {
  roomId: string;
}

export interface JoinRoomPayload {
  roomId: string;
}

export interface GameMessagePayload {
  text: string;
}

export interface RoomUpdatePayload {
  roomId: string;
  players: string[];
}

export interface DeleteRoomPayload {
  roomId: string;
}