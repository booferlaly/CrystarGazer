import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Emotion {
  name: string;
  icon: string;
  color: string;
}

interface MoodTrackerProps {
  onMoodSelect?: (mood: string) => void;
  currentReading?: {
    cardName: string;
    meaning: string;
  };
  moodHistory?: Array<{
    date: Date;
    mood: string;
  }>;
}

const MoodTracker = ({
  onMoodSelect = () => {},
  currentReading = {
    cardName: "The Star",
    meaning: "Hope, faith, purpose, renewal, spirituality",
  },
  moodHistory = [
    { date: new Date(Date.now() - 86400000), mood: "Calm" },
    { date: new Date(Date.now() - 172800000), mood: "Anxious" },
    { date: new Date(Date.now() - 259200000), mood: "Inspired" },
    { date: new Date(Date.now() - 345600000), mood: "Peaceful" },
    { date: new Date(Date.now() - 432000000), mood: "Confused" },
  ],
}: MoodTrackerProps) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showCorrelation, setShowCorrelation] = useState(false);

  const emotions: Emotion[] = [
    { name: "Calm", icon: "😌", color: "bg-blue-400" },
    { name: "Happy", icon: "😊", color: "bg-yellow-400" },
    { name: "Inspired", icon: "✨", color: "bg-purple-400" },
    { name: "Anxious", icon: "😰", color: "bg-orange-400" },
    { name: "Confused", icon: "🤔", color: "bg-gray-400" },
    { name: "Peaceful", icon: "🧘", color: "bg-green-400" },
    { name: "Excited", icon: "🤩", color: "bg-pink-400" },
    { name: "Sad", icon: "😢", color: "bg-blue-600" },
  ];

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    onMoodSelect(mood);
    setShowCorrelation(true);
  };

  // Generate a correlation between the selected mood and the current reading
  const getMoodCorrelation = () => {
    if (!selectedMood || !currentReading) return "";

    const correlations: Record<string, string> = {
      Calm: `Your calm energy aligns with ${currentReading.cardName}'s energy of balance and clarity.`,
      Happy: `${currentReading.cardName} amplifies your joyful state, suggesting positive outcomes ahead.`,
      Inspired: `The creative energy of ${currentReading.cardName} resonates with your inspired mood.`,
      Anxious: `${currentReading.cardName} appears as a guide to help transform your anxiety into awareness.`,
      Confused: `${currentReading.cardName} offers clarity to your current state of confusion.`,
      Peaceful: `Your peaceful state harmonizes with the tranquil energy of ${currentReading.cardName}.`,
      Excited: `${currentReading.cardName}'s dynamic energy matches your excitement, indicating momentum.`,
      Sad: `${currentReading.cardName} brings healing light to your sadness, suggesting transformation.`,
    };

    return (
      correlations[selectedMood] ||
      `Your ${selectedMood} energy interacts with ${currentReading.cardName} in unique ways.`
    );
  };

  return (
    <Card className="w-full bg-indigo-950/50 border-indigo-800 shadow-lg shadow-indigo-900/30 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-indigo-100 mb-2">
              How are you feeling today?
            </h3>
            <p className="text-indigo-300 text-sm">
              Select your current emotion to see how it relates to your reading
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
            <TooltipProvider>
              {emotions.map((emotion) => (
                <Tooltip key={emotion.name}>
                  <TooltipTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`${emotion.color} ${selectedMood === emotion.name ? "ring-2 ring-white" : ""} 
                        rounded-full p-3 cursor-pointer flex flex-col items-center justify-center transition-all
                        hover:shadow-lg hover:shadow-indigo-500/30`}
                      onClick={() => handleMoodSelect(emotion.name)}
                    >
                      <span className="text-2xl mb-1">{emotion.icon}</span>
                      <span className="text-xs font-medium text-white">
                        {emotion.name}
                      </span>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select {emotion.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>

          {showCorrelation && selectedMood && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-indigo-900/50 p-4 rounded-lg border border-indigo-700"
            >
              <h4 className="text-indigo-200 font-medium mb-2">
                Your Mood & Reading Correlation
              </h4>
              <p className="text-indigo-100">{getMoodCorrelation()}</p>
            </motion.div>
          )}

          <div className="pt-2">
            <h4 className="text-indigo-200 font-medium mb-3 text-sm">
              Your Emotional Pattern
            </h4>
            <div className="flex items-center space-x-1 overflow-x-auto pb-2">
              {moodHistory.map((item, index) => {
                const emotion = emotions.find((e) => e.name === item.mood);
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className={`${emotion?.color || "bg-gray-500"} w-6 h-6 rounded-full flex items-center justify-center text-xs`}
                    >
                      {emotion?.icon}
                    </div>
                    <span className="text-xs text-indigo-300 mt-1">
                      {new Date(item.date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                );
              })}
              {selectedMood && (
                <div className="flex flex-col items-center">
                  <div
                    className={`${emotions.find((e) => e.name === selectedMood)?.color || "bg-gray-500"} 
                    w-6 h-6 rounded-full flex items-center justify-center text-xs ring-2 ring-white`}
                  >
                    {emotions.find((e) => e.name === selectedMood)?.icon}
                  </div>
                  <span className="text-xs text-indigo-300 mt-1">Today</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
