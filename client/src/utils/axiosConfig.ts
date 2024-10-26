import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:8787/api",
  withCredentials: true,
});

export const createNewChatFn = async (userId: string) => {
  try {
    const response = await axiosConfig.post("/newChat", { userId });
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      error: "Error creating new chat",
    };
  }
};

export const getChatsFn = async (userId: string) => {
  try {
    const response = await axiosConfig.get("/getChats/" + userId);

    return response.data;
  } catch (error) {
    console.log(error);
    return {
      error: "Error getting chats",
    };
  }
};

export const newChatMessageFn = async (
  userId: string,
  chatId: string,
  request: string,
  response: string
) => {
  try {
    const res = await axiosConfig.post("/newMessage", {
      userId,
      chatId,
      request,
      response,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return {
      error: "Error getting chat messages",
    };
  }
};

export const getChatMessagesFn = async (userId: string, chatId: string) => {
  try {
    const res = await axiosConfig.get(
      `/getMessages?userId=${userId}&chatId=${chatId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {
      error: "Error getting chat messages",
    };
  }
};

export default axiosConfig;
