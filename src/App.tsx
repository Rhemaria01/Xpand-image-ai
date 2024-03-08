import React from "react";
import "./App.css";
import ChatPage from "./components/ChatPage";
import { MessageContextProvider } from "./context/messageContext";
// import MaxWidthWrapper from "./components/MaxWidthWrapper";
import { Toaster } from "./components/ui/sonner";
function App() {
  return (
    <>
      <MessageContextProvider>
        <ChatPage />
      </MessageContextProvider>

      <Toaster />
    </>
  );
}

export default App;
