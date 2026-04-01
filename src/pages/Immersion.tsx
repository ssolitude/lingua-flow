import AppLayout from "@/components/AppLayout";
import { Play, Clock, BookmarkPlus, Star } from "lucide-react";

const content = [
  { title: "Terrace House: Tokyo", type: "TV Show", level: "N4-N3", duration: "45 min", progress: 35, img: "🏠" },
  { title: "日本語の森 — N4 Listening", type: "YouTube", level: "N4", duration: "12 min", progress: 0, img: "🌳" },
  { title: "Comprehensible Japanese", type: "YouTube", level: "N5", duration: "8 min", progress: 100, img: "🗾" },
  { title: "あたしンち", type: "Anime", level: "N4", duration: "25 min", progress: 0, img: "👨‍👩‍👧‍👦" },
  { title: "Podcast: ひいきびいき", type: "Podcast", level: "N3-N2", duration: "30 min", progress: 0, img: "🎙️" },
  { title: "NHK World Easy News", type: "News", level: "N3", duration: "5 min", progress: 60, img: "📰" },
];

const Immersion = () => {
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">Immersion</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Watch, listen, and absorb Japanese naturally
        </p>
      </div>

      {/* Continue watching */}
      <div className="mb-8">
        <h2 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">Continue Watching</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.filter(c => c.progress > 0 && c.progress < 100).map((item, i) => (
            <div key={i} className="bg-card rounded-xl shadow-card overflow-hidden cursor-pointer hover:shadow-elevated transition-shadow group">
              <div className="bg-foreground/5 h-32 flex items-center justify-center text-5xl relative">
                <span>{item.img}</span>
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
                  <Play className="text-foreground opacity-0 group-hover:opacity-60 transition-opacity" size={40} />
                </div>
                {/* Progress */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-foreground/10">
                  <div className="h-full bg-primary" style={{ width: `${item.progress}%` }} />
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{item.type}</span>
                  <span>·</span>
                  <span>{item.level}</span>
                  <span>·</span>
                  <Clock size={10} />
                  <span>{item.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Browse content */}
      <h2 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">Browse Content</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {content.filter(c => c.progress === 0).map((item, i) => (
          <div key={i} className="bg-card rounded-xl shadow-card overflow-hidden cursor-pointer hover:shadow-elevated transition-shadow group">
            <div className="bg-foreground/5 h-24 flex items-center justify-center text-4xl">
              <span>{item.img}</span>
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-foreground mb-1 truncate">{item.title}</p>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span>{item.level}</span>
                <span>·</span>
                <span>{item.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default Immersion;
