import { useEffect, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsSend } from "react-icons/bs";
import model from "../utils/gemini";
import Waiting from "../components/Waiting";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getChatMessagesFn, newChatMessageFn } from "../utils/axiosConfig";
import { useAuth } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import DOMPurify from "dompurify";
import rehypePrettyCode from "rehype-pretty-code";

import { transformerCopyButton } from "@rehype-pretty/transformers";

const ChatPage = () => {
  const endRed = useRef<HTMLDivElement | null>(null);
  const { register, handleSubmit, reset } = useForm();
  const [chatsMessages, setChatMessages] = useState<
    {
      id?: string;
      request?: string;
      response?: string;
      createdAt?: string;
      updatedAt?: string;
    }[]
  >([]);
  const [isWating, setIsWaiting] = useState(false);
  const { userId } = useAuth();
  const { id: chatId } = useParams();

  useEffect(() => {
    if (endRed.current) {
      endRed.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatsMessages]);

  // const { data, refetch, isError, isLoading, isSuccess } = useQuery({
  //   queryKey: ["messages"],
  //   queryFn: () => {
  //     newChatMessageFn(userId as string, chatId as string, "", "");
  //   },
  //   initialData: false,
  //   enabled: false,
  // });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["messages", chatId],
    mutationFn: (message: { user: string; ai: string }) => {
      return newChatMessageFn(
        userId as string,
        chatId as string,
        message.user,
        message.ai
      );
    },
    onSuccess: (data) => {
      refetch();
      queryClient.setQueryData(["messages", chatId], data);
    },
  });
  const { refetch, isLoading: isMessagesLoading } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: () => {
      return getChatMessagesFn(userId as string, chatId as string);
    },
    initialData: false,
    onSuccess: (data) => {
      setChatMessages(data);
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.message) return;

    let aiMessage = "";
    const userMessageEntry = {
      request: data.message,
      response: "",
    };

    setChatMessages((prevMessages) => [...prevMessages, userMessageEntry]);
    setIsWaiting(true);
    reset();

    try {
      const result = await model.generateContentStream(data.message);

      for await (const chunk of result.stream) {
        const chunkText = await chunk.text();
        aiMessage += chunkText;

        setChatMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1].response = aiMessage;
          return updatedMessages;
        });
      }

      mutate({
        user: data.message,
        ai: aiMessage,
      });
    } catch (error) {
      console.error("Error generating AI content:", error);
      // Optionally handle the error (show a message to the user)
    } finally {
      setIsWaiting(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-start">
      <div className="grow w-full h-[50vh] overflow-auto flex justify-center items-start">
        <div className="w-8/12 p-5 h-full flex flex-col justify-start items-start ">
          {Array.isArray(chatsMessages) ? (
            chatsMessages.map((message) => (
              <ChatBubble
                key={message.id}
                request={message.request as string}
                response={message.response as string}
              />
            ))
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              {isMessagesLoading ? (
                <div className="loading loading-dots"></div>
              ) : (
                <h1>No messages</h1>
              )}
            </div>
          )}
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
  request: string;
  response: string;
}> = ({ request, response }) => {
  const [htmlContent, setHtmlContent] = useState<string>("");

  useEffect(() => {
    const file = unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeDocument, { title: "👋🌍" })
      .use(rehypeFormat)
      .use(rehypeStringify)
      .use(rehypePrettyCode, {
        theme: "tokyo-night",
        keepBackground: true,
        transformers: [
          transformerCopyButton({
            visibility: "always",
            feedbackDuration: 3_000,
          }),
        ],
      });
    const processResponse = async () => {
      const result = await file.process(response);
      const sanitizedHtml = DOMPurify.sanitize(result.toString());
      setHtmlContent(sanitizedHtml);
    };

    processResponse();
  }, [response]);
  console.log(htmlContent);

  return (
    <>
      <div className="chat w-full mt-10 chat-end">
        <div className="chat-image avatar">
          <div className="w-8 rounded-full">
            <img
              alt="User avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <div className="chat-bubble">{request}</div>
      </div>
      <div className="w-full ">
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
          {htmlContent ? (
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          ) : (
            <div className="loading loading-dots"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatPage;
