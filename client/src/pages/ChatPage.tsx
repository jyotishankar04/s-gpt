import { FormEvent, useEffect, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsSend } from "react-icons/bs";
import model from "../utils/gemini";
import Markdown from "react-markdown";
import Waiting from "../components/Waiting";

export enum senderType {
  user = "user",
  ai = "ai",
}
interface ChatFormInput {
  message: string;
}

const ChatPage = () => {
  const endRed = useRef<HTMLDivElement | null>(null);
  const { register, handleSubmit } = useForm();
  const [chatsMessages, setChatMessages] = useState<
    {
      sender: senderType;
      message: string;
    }[]
  >([]);
  const [isWating, setIsWaiting] = useState(false);
  useEffect(() => {
    if (endRed.current) {
      endRed.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatsMessages]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.message) return;

    setChatMessages((prevMessages) => [
      ...prevMessages,
      {
        sender: senderType.user,
        message: data.message,
      },
    ]);

    setIsWaiting(true);

    // Initialize AI message first to avoid state issues in async loop
    let aiMessage = "";
    setChatMessages((prevMessages) => [
      ...prevMessages,
      {
        sender: senderType.ai,
        message: aiMessage,
      },
    ]);

    const result = await model.generateContentStream(data.message);

    // Stream content as it arrives
    for await (const chunk of result.stream) {
      const chunkText = await chunk.text();

      aiMessage += chunkText;

      setChatMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        // Update only the latest AI message
        updatedMessages[updatedMessages.length - 1].message = aiMessage;
        return updatedMessages;
      });
    }
    setIsWaiting(false);
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-start">
      <div className="grow w-full h-[50vh] overflow-auto flex justify-center items-start">
        <div className="w-8/12 p-5 h-full flex flex-col justify-start items-start ">
          {chatsMessages.map((message, index) => {
            return (
              <ChatBubble
                key={index}
                sender={message.sender}
                message={message.message}
              />
            );
          })}
          <div className="w-full h-5" ref={endRed}>
            {isWating && <Waiting />}
          </div>
        </div>
      </div>
      <div className="w-full p-4 flex justify-center items-center bg-base-300">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-6/12 flex justify-center items-center gap-5"
        >
          <input
            {...register("message")}
            type="text"
            className="grow input ring-0 focus:border-none focus:outline-none"
            placeholder="What is ai ?"
          />
          <button className="btn btn-primary btn-circle">
            <BsSend />
          </button>
        </form>
      </div>
    </div>
  );
};

const ChatBubble: React.FC<{
  sender: senderType;
  message: string;
}> = ({ sender, message }) => {
  if (sender === senderType.user) {
    return (
      <div className="chat w-full chat-end">
        <div className="chat-image avatar">
          <div className="w-8 rounded-full">
            <img
              alt="User avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <div className="chat-bubble">{message}</div>
      </div>
    );
  } else {
    return (
      <div className="chat w-full chat-start">
        <div className="chat-image avatar">
          <div className="w-8 rounded-full object-center flex overflow-hidden justify-center items-center">
            <img
              className="w-full h-full object-cover object-center scale-150"
              alt="AI avatar"
              src="../../public/ai.svg"
            />
          </div>
        </div>
        <div className="">
          <Markdown>{message}</Markdown>
        </div>
      </div>
    );
  }
};

export default ChatPage;
