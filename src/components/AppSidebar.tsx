import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard,
  Languages,
  BookOpen,
  Layers,
  Play,
  FileText,
  Calendar,
  BarChart3,
  MessageCircle,
  Flame,
  Trophy,
  LogOut,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Layers, label: "Flashcards", path: "/flashcards" },
  { icon: Languages, label: "Kanji", path: "/kanji" },
  { icon: BookOpen, label: "Grammar", path: "/grammar" },
  { icon: Play, label: "Immersion", path: "/immersion" },
  { icon: FileText, label: "Reading", path: "/reading" },
  { icon: Calendar, label: "Planner", path: "/planner" },
  { icon: BarChart3, label: "Progress", path: "/progress" },
  { icon: MessageCircle, label: "AI Tutor", path: "/tutor" },
];

const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user!.id)
        .single();
      return data;
    },
    enabled: !!user,
  });

  const { data: progress } = useQuery({
    queryKey: ["user-progress", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user!.id)
        .single();
      return data;
    },
    enabled: !!user,
  });

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card flex flex-col">
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">漢</span>
        </div>
        <span className="font-display font-bold text-lg text-foreground tracking-tight">Nihongo</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-border space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-accent">
            <Flame size={16} />
            <span className="font-semibold">{progress?.streak ?? 0} day streak</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Trophy size={14} />
            <span className="text-xs">{progress?.xp ?? 0} XP</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
              {(profile?.display_name ?? user?.email ?? "U")[0].toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground truncate max-w-[120px]">
                {profile?.display_name ?? user?.email}
              </p>
              <p className="text-xs text-muted-foreground">{profile?.jlpt_level ?? "N5"} Level</p>
            </div>
          </div>
          <button onClick={handleSignOut} className="text-muted-foreground hover:text-foreground transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
