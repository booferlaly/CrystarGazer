import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Share2, Bookmark, BookmarkCheck } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DailyReadingProps {
  card?: {
    name: string;
    image: string;
    meaning: string;
    interpretation: string;
  };
  date?: Date;
}

const DailyReading = ({
  card = {
    name: "The Star",
    image:
      "https://images.unsplash.com/photo-1596636478939-6c22e2c9c166?w=800&q=80",
    meaning: "Hope, faith, purpose, renewal, spirituality",
    interpretation:
      "The Star brings a sense of renewed hope and faith in your journey. This is a time of spiritual growth and finding deeper meaning in your experiences. Trust that you are on the right path.",
  },
  date = new Date(),
}: DailyReadingProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    // Share functionality would be implemented here
    console.log("Sharing reading:", card.name);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-xl backdrop-blur-sm border border-indigo-500/30 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-white mb-2">
          Today's Reading
        </CardTitle>
        <CardDescription className="text-indigo-200">
          {formattedDate}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center">
        <div
          className="relative w-64 h-96 mb-6 cursor-pointer"
          onClick={handleFlip}
        >
          <motion.div
            className="absolute w-full h-full rounded-xl shadow-xl"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ backfaceVisibility: "hidden" }}
          >
            <img
              src={card.image}
              alt={card.name}
              className="w-full h-full object-cover rounded-xl border-2 border-indigo-400/50"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-xl">
              <h3 className="text-xl font-semibold text-white">{card.name}</h3>
            </div>
          </motion.div>

          <motion.div
            className="absolute w-full h-full rounded-xl bg-gradient-to-br from-purple-800 to-indigo-900 p-6 flex flex-col justify-center items-center text-center"
            animate={{ rotateY: isFlipped ? 0 : -180 }}
            transition={{ duration: 0.6 }}
            style={{ backfaceVisibility: "hidden" }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">{card.name}</h3>
            <p className="text-indigo-200 font-medium mb-4">{card.meaning}</p>
            <div className="w-full h-px bg-indigo-400/30 my-4"></div>
            <p className="text-white text-sm">{card.interpretation}</p>
          </motion.div>
        </div>

        <div className="text-center mt-4 mb-6">
          <p className="text-indigo-100 text-sm italic">
            Tap card to reveal meaning
          </p>
        </div>

        <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-lg p-4 w-full">
          <h4 className="text-lg font-semibold text-white mb-2">
            Personal Insight
          </h4>
          <p className="text-indigo-100">
            Today's card suggests a period of spiritual renewal. Take time to
            connect with your inner wisdom and trust that positive energy is
            flowing into your life. Consider what gives you hope and how you can
            nurture your faith in yourself.
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center gap-4 pt-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-indigo-800/50 border-indigo-400/30 hover:bg-indigo-700/60"
                onClick={handleBookmark}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="h-5 w-5 text-indigo-200" />
                ) : (
                  <Bookmark className="h-5 w-5 text-indigo-200" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isBookmarked ? "Remove bookmark" : "Save this reading"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-indigo-800/50 border-indigo-400/30 hover:bg-indigo-700/60"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5 text-indigo-200" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share this reading</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </div>
  );
};

export default DailyReading;
