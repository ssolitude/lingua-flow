import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Flashcard {
  id: string;
  user_id: string;
  word: string;
  reading: string | null;
  meaning: string;
  example: string | null;
  example_meaning: string | null;
  level: string | null;
  next_review: string;
  interval_days: number | null;
  ease_factor: number | null;
  repetitions: number | null;
}

// SM-2 algorithm
function calculateNextReview(card: Flashcard, rating: number) {
  let ef = card.ease_factor ?? 2.5;
  let interval = card.interval_days ?? 0;
  let reps = card.repetitions ?? 0;

  if (rating < 3) {
    // Failed - reset
    reps = 0;
    interval = 0;
  } else {
    if (reps === 0) {
      interval = 1 / 1440; // ~1 minute
    } else if (reps === 1) {
      interval = 1;
    } else {
      interval = interval * ef;
    }
    reps += 1;
  }

  // Update ease factor
  ef = ef + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
  if (ef < 1.3) ef = 1.3;

  const nextReview = new Date();
  nextReview.setMinutes(nextReview.getMinutes() + interval * 1440);

  return {
    ease_factor: ef,
    interval_days: interval,
    repetitions: reps,
    next_review: nextReview.toISOString(),
  };
}

export function useFlashcards() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["flashcards", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("flashcards")
        .select("*")
        .eq("user_id", user!.id)
        .order("next_review", { ascending: true });
      if (error) throw error;
      return data as Flashcard[];
    },
    enabled: !!user,
  });
}

export function useDueFlashcards() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["flashcards-due", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("flashcards")
        .select("*")
        .eq("user_id", user!.id)
        .lte("next_review", new Date().toISOString())
        .order("next_review", { ascending: true });
      if (error) throw error;
      return data as Flashcard[];
    },
    enabled: !!user,
  });
}

export function useReviewFlashcard() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ card, rating }: { card: Flashcard; rating: number }) => {
      const updates = calculateNextReview(card, rating);

      // Update flashcard
      const { error: updateError } = await supabase
        .from("flashcards")
        .update(updates)
        .eq("id", card.id);
      if (updateError) throw updateError;

      // Record review
      const { error: reviewError } = await supabase
        .from("reviews")
        .insert({ user_id: user!.id, flashcard_id: card.id, rating });
      if (reviewError) throw reviewError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flashcards"] });
      queryClient.invalidateQueries({ queryKey: ["flashcards-due"] });
    },
  });
}

export function useCreateFlashcard() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (card: { word: string; reading?: string; meaning: string; example?: string; example_meaning?: string; level?: string }) => {
      const { error } = await supabase
        .from("flashcards")
        .insert({ ...card, user_id: user!.id });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flashcards"] });
      queryClient.invalidateQueries({ queryKey: ["flashcards-due"] });
    },
  });
}
