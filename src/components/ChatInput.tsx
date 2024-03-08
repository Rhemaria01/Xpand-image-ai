import { Textarea } from "./ui/textarea";
import { useContext } from "react";
import { MessageContext } from "../context/messageContext";
import { toast } from "sonner";
import { SendHorizontal } from "lucide-react";

const ChatInput = () => {
  const { query, handleQueryChange, sendMessage, generating } =
    useContext(MessageContext);
  return (
    <div className="relative">
      <Textarea
        rows={1}
        maxRows={4}
        value={query}
        onChange={handleQueryChange}
        placeholder="Enter Your Message"
        autoFocus={true}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (generating) {
              toast("Please wait for previous question to end");
              return;
            }
            if (!query) {
              toast("Please Enter a message..");
            } else {
              sendMessage();
            }
          }
        }}
        className="resize-none pr-12 text-base py-3"
      />
      <button
        disabled={generating}
        className="disabled:opacity-50"
        onClick={() => {
          if (generating) {
            toast("Please wait for previous question to end");
            return;
          }
          if (!query) {
            toast("Please Enter a message..");
          } else {
            sendMessage();
          }
        }}>
        <SendHorizontal className="h-5 w-5 text-white/80 absolute right-4 top-4" />
      </button>
    </div>
  );
};

export default ChatInput;
