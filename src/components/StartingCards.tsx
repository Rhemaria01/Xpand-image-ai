import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useContext } from "react";
import { MessageContext } from "../context/messageContext";
const Cards = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const { handleCardClick } = useContext(MessageContext);
  return (
    <button
      onClick={() => handleCardClick(`${title} ${description}`)}
      className="text-white rounded-lg bg-black/35 ring-[6px] ring-border/20 p-4 md:p-6 flex flex-col items-center cursor-pointer focus-visible:outline-none hover:ring-2 hover:ring-ring hover:ring-offset-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      <h3 className="text-lg md:text-xl font-medium">{title}</h3>
      <p className="text-md md:text-lg text-white/80">{description}</p>
    </button>
  );
};
const StartingCards = () => {
  const tasks = [
    {
      title: "Write a Thank you note",
      description: "to my interviewer.",
    },
    {
      title: "Brainstorm Names",
      description: "for a non-alcoholic drink product.",
    },
    {
      title: "Write code in python",
      description: "to find if a number is a palindrome.",
    },
    {
      title: "Create a character",
      description: "to start a film club.",
    },
  ];
  return (
    <MaxWidthWrapper className="flex justify-center items-center  h-[calc(100vh-10rem)]">
      <div className="grid grid-cols-2 gap-6 md:gap-8">
        {tasks.map((task) => (
          <Cards
            key={task.title}
            title={task.title}
            description={task.description}
          />
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default StartingCards;
