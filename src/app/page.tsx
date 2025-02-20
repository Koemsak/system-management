import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="container px-10 py-5 mx-auto">
      <div className="p-2 max-w-lg mx-auto">
        <div className="flex flex-col items-center mb-4">
          <div className="flex-shrink-0">
            <div className="relative flex h-5 items-center space-x-2 text-[13px] mb-3 px-6 dark:shadow-gray-800 dark:shadow-md shadow-lg rounded-full border-t dark:border-gray-800 border-gray-100 py-4">
              <p className="font-medium">Para </p>
              <span className="text-gray-400 font-light">|</span>
              <p className="text-gray-400 font-light">
                Spring Developer Advocate
              </p>
              <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent dark:border-t-black border-t-white"></div>
            </div>
            <Avatar className="mx-auto">
              <AvatarImage src="/assets/para-pf.jpg" alt="@shadcn" />
              <AvatarFallback>PR</AvatarFallback>
            </Avatar>
          </div>
          <p className="text-gray-700 dark:text-gray-400 text-center sm:text-sm lg:text-[14px] mt-3">
            <span className="text-black dark:text-gray-200 font-medium">
              &quot;Para Supper App
            </span>{" "}
            Does a pretty good job, and consistently too, covering Spring and
            for that, I am very Appreciative&quot;
          </p>
        </div>
      </div>
      <div className="text-center mt-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          The One-Stop Platform for{" "}
          <span className="gradient-text">Developers</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-400 mb-6">
          Get unlimited access to coding courses,{" "}
          <span className="font-semibold">Quizzes</span>,{" "}
          <span className="font-semibold">Builds</span> and{" "}
          <span className="font-semibold">Tools</span>
          Start your journey or level up your career with Amigoscode today!
        </p>
        <Button
          variant={"secondary"}
          className="hover:scale-105 ease-in-out font-light px-8 py-5 transition delay-150 duration-300  hover:text-white bg-gradient-to-l from-purple-700 text-white via-  -500 to-red-300 rounded-sm"
        >
          Start Exploring
        </Button>
      </div>
    </div>
  );
}
