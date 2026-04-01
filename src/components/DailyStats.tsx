import { Flame, Clock, Brain, BookOpen, Headphones, Eye } from "lucide-react";

const stats = [
  { icon: Flame, label: "Streak", value: "12 days", color: "text-accent" },
  { icon: Clock, label: "Today", value: "35 min", color: "text-info" },
  { icon: Brain, label: "Reviews", value: "23/50", color: "text-primary" },
  { icon: BookOpen, label: "New Words", value: "8", color: "text-success" },
];

const skills = [
  { icon: Eye, label: "Reading", value: 72, color: "bg-jlpt-n5" },
  { icon: Headphones, label: "Listening", value: 58, color: "bg-jlpt-n2" },
  { icon: Brain, label: "Vocabulary", value: 65, color: "bg-jlpt-n4" },
  { icon: BookOpen, label: "Grammar", value: 48, color: "bg-jlpt-n3" },
];

const DailyStats = () => {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-xl shadow-card p-4">
            <div className="flex items-center gap-2 mb-1">
              <stat.icon size={16} className={stat.color} />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <p className="font-display font-bold text-lg text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Skill Breakdown */}
      <div className="bg-card rounded-xl shadow-card p-5">
        <h3 className="font-display font-semibold text-sm text-foreground mb-4">Skill Breakdown</h3>
        <div className="space-y-3">
          {skills.map((skill) => (
            <div key={skill.label}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <skill.icon size={14} className="text-muted-foreground" />
                  <span className="text-xs text-foreground font-medium">{skill.label}</span>
                </div>
                <span className="text-xs text-muted-foreground font-medium">{skill.value}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <div className={`h-full rounded-full ${skill.color} transition-all`} style={{ width: `${skill.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyStats;
