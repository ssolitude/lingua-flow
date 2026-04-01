import { CheckCircle2, Circle, Lock } from "lucide-react";

const levels = [
  { id: "n5", label: "N5", title: "Beginner", desc: "Hiragana, Katakana, 100 Kanji, Basic Grammar", progress: 100, color: "bg-jlpt-n5" },
  { id: "n4", label: "N4", title: "Elementary", desc: "300 Kanji, Conversational Grammar, 1500 Vocab", progress: 45, color: "bg-jlpt-n4" },
  { id: "n3", label: "N3", title: "Intermediate", desc: "600 Kanji, Complex Sentences, 3750 Vocab", progress: 0, color: "bg-jlpt-n3" },
  { id: "n2", label: "N2", title: "Upper-Intermediate", desc: "1000 Kanji, Formal Japanese, 6000 Vocab", progress: 0, color: "bg-jlpt-n2" },
  { id: "n1", label: "N1", title: "Advanced", desc: "2000 Kanji, Native-level Reading, 10000 Vocab", progress: 0, color: "bg-jlpt-n1" },
];

const RoadmapTimeline = () => {
  return (
    <div className="bg-card rounded-xl shadow-card p-6">
      <h2 className="font-display font-semibold text-lg text-foreground mb-6">Your Roadmap</h2>
      <div className="space-y-0">
        {levels.map((level, i) => {
          const status = level.progress === 100 ? "complete" : level.progress > 0 ? "active" : "locked";
          return (
            <div key={level.id} className="flex gap-4">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                {status === "complete" ? (
                  <CheckCircle2 className="w-6 h-6 text-success shrink-0" />
                ) : status === "active" ? (
                  <div className={`w-6 h-6 rounded-full ${level.color} flex items-center justify-center shrink-0`}>
                    <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                  </div>
                ) : (
                  <Circle className="w-6 h-6 text-muted-foreground/30 shrink-0" />
                )}
                {i < levels.length - 1 && (
                  <div className={`w-0.5 h-16 ${status === "complete" ? "bg-success" : "bg-border"}`} />
                )}
              </div>

              {/* Content */}
              <div className={`pb-6 ${status === "locked" ? "opacity-40" : ""}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${level.color} text-primary-foreground`}>
                    {level.label}
                  </span>
                  <span className="font-display font-semibold text-sm text-foreground">{level.title}</span>
                  {status === "locked" && <Lock size={12} className="text-muted-foreground" />}
                </div>
                <p className="text-xs text-muted-foreground mb-2">{level.desc}</p>
                {status === "active" && (
                  <div className="w-48 h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className={`h-full rounded-full ${level.color} transition-all`}
                      style={{ width: `${level.progress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapTimeline;
