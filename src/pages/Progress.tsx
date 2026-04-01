import AppLayout from "@/components/AppLayout";
import { Flame, Clock, Brain, Target, TrendingUp } from "lucide-react";

const weekData = [
  { day: "Mon", minutes: 45 },
  { day: "Tue", minutes: 30 },
  { day: "Wed", minutes: 55 },
  { day: "Thu", minutes: 20 },
  { day: "Fri", minutes: 40 },
  { day: "Sat", minutes: 60 },
  { day: "Sun", minutes: 35 },
];

const maxMinutes = Math.max(...weekData.map(d => d.minutes));

const Progress = () => {
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">Progress</h1>
        <p className="text-sm text-muted-foreground mt-1">Track your Japanese learning journey</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Flame, label: "Current Streak", value: "12 days", color: "text-accent" },
          { icon: Clock, label: "Total Study Time", value: "48h 30m", color: "text-info" },
          { icon: Brain, label: "Words Learned", value: "342", color: "text-primary" },
          { icon: Target, label: "JLPT Readiness", value: "N4 — 45%", color: "text-success" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card rounded-xl shadow-card p-5">
            <stat.icon size={20} className={`${stat.color} mb-3`} />
            <p className="font-display font-bold text-xl text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Weekly chart */}
      <div className="bg-card rounded-xl shadow-card p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-semibold text-foreground">This Week</h2>
          <div className="flex items-center gap-1.5 text-xs text-success font-medium">
            <TrendingUp size={14} />
            <span>+12% from last week</span>
          </div>
        </div>
        <div className="flex items-end gap-3 h-40">
          {weekData.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-[10px] text-muted-foreground font-medium">{d.minutes}m</span>
              <div className="w-full rounded-t-lg bg-primary/15 relative" style={{ height: `${(d.minutes / maxMinutes) * 100}%` }}>
                <div
                  className="absolute bottom-0 w-full rounded-t-lg bg-gradient-primary"
                  style={{ height: "100%" }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Streak calendar placeholder */}
      <div className="bg-card rounded-xl shadow-card p-6">
        <h2 className="font-display font-semibold text-foreground mb-4">Streak Calendar</h2>
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: 28 }).map((_, i) => {
            const active = i < 12 || (i > 14 && i < 20);
            return (
              <div
                key={i}
                className={`aspect-square rounded-md ${active ? "bg-primary/80" : "bg-secondary"}`}
              />
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Progress;
