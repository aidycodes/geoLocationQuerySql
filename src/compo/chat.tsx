import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { z } from "zod";
import { env } from "~/env.mjs";


 const ChatType = z.object({
    sender: z.string(),
    message: z.string()
})

type ChatType = z.infer<typeof ChatType>

const Chat = ({ sender }:{sender: string}) => {
  const [chats, setChats] = useState<ChatType[]>([]);
  const [messageToSend, setMessageToSend] = useState("");

  const pusher = new Pusher("7cb8d7e5fd8fd70bb025", {
      cluster: "eu",
    });

  useEffect(() => {

    const channel = pusher.subscribe("chat");

    channel.bind("chat-event",  (data: ChatType) => {
console.log('event triggered ')
      setChats((prevState) => [
        ...prevState,
        { sender: data.sender, message: data.message },
      ]);
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);
console.log(chats)
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log({messageToSend, sender})
    const sentMsg = await axios.post("/api/pusher", { message: messageToSend, sender });
    console.log({sentMsg})
  };

  return (
    <>
           <p>Hello, {sender}</p>
            <div>
              {chats.map((chat, id) => (
                  <div key={id}>
                    <p>{chat.message}</p>
                    <small>{chat.sender}</small>
                  </div>
              ))}
            </div>

                <form>
                 <input
                  type="text"
                 value={messageToSend}
                  onChange={(e) => setMessageToSend(e.target.value)}
                    placeholder="start typing...."
                />
      <button
        onClick={(e) => void handleSubmit(e)}
      >
        Send
      </button>
    </form>
    </>
  );
};

export default Chat;