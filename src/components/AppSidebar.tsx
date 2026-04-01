import { Link, useLocation } from "react-router-dom";
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

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">漢</span>
        </div>
        <span className="font-display font-bold text-lg text-foreground tracking-tight">
          Nihongo
        </span>
      </div>

      {/* Nav */}
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
              <item.icon className="w-4.5 h-4.5" size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom stats */}
      <div className="px-4 py-4 border-t border-border space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-accent">
            <Flame size={16} />
            <span className="font-semibold">12 day streak</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Trophy size={14} />
            <span className="text-xs">1,240 XP</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
            U
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Student</p>
            <p className="text-xs text-muted-foreground">N4 Level</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
