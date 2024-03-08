import { apiUrl } from "../lib/constants";
import cuid from "cuid";
import { ReactNode, createContext, useState } from "react";
import { toast } from "sonner";
export type message =
  | {
      id: string;
      isUserMessage: boolean;
    } & (
      | {
          text: string;
          hasImage: false;
        }
      | {
          text: string[];
          hasImage: true;
          imageUrl: string;
        }
    );
type MessageContextType = {
  query: string;
  handleQueryChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  sendMessage: () => void;
  messages: message[];
  generating: boolean;
  handleCardClick: (query: string) => void;
};

export const MessageContext = createContext<MessageContextType>({
  query: "",
  handleQueryChange: () => {},
  sendMessage: () => {},
  messages: [],
  generating: false,
  handleCardClick: () => {},
});

export const MessageContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [query, setQuery] = useState<string>("");
  const [generating, setGenerating] = useState<boolean>(false);
  const handleQueryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(event.target.value);
  };

  const [messages, setMessages] = useState<message[]>([]);

  const addMessage = async (query: string) => {
    setGenerating(true);
    setMessages((prev) => [
      ...prev,
      { id: cuid(), isUserMessage: true, text: query, hasImage: false },
    ]);

    const formattedPrevMessages = messages.slice(-6).map((msg) => ({
      role: msg.isUserMessage ? ("user" as const) : ("assistant" as const),
      content: msg.text,
    }));

    let prompt = `
    PREVIOUS CONVERSATION:
        ${formattedPrevMessages.map((message) => {
          if (message.role === "user") return `User: ${message.content}\n`;
          return `Assistant: ${message.content}\n`;
        })}
    \n----------------\n
        USER INPUT: ${query}
        
      \n----------------\n
    `;
    setQuery("");
    try {
      const response = await fetch(apiUrl + "answerQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: prompt }),
      }).then((res) => res.text());

      if (!response) throw new Error("No Response");
      let urlIndex = response.indexOf(
        "(https://oaidalleapiprodscus.blob.core.windows.net/private/org-"
      );
      if (urlIndex >= 0) {
        let splitedText: string[] = [response.slice(0, urlIndex)];
        let imageUrl = "";
        for (let i = urlIndex + 1; i < response.length; i++) {
          if (response[i] !== ")") {
            imageUrl += response[i];
            continue;
          } else {
            splitedText.push(response.slice(i + 1));
            break;
          }
        }
        setMessages((prev) => [
          ...prev,
          {
            id: cuid(),
            isUserMessage: false,
            text: splitedText,
            hasImage: true,
            imageUrl,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { id: cuid(), isUserMessage: false, text: response, hasImage: false },
        ]);
      }
      setGenerating(false);
    } catch {
      setGenerating(false);
      toast("Failed to send message");
    }
  };

  const sendMessage = () => addMessage(query);
  const handleCardClick = (cardQuery: string) => {
    addMessage(cardQuery);
  };
  return (
    <MessageContext.Provider
      value={{
        query,
        handleQueryChange,
        sendMessage,
        messages,
        generating,
        handleCardClick,
      }}>
      {children}
    </MessageContext.Provider>
  );
};
