import React from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Calendar } from "lucide-react";

interface CardHistoryItem {
  id: string;
  date: string;
  cardName: string;
  cardImage: string;
  summary: string;
  mood?: string;
}

interface CardHistoryProps {
  historyItems?: CardHistoryItem[];
  onSelectHistoryItem?: (item: CardHistoryItem) => void;
}

const CardHistory = ({
  historyItems = [
    {
      id: "1",
      date: "2023-06-15",
      cardName: "The Fool",
      cardImage:
        "https://images.unsplash.com/photo-1659587230013-dc4608166d8e?w=300&q=80",
      summary: "New beginnings and adventures await you",
      mood: "Excited",
    },
    {
      id: "2",
      date: "2023-06-14",
      cardName: "The Empress",
      cardImage:
        "https://images.unsplash.com/photo-1659587230108-1e38c90d4e5c?w=300&q=80",
      summary: "Abundance and nurturing energy surrounds you",
      mood: "Content",
    },
    {
      id: "3",
      date: "2023-06-13",
      cardName: "The Tower",
      cardImage:
        "https://images.unsplash.com/photo-1659587230136-a9647f81d5d4?w=300&q=80",
      summary: "Sudden change and revelation is coming",
      mood: "Anxious",
    },
    {
      id: "4",
      date: "2023-06-12",
      cardName: "The Star",
      cardImage:
        "https://images.unsplash.com/photo-1659587230147-16faae71902b?w=300&q=80",
      summary: "Hope and inspiration are guiding you",
      mood: "Hopeful",
    },
    {
      id: "5",
      date: "2023-06-11",
      cardName: "The Moon",
      cardImage:
        "https://images.unsplash.com/photo-1659587230184-4cae8a2ed8dd?w=300&q=80",
      summary: "Intuition and subconscious thoughts are heightened",
      mood: "Introspective",
    },
  ],
  onSelectHistoryItem = () => {},
}: CardHistoryProps) => {
  const [expandedItem, setExpandedItem] = React.useState<string | null>(null);

  const handleItemClick = (item: CardHistoryItem) => {
    setExpandedItem(expandedItem === item.id ? null : item.id);
    onSelectHistoryItem(item);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <Card className="w-full h-full bg-slate-900 border-purple-800 text-slate-100 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-900 to-indigo-900 pb-3">
        <CardTitle className="text-xl flex items-center justify-center gap-2">
          <Calendar className="h-5 w-5 text-purple-300" />
          <span>Reading History</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[550px] w-full">
          <div className="p-4 space-y-4">
            {historyItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                <div className="bg-slate-800 rounded-lg overflow-hidden border border-purple-700/30 hover:border-purple-500/50 transition-all">
                  <div className="flex items-center p-3 gap-3">
                    <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.cardImage}
                        alt={item.cardName}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-purple-200">
                          {item.cardName}
                        </h3>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(item.date)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                        {item.summary}
                      </p>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 transition-transform ${expandedItem === item.id ? "transform rotate-180" : ""}`}
                    />
                  </div>

                  {expandedItem === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-3 pb-3 pt-0 border-t border-purple-700/20"
                    >
                      <div className="mt-3 space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium text-purple-300">
                            Full Reading
                          </h4>
                          {item.mood && (
                            <Badge
                              variant="outline"
                              className="bg-purple-900/30 text-purple-200 border-purple-500/30"
                            >
                              Mood: {item.mood}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-300">{item.summary}</p>
                        <div className="pt-2">
                          <div className="text-xs text-slate-400 flex justify-between">
                            <span>Card energy: Intense</span>
                            <span>Alignment: 78%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CardHistory;
