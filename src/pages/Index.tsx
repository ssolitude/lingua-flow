import AppLayout from "@/components/AppLayout";
import RoadmapTimeline from "@/components/RoadmapTimeline";
import DailyStats from "@/components/DailyStats";
import StudyQueue from "@/components/StudyQueue";

const Index = () => {
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">
          おはよう、<span className="text-gradient-primary">Student</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          You're on a 12-day streak. Keep going! 🔥
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          <StudyQueue />
          <RoadmapTimeline />
        </div>

        {/* Sidebar */}
        <div>
          <DailyStats />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
