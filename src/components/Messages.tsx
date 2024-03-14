import React, { useRef, useEffect } from "react";
import { useContext } from "react";
import { MessageContext } from "../context/messageContext";
import Message from "./Message";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import MaxWidthWrapper from "./MaxWidthWrapper";
import StartingCards from "./StartingCards";
import { Loader2 } from "lucide-react";

const Messages = () => {
  const { messages, generating } = useContext(MessageContext);
  const lastItemRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (lastItemRef) {
      lastItemRef.current?.scrollIntoView();
    }
  }, [messages]);

  return (
    <>
      {messages.length <= 0 ? (
        <StartingCards />
      ) : (
        <div className="overflow-y-auto  scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch pt-12 pb-8 px-4">
          <MaxWidthWrapper>
            {messages.map((message) => {
              return <Message key={message.id} message={message} />;
            })}
            {generating ? (
              <div className="flex gap-x-4 items-start py-4 text-white">
                <Avatar>
                  <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=Cookie" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="transition-all text-lg flex flex-col pt-2">
                  <span className="text-xl font-medium pb-2 text-white">
                    OSIRIS AI
                  </span>
                  <Loader2 className="h-6 w-6 animate-spin text-white" />
                </div>
              </div>
            ) : null}
            <div ref={lastItemRef} className="h-28"></div>
          </MaxWidthWrapper>
        </div>
      )}
    </>
  );
};

export default Messages;
