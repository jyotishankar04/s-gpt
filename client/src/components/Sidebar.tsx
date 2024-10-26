import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { createNewChatFn, getChatsFn } from "../utils/axiosConfig";

const Sidebar = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();

  const {
    data: chatsData,
    isSuccess: isChatsSuccess,
    isLoading: isChatsLoading,
    refetch: refetchChats,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: () => getChatsFn(String(userId)),
    // refetchOnWindowFocus: false,
    // enabled: false,
    initialData: false,
  });

  const createChatHandler = async () => {
    refetch();
  };
  const { isLoading, isFetching, refetch } = useQuery({
    queryKey: ["newchat"],
    queryFn: () => createNewChatFn(String(userId)),
    refetchOnWindowFocus: false,
    enabled: false,
    initialData: false,
    onSuccess: (data) => {
      navigate(`/dashboard/chats/${data.id}`);
      refetchChats();
    },
  });

  if (isLoading && isFetching) {
    return (
      <div className="w-full h-screen bg-base-300">
        <div className="loading loading-lg loading-bars scale-125"></div>
      </div>
    );
  }
  return (
    <div className="w-2/12 bg-base-300 h-full">
      <div>
        <h1 className="text-sm font-bold px-5 mt-3 uppercase">Dashboard</h1>
        <div className="flex flex-col gap-2 w-full px-4 pt-2">
          <h1 onClick={createChatHandler} className="btn btn-outline py-1">
            Create a new conversation
          </h1>
        </div>
      </div>
      <span className="divider"></span>
      <div className="">
        <h1 className="text-sm font-bold px-5 mt-3 uppercase">Recent Chats</h1>
        <div className="flex flex-col gap-2 w-full px-4 pt-2 overflow-y-auto max-h-[50vh]">
          {isChatsLoading && (
            <div className="w-full  flex justify-center items-center">
              <div className="loading loading-lg loading-bars"></div>
            </div>
          )}
          {isChatsSuccess && Array.isArray(chatsData) ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            chatsData.map((chat: any) => (
              <Link
                to={"/dashboard/chats/" + chat.id}
                className="btn text-white btn-primary capitalize btn-outline py-1 btn-sm"
              >
                {chat.title}
              </Link>
            ))
          ) : (
            <div className="w-full flex justify-center items-center">
              <h1>No Chats</h1>
            </div>
          )}
        </div>
        <span className="divider"></span>
        <div>
          <h1 className="text-sm font-bold px-5 mt-3 uppercase">Settings</h1>
          <div className="flex flex-col gap-2 w-full px-4 pt-2">
            <Link
              to={"/"}
              className="btn btn-primary capitalize btn-lg btn-outline py-1"
            >
              {" "}
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
