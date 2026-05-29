import { useState } from "react";
import { socket } from "../socket";

export function MyForm() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const submitter = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement;

    setIsLoading(true);

    if (submitter.value === "create") {
      socket.timeout(5000).emit("room:create", value, () => {
        setIsLoading(false);
      });
    }

    if (submitter.value === "join") {
      socket.timeout(5000).emit("room:join", value, () => {
        setIsLoading(false);
      });
    }
  }

  socket.on('room:created', (roomId: string) => {
    console.log('room created with id: ' + roomId);
  })

  socket.on('room:update', (obj: any) => {
    console.log('player joined' + obj);
    
  })

  return (
    <form onSubmit={onSubmit}>
      <input placeholder="Room Id" onChange={(e) => setValue(e.target.value)} />

      <button type="submit" value="create" disabled={isLoading}>
        Create Room
      </button>

      <button type="submit" value="join" disabled={isLoading}>
        Join Room
      </button>
    </form>
  );
}
