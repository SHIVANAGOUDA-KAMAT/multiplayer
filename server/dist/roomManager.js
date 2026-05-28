const rooms = new Map();
export function createRoom(roomId, hostId) {
    if (rooms.has(roomId)) {
        return false;
    }
    rooms.set(roomId, {
        hostId,
        players: new Set([hostId]),
    });
    return true;
}
export function joinRoom(roomId, playerId) {
    const room = rooms.get(roomId);
    if (!room) {
        return false;
    }
    room.players.add(playerId);
    return true;
}
export function leaveRoom(roomId, playerId) {
    const room = rooms.get(roomId);
    if (!room)
        return;
    room.players.delete(playerId);
    if (room.players.size === 0) {
        rooms.delete(roomId);
    }
}
export function roomExists(roomId) {
    return rooms.has(roomId);
}
export function getRoomPlayers(roomId) {
    const room = rooms.get(roomId);
    if (!room) {
        return [];
    }
    return [...room.players];
}
