import "./style.css";

import {
  io,
  Socket,
} from "socket.io-client";

const socket: Socket = io(import.meta.env.VITE_SOCKET_URL)

const roomInput =
  document.getElementById(
    "roomInput"
  ) as HTMLInputElement;

const messageInput =
  document.getElementById(
    "messageInput"
  ) as HTMLInputElement;

const messages =
  document.getElementById(
    "messages"
  ) as HTMLUListElement;

const createBtn =
  document.getElementById(
    "createBtn"
  ) as HTMLButtonElement;

const joinBtn =
  document.getElementById(
    "joinBtn"
  ) as HTMLButtonElement;

const sendBtn =
  document.getElementById(
    "sendBtn"
  ) as HTMLButtonElement;

const container = document.getElementById(
  "container"
) as HTMLDivElement;

function addMessage(
  text: string
): void {
  const li = document.createElement("li");

  li.textContent = text;

  messages.appendChild(li);
}

createBtn.addEventListener(
  "click",
  () => {
    socket.emit("room:create", {
      roomId: roomInput.value,
    });
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Room";
    deleteBtn.addEventListener("click", () => {
      socket.emit("room:delete", {
        roomId: roomInput.value,
      });
    });
    container.appendChild(deleteBtn);
  }
);

joinBtn.addEventListener(
  "click",
  () => {
    socket.emit("room:join", {
      roomId: roomInput.value,
    });
  }
);

sendBtn.addEventListener(
  "click",
  () => {
    const text = messageInput.value;

    socket.emit("game:message", {
      text,
    });

    addMessage(`YOU: ${text}`);
  }
);

socket.on(
  "room:created",
  (data) => {
    addMessage(
      `Room created: ${data.roomId}`
    );
  }
);

socket.on(
  "room:update",
  (data) => {
    addMessage(
      `Players: ${data.players.length}`
    );
  }
);

socket.on(
  "room:error",
  (data) => {
    addMessage(
      `ERROR: ${data.message}`
    );
  }
);

socket.on(
  "game:message",
  (data) => {
    addMessage(
      `${data.senderId}: ${data.payload.text}`
    );
  }
);