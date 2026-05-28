import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "node:path";
import { registerSocketHandlers } from "./socketHandler.js";
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});
registerSocketHandlers(io);
const clientDistPath = path.resolve(__dirname, "../../client/dist");
app.use(express.static(clientDistPath));
app.get("*", (_, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
});
const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
