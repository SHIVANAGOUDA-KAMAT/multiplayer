import { Room } from "./types.js";

const rooms = new Map<string, Room>();

export function createRoom(
  roomId: string,
  hostId: string
): boolean {
  if (rooms.has(roomId)) {
    return false;
  }

  rooms.set(roomId, {
    hostId,
    players: new Set([hostId]),
  });

  return true;
}

export function joinRoom(
  roomId: string,
  playerId: string
): boolean {
  const room = rooms.get(roomId);

  if (!room) {
    return false;
  }

  room.players.add(playerId);

  return true;
}

export function leaveRoom(
  roomId: string,
  playerId: string
): void {
  const room = rooms.get(roomId);

  if (!room) return;

  room.players.delete(playerId);

  if (room.players.size === 0) {
    rooms.delete(roomId);
  }
}

export function roomExists(roomId: string): boolean {
  return rooms.has(roomId);
}

export function getRoomPlayers(
  roomId: string
): string[] {
  const room = rooms.get(roomId);

  if (!room) {
    return [];
  }

  return [...room.players];
}