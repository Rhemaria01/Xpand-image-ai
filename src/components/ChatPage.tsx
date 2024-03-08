import React from "react";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import MaxWidthWrapper from "./MaxWidthWrapper";

const ChatPage = () => {
  return (
    <div className="bg-zinc-800 relative py-2">
      <div className="fixed top-0  w-full  z-20 bg-zinc-800">
        <div className="text-3xl font-medium text-white  bg-inherit text-center rounded-md py-2 ">
          <a href="/" className="drop-shadow-glow">
            X P A N D Images
          </a>
        </div>
      </div>
      <Messages />
      <div className="fixed bottom-0 w-full bg-gradient-to-b from-transparent to-zinc-800 to-25% h-40 pt-8 ">
        <MaxWidthWrapper>
          <ChatInput />
        </MaxWidthWrapper>
      </div>
    </div>
  );
};

export default ChatPage;
