import { Link } from "react-router-dom";
import { Layers, BookOpen, Play, Headphones, ArrowRight } from "lucide-react";

const queue = [
  { icon: Layers, label: "Flashcard Review", desc: "27 cards due", time: "15 min", path: "/flashcards", urgent: true },
  { icon: BookOpen, label: "Grammar: て-form", desc: "N4 Grammar Point", time: "10 min", path: "/grammar" },
  { icon: Play, label: "Watch: Terrace House", desc: "Episode 3 — 12:30 remaining", time: "20 min", path: "/immersion" },
  { icon: Headphones, label: "Shadowing Practice", desc: "Repeat after native speaker", time: "10 min", path: "/immersion" },
];

const StudyQueue = () => {
  return (
    <div className="bg-card rounded-xl shadow-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-lg text-foreground">Today's Study Plan</h2>
        <span className="text-xs text-muted-foreground">~55 min total</span>
      </div>
      <div className="space-y-2">
        {queue.map((item, i) => (
          <Link
            key={i}
            to={item.path}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/60 transition-colors group"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
              item.urgent ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
            }`}>
              <item.icon size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                {item.urgent && (
                  <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-primary/10 text-primary">Due</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-xs">{item.time}</span>
              <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StudyQueue;
