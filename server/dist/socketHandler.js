import { createRoom, joinRoom, leaveRoom, roomExists, getRoomPlayers, } from "./roomManager.js";
export function registerSocketHandlers(io) {
    io.on("connection", (socket) => {
        console.log("CONNECTED:", socket.id);
        // CREATE ROOM
        socket.on("room:create", ({ roomId }) => {
            const created = createRoom(roomId, socket.id);
            if (!created) {
                socket.emit("room:error", {
                    message: "Room already exists",
                });
                return;
            }
            socket.join(roomId);
            socket.data.roomId = roomId;
            socket.emit("room:created", {
                roomId,
            });
            console.log(`Room created: ${roomId}`);
        });
        // JOIN ROOM
        socket.on("room:join", ({ roomId }) => {
            if (!roomExists(roomId)) {
                socket.emit("room:error", {
                    message: "Room does not exist",
                });
                return;
            }
            joinRoom(roomId, socket.id);
            socket.join(roomId);
            socket.data.roomId = roomId;
            io.to(roomId).emit("room:update", {
                roomId,
                players: getRoomPlayers(roomId),
            });
            console.log(`${socket.id} joined ${roomId}`);
        });
        // GAME MESSAGE
        socket.on("game:message", (payload) => {
            const roomId = socket.data.roomId;
            if (!roomId)
                return;
            socket.to(roomId).emit("game:message", {
                senderId: socket.id,
                payload,
            });
        });
        // DISCONNECT
        socket.on("disconnect", () => {
            const roomId = socket.data.roomId;
            if (roomId) {
                leaveRoom(roomId, socket.id);
                io.to(roomId).emit("room:update", {
                    roomId,
                    players: getRoomPlayers(roomId),
                });
            }
            console.log("DISCONNECTED:", socket.id);
        });
    });
}
