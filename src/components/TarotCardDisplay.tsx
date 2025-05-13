import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TarotCard {
  id: number;
  name: string;
  image: string;
  meaning: string;
  description: string;
}

interface TarotCardDisplayProps {
  cards?: TarotCard[];
  onSelectCard?: (card: TarotCard) => void;
}

const defaultCards: TarotCard[] = [
  {
    id: 1,
    name: "The Fool",
    image:
      "https://images.unsplash.com/photo-1659587230318-71c1d983aded?w=400&q=80",
    meaning: "New beginnings, innocence, spontaneity",
    description:
      "The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner's luck, improvisation and believing in the universe.",
  },
  {
    id: 2,
    name: "The Magician",
    image:
      "https://images.unsplash.com/photo-1633504581786-316c8002b1b9?w=400&q=80",
    meaning: "Manifestation, resourcefulness, power",
    description:
      "The Magician represents manifestation, resourcefulness, power, inspired action, creation and the ability to create one's own reality.",
  },
  {
    id: 3,
    name: "The High Priestess",
    image:
      "https://images.unsplash.com/photo-1659587230136-a1d880dfa5cd?w=400&q=80",
    meaning: "Intuition, sacred knowledge, divine feminine",
    description:
      "The High Priestess represents intuition, sacred knowledge, divine feminine, the subconscious mind, and wisdom beyond logic or intellectual reasoning.",
  },
  {
    id: 4,
    name: "The Empress",
    image:
      "https://images.unsplash.com/photo-1659587230166-7ccd846bc3a8?w=400&q=80",
    meaning: "Femininity, beauty, nature, nurturing",
    description:
      "The Empress represents femininity, beauty, nature, nurturing, abundance, and the creation of life in all forms.",
  },
  {
    id: 5,
    name: "The Emperor",
    image:
      "https://images.unsplash.com/photo-1659587230196-c7b1db3fc0c7?w=400&q=80",
    meaning: "Authority, structure, control, fatherhood",
    description:
      "The Emperor represents authority, structure, control, leadership, and the paternal figure who provides structure and security.",
  },
];

const TarotCardDisplay = ({
  cards = defaultCards,
  onSelectCard,
}: TarotCardDisplayProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedCardId, setFlippedCardId] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState(3); // Number of cards visible at once

  // Update visible cards based on screen size
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    setFlippedCardId(null);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < cards.length - visibleCards ? prevIndex + 1 : prevIndex,
    );
    setFlippedCardId(null);
  };

  const handleCardClick = (card: TarotCard) => {
    if (flippedCardId === card.id) {
      setFlippedCardId(null);
    } else {
      setFlippedCardId(card.id);
      if (onSelectCard) {
        onSelectCard(card);
      }
    }
  };

  const visibleCardsList = cards.slice(
    currentIndex,
    currentIndex + visibleCards,
  );

  return (
    <div className="w-full bg-gradient-to-b from-indigo-900/30 to-purple-900/30 p-6 rounded-xl shadow-lg">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Tarot Deck</h2>
          <div className="text-sm text-white/70">
            {currentIndex + 1}-
            {Math.min(currentIndex + visibleCards, cards.length)} of{" "}
            {cards.length}
          </div>
        </div>

        <div className="relative flex justify-center items-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 z-10 bg-black/30 text-white hover:bg-black/50 rounded-full"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div className="flex justify-center items-center gap-4 overflow-hidden py-4 px-10">
            {visibleCardsList.map((card) => (
              <motion.div
                key={card.id}
                className="relative cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleCardClick(card)}
              >
                <motion.div
                  className="w-[200px] h-[320px] rounded-lg shadow-lg"
                  animate={{
                    rotateY: flippedCardId === card.id ? 180 : 0,
                  }}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front of card */}
                  <motion.div
                    className="absolute w-full h-full rounded-lg bg-gradient-to-br from-indigo-600 to-purple-700 border-2 border-indigo-300/30 flex flex-col justify-center items-center p-4 backface-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="w-full h-full overflow-hidden rounded-md">
                      <img
                        src={card.image}
                        alt={card.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 w-full bg-black/70 p-2 text-center">
                      <h3 className="text-white text-sm font-medium">
                        {card.name}
                      </h3>
                    </div>
                    <div className="absolute inset-0 bg-purple-500/10 rounded-lg border border-white/20 pointer-events-none"></div>
                  </motion.div>

                  {/* Back of card */}
                  <motion.div
                    className="absolute w-full h-full rounded-lg bg-gradient-to-br from-purple-800 to-indigo-900 border-2 border-indigo-300/30 flex flex-col justify-between p-4 backface-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <h3 className="text-white text-lg font-bold text-center">
                      {card.name}
                    </h3>
                    <div className="text-white/90 text-sm overflow-y-auto flex-grow my-2">
                      <p className="font-medium text-indigo-200 mb-1">
                        {card.meaning}
                      </p>
                      <p className="text-xs">{card.description}</p>
                    </div>
                    <div className="text-center text-xs text-white/70">
                      Tap to flip back
                    </div>
                  </motion.div>
                </motion.div>

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-indigo-500/20 rounded-lg blur-md -z-10"
                  animate={{
                    opacity: flippedCardId === card.id ? 0.7 : 0.3,
                    scale: flippedCardId === card.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 z-10 bg-black/30 text-white hover:bg-black/50 rounded-full"
            onClick={handleNext}
            disabled={currentIndex >= cards.length - visibleCards}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <div className="text-center text-white/70 text-sm">
          Select a card to reveal its meaning
        </div>
      </div>
    </div>
  );
};

export default TarotCardDisplay;
