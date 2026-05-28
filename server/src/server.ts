import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { registerSocketHandlers } from "./socketHandler.js";

const app = express();

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

registerSocketHandlers(io);

const __filename = fileURLToPath(
  import.meta.url
);

const __dirname = path.dirname(
  __filename
);

app.use(
  express.static(
    path.join(__dirname, "../../client/dist")
  )
);

app.get("*", (_, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../../client/dist/index.html"
    )
  );
});

const PORT = 3000;

httpServer.listen(PORT, () => {
  console.log(
    `Server listening on http://localhost:${PORT}`
  );
});