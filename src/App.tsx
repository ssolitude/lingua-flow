import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index.tsx";
import Auth from "./pages/Auth.tsx";
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
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/flashcards" element={<ProtectedRoute><Flashcards /></ProtectedRoute>} />
            <Route path="/kanji" element={<ProtectedRoute><Kanji /></ProtectedRoute>} />
            <Route path="/grammar" element={<ProtectedRoute><Grammar /></ProtectedRoute>} />
            <Route path="/immersion" element={<ProtectedRoute><Immersion /></ProtectedRoute>} />
            <Route path="/reading" element={<ProtectedRoute><Reading /></ProtectedRoute>} />
            <Route path="/planner" element={<ProtectedRoute><Planner /></ProtectedRoute>} />
            <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
            <Route path="/tutor" element={<ProtectedRoute><Tutor /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
