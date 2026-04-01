import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import { RotateCcw, Volume2, BookmarkPlus, ChevronRight } from "lucide-react";

interface Flashcard {
  id: number;
  word: string;
  reading: string;
  meaning: string;
  example: string;
  exampleMeaning: string;
  level: string;
}

const sampleCards: Flashcard[] = [
  { id: 1, word: "食べる", reading: "たべる", meaning: "to eat", example: "朝ごはんを食べる。", exampleMeaning: "I eat breakfast.", level: "N5" },
  { id: 2, word: "勉強", reading: "べんきょう", meaning: "study", example: "毎日日本語を勉強する。", exampleMeaning: "I study Japanese every day.", level: "N5" },
  { id: 3, word: "約束", reading: "やくそく", meaning: "promise; appointment", example: "友達と約束がある。", exampleMeaning: "I have an appointment with a friend.", level: "N4" },
  { id: 4, word: "経験", reading: "けいけん", meaning: "experience", example: "いい経験になった。", exampleMeaning: "It was a good experience.", level: "N3" },
  { id: 5, word: "環境", reading: "かんきょう", meaning: "environment", example: "環境を守ることが大切です。", exampleMeaning: "It's important to protect the environment.", level: "N2" },
];

const ratingButtons = [
  { label: "Again", sublabel: "< 1 min", color: "bg-destructive text-destructive-foreground", value: 1 },
  { label: "Hard", sublabel: "6 min", color: "bg-warning text-warning-foreground", value: 2 },
  { label: "Good", sublabel: "10 min", color: "bg-success text-success-foreground", value: 3 },
  { label: "Easy", sublabel: "4 days", color: "bg-info text-info-foreground", value: 4 },
];

const Flashcards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [completed, setCompleted] = useState(0);

  const card = sampleCards[currentIndex];
  const total = sampleCards.length;

  const handleRate = useCallback((rating: number) => {
    setFlipped(false);
    setCompleted((c) => c + 1);
    setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % sampleCards.length);
    }, 200);
  }, []);

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Flashcard Review</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {completed}/{total} cards reviewed
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-jlpt-${card.level.toLowerCase()} text-primary-foreground`}>
              {card.level}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full bg-secondary mb-8 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-primary transition-all duration-500"
            style={{ width: `${(completed / total) * 100}%` }}
          />
        </div>

        {/* Card */}
        <div
          className="perspective-1000 cursor-pointer mb-8"
          onClick={() => setFlipped(!flipped)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentIndex}-${flipped}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-card rounded-2xl shadow-elevated p-10 min-h-[320px] flex flex-col items-center justify-center text-center"
            >
              {!flipped ? (
                <>
                  <p className="font-japanese text-5xl font-bold text-foreground mb-3">{card.word}</p>
                  <p className="font-japanese text-lg text-muted-foreground">{card.reading}</p>
                  <p className="text-xs text-muted-foreground/50 mt-6">Tap to reveal</p>
                </>
              ) : (
                <>
                  <p className="font-japanese text-3xl font-bold text-foreground mb-2">{card.word}</p>
                  <p className="font-japanese text-sm text-muted-foreground mb-4">{card.reading}</p>
                  <div className="w-16 h-px bg-border mb-4" />
                  <p className="text-xl font-semibold text-primary mb-6">{card.meaning}</p>
                  <div className="bg-secondary/60 rounded-lg p-4 max-w-md">
                    <p className="font-japanese text-sm text-foreground mb-1">{card.example}</p>
                    <p className="text-xs text-muted-foreground">{card.exampleMeaning}</p>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action buttons */}
        {flipped && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-4 gap-3"
          >
            {ratingButtons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => handleRate(btn.value)}
                className={`${btn.color} rounded-xl py-3 px-2 text-center transition-all hover:scale-105 active:scale-95`}
              >
                <p className="text-sm font-semibold">{btn.label}</p>
                <p className="text-[10px] opacity-80">{btn.sublabel}</p>
              </button>
            ))}
          </motion.div>
        )}

        {!flipped && (
          <div className="flex justify-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80 transition-colors">
              <Volume2 size={16} /> Audio
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80 transition-colors">
              <BookmarkPlus size={16} /> Save
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Flashcards;
