import AppLayout from "@/components/AppLayout";
import { CheckCircle2, Circle, ChevronRight } from "lucide-react";

const grammarPoints = [
  { id: 1, structure: "〜は〜です", title: "Topic Marker + Copula", level: "N5", learned: true, desc: "Basic sentence pattern: X is Y" },
  { id: 2, structure: "〜を〜ます", title: "Object + Verb", level: "N5", learned: true, desc: "Direct object with polite verb form" },
  { id: 3, structure: "〜に行きます", title: "Going to do", level: "N5", learned: true, desc: "Express purpose of going somewhere" },
  { id: 4, structure: "〜て form", title: "Te-form", level: "N4", learned: false, desc: "Connecting actions, requests, and progressive" },
  { id: 5, structure: "〜たことがある", title: "Have experienced", level: "N4", learned: false, desc: "Express past experiences" },
  { id: 6, structure: "〜ようにする", title: "Try to / Make sure to", level: "N3", learned: false, desc: "Express effort or making sure" },
  { id: 7, structure: "〜ばかり", title: "Nothing but / Just did", level: "N3", learned: false, desc: "Emphasis on excess or recency" },
  { id: 8, structure: "〜わけがない", title: "There's no way", level: "N2", learned: false, desc: "Express impossibility" },
];

const Grammer = () => {
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">Grammar</h1>
        <p className="text-sm text-muted-foreground mt-1">
          3 points mastered · 5 remaining
        </p>
      </div>

      <div className="space-y-2">
        {grammarPoints.map((gp) => (
          <div
            key={gp.id}
            className="flex items-center gap-4 bg-card rounded-xl shadow-card p-4 cursor-pointer hover:shadow-elevated transition-shadow group"
          >
            {gp.learned ? (
              <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground/30 shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-japanese text-base font-bold text-foreground">{gp.structure}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-jlpt-${gp.level.toLowerCase()} text-primary-foreground`}>
                  {gp.level}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{gp.title} — {gp.desc}</p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground/30 group-hover:text-foreground transition-colors" />
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default Grammer;
