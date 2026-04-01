import AppLayout from "@/components/AppLayout";
import { CheckCircle2, Circle, Clock } from "lucide-react";

const schedule = [
  { time: "Morning", tasks: [
    { label: "Flashcard Review (27 due)", done: false, minutes: 15, icon: "📇" },
    { label: "New Kanji: 水, 木, 金", done: false, minutes: 10, icon: "漢" },
  ]},
  { time: "Afternoon", tasks: [
    { label: "Grammar: て-form practice", done: false, minutes: 10, icon: "📖" },
    { label: "Watch: Terrace House Ep.3", done: false, minutes: 20, icon: "📺" },
  ]},
  { time: "Evening", tasks: [
    { label: "Reading: 私の一日", done: false, minutes: 5, icon: "📄" },
    { label: "Shadowing practice", done: false, minutes: 10, icon: "🎤" },
  ]},
];

const Planner = () => {
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">Daily Planner</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Auto-generated study schedule · ~70 min today
        </p>
      </div>

      <div className="space-y-6">
        {schedule.map((block) => (
          <div key={block.time}>
            <h2 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
              {block.time}
            </h2>
            <div className="space-y-2">
              {block.tasks.map((task, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-card rounded-xl shadow-card p-4 cursor-pointer hover:shadow-elevated transition-shadow"
                >
                  <Circle className="w-5 h-5 text-muted-foreground/30 shrink-0" />
                  <span className="text-xl shrink-0">{task.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{task.label}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock size={12} />
                    {task.minutes} min
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default Planner;
