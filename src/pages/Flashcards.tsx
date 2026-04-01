import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import { Volume2, BookmarkPlus, Plus } from "lucide-react";
import { useDueFlashcards, useReviewFlashcard, useCreateFlashcard, Flashcard } from "@/hooks/useFlashcards";
import { toast } from "sonner";

const ratingButtons = [
  { label: "Again", sublabel: "< 1 min", color: "bg-destructive text-destructive-foreground", value: 1 },
  { label: "Hard", sublabel: "6 min", color: "bg-warning text-warning-foreground", value: 2 },
  { label: "Good", sublabel: "10 min", color: "bg-success text-success-foreground", value: 3 },
  { label: "Easy", sublabel: "4 days", color: "bg-info text-info-foreground", value: 4 },
];

const seedCards = [
  { word: "食べる", reading: "たべる", meaning: "to eat", example: "朝ごはんを食べる。", example_meaning: "I eat breakfast.", level: "N5" },
  { word: "勉強", reading: "べんきょう", meaning: "study", example: "毎日日本語を勉強する。", example_meaning: "I study Japanese every day.", level: "N5" },
  { word: "約束", reading: "やくそく", meaning: "promise; appointment", example: "友達と約束がある。", example_meaning: "I have an appointment with a friend.", level: "N4" },
  { word: "経験", reading: "けいけん", meaning: "experience", example: "いい経験になった。", example_meaning: "It was a good experience.", level: "N3" },
  { word: "環境", reading: "かんきょう", meaning: "environment", example: "環境を守ることが大切です。", example_meaning: "It's important to protect the environment.", level: "N2" },
];

const Flashcards = () => {
  const { data: dueCards, isLoading } = useDueFlashcards();
  const reviewMutation = useReviewFlashcard();
  const createMutation = useCreateFlashcard();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [newCard, setNewCard] = useState({ word: "", reading: "", meaning: "", level: "N5" });

  const cards = dueCards ?? [];
  const card = cards[currentIndex];
  const total = cards.length;

  const handleRate = useCallback((rating: number) => {
    if (!card) return;
    reviewMutation.mutate({ card, rating });
    setFlipped(false);
    setCompleted((c) => c + 1);
    setTimeout(() => {
      setCurrentIndex((i) => Math.min(i + 1, total - 1));
    }, 200);
  }, [card, reviewMutation, total]);

  const handleSeedCards = async () => {
    for (const c of seedCards) {
      await createMutation.mutateAsync(c);
    }
    toast.success("Added 5 starter flashcards!");
  };

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    await createMutation.mutateAsync(newCard);
    setNewCard({ word: "", reading: "", meaning: "", level: "N5" });
    setShowAdd(false);
    toast.success("Flashcard created!");
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Flashcard Review</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {total === 0 ? "No cards due" : `${completed}/${total} cards reviewed`}
            </p>
          </div>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus size={16} /> Add Card
          </button>
        </div>

        {/* Add card form */}
        {showAdd && (
          <form onSubmit={handleAddCard} className="bg-card rounded-xl shadow-card p-5 mb-6 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input value={newCard.word} onChange={(e) => setNewCard({ ...newCard, word: e.target.value })} placeholder="Word (e.g. 食べる)" required className="px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              <input value={newCard.reading} onChange={(e) => setNewCard({ ...newCard, reading: e.target.value })} placeholder="Reading (e.g. たべる)" className="px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <input value={newCard.meaning} onChange={(e) => setNewCard({ ...newCard, meaning: e.target.value })} placeholder="Meaning (e.g. to eat)" required className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            <button type="submit" disabled={createMutation.isPending} className="px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
              {createMutation.isPending ? "Adding..." : "Add Flashcard"}
            </button>
          </form>
        )}

        {/* Empty state */}
        {total === 0 && (
          <div className="bg-card rounded-2xl shadow-elevated p-10 text-center">
            <p className="font-japanese text-4xl mb-4">📇</p>
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">No cards due for review</h3>
            <p className="text-sm text-muted-foreground mb-6">Add some flashcards to start studying, or seed starter cards.</p>
            <button onClick={handleSeedCards} disabled={createMutation.isPending} className="px-5 py-2.5 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
              {createMutation.isPending ? "Adding..." : "Add 5 Starter Cards"}
            </button>
          </div>
        )}

        {/* Progress bar */}
        {total > 0 && (
          <div className="h-1.5 rounded-full bg-secondary mb-8 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-primary transition-all duration-500" style={{ width: `${(completed / total) * 100}%` }} />
          </div>
        )}

        {/* Card */}
        {card && completed < total && (
          <>
            <div className="perspective-1000 cursor-pointer mb-8" onClick={() => setFlipped(!flipped)}>
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
                      {card.example && (
                        <div className="bg-secondary/60 rounded-lg p-4 max-w-md">
                          <p className="font-japanese text-sm text-foreground mb-1">{card.example}</p>
                          <p className="text-xs text-muted-foreground">{card.example_meaning}</p>
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {flipped && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-4 gap-3">
                {ratingButtons.map((btn) => (
                  <button key={btn.value} onClick={() => handleRate(btn.value)} className={`${btn.color} rounded-xl py-3 px-2 text-center transition-all hover:scale-105 active:scale-95`}>
                    <p className="text-sm font-semibold">{btn.label}</p>
                    <p className="text-[10px] opacity-80">{btn.sublabel}</p>
                  </button>
                ))}
              </motion.div>
            )}
          </>
        )}

        {/* All done */}
        {total > 0 && completed >= total && (
          <div className="bg-card rounded-2xl shadow-elevated p-10 text-center">
            <p className="text-4xl mb-4">🎉</p>
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">All done!</h3>
            <p className="text-sm text-muted-foreground">You've reviewed all due cards. Come back later for more.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Flashcards;
