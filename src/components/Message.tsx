import { cn } from "../lib/utils";
import { message } from "../context/messageContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Download } from "lucide-react";

const Message = ({ message }: { message: message }) => {
  return (
    <div className="flex gap-x-4 items-start py-4 text-white">
      <Avatar>
        <AvatarImage
          src={`https://api.dicebear.com/7.x/${
            message.isUserMessage
              ? "personas/svg?seed=Bella"
              : "bottts/svg?seed=Cookie"
          }`}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div
        className={cn(
          " transition-all prose whitespace-pre-wrap text-lg flex flex-col pt-2"
        )}>
        <span className="text-xl font-medium pb-2 text-white">
          {message.isUserMessage ? "User" : "Xpandi"}
        </span>
        {message.hasImage ? (
          <div className="space-y-4">
            <span className="text-white">{message.text[0]}</span>
            <div className="relative ">
              <img
                id={message.id + "-image"}
                src={message.imageUrl}
                alt=""
                className="h-96 w-96 rounded-lg shadow-2xl shadow-accent/10 hover:shadow-accent/20 transition-all duration-300 cursor-pointer"
              />
            </div>
            <span className="text-white">{message.text[1]}</span>
          </div>
        ) : (
          <span className="text-white">{message.text}</span>
        )}
      </div>
    </div>
  );
};

export default Message;
