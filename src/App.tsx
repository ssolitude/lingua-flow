import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Flashcards from "./pages/Flashcards.tsx";
import Kanji from "./pages/Kanji.tsx";
import Grammar from "./pages/Grammar.tsx";
import Immersion from "./pages/Immersion.tsx";
import Reading from "./pages/Reading.tsx";
import Planner from "./pages/Planner.tsx";
import Progress from "./pages/Progress.tsx";
import Tutor from "./pages/Tutor.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/kanji" element={<Kanji />} />
          <Route path="/grammar" element={<Grammar />} />
          <Route path="/immersion" element={<Immersion />} />
          <Route path="/reading" element={<Reading />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/tutor" element={<Tutor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
