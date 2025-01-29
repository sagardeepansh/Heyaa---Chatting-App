import { useState, useEffect } from "react";
import { saveMessage, getMessages, deleteMessage as removeMessage } from "@/utils/indexedDB";

export const useIndexedDB = (chatId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      const storedMessages = await getMessages(chatId);
      setMessages(storedMessages);
      setLoading(false);
    };
    fetchMessages();
  }, [chatId, messages]);

  const addMessage = async (message) => {
    const savedMessage = await saveMessage(message);
    setMessages((prev) => [...prev, savedMessage]);
  };

  const deleteMessage = async (id) => {
    await removeMessage(id);
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  return { messages, addMessage, deleteMessage, loading };
};
