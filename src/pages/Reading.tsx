import AppLayout from "@/components/AppLayout";
import { BookOpen, Star, Clock } from "lucide-react";

const articles = [
  { title: "私の一日", titleEn: "My Day", level: "N5", time: "3 min", category: "Daily Life", difficulty: 1 },
  { title: "日本の季節", titleEn: "Seasons of Japan", level: "N5", time: "5 min", category: "Culture", difficulty: 1 },
  { title: "東京の電車", titleEn: "Tokyo Trains", level: "N4", time: "6 min", category: "Travel", difficulty: 2 },
  { title: "日本の食文化", titleEn: "Japanese Food Culture", level: "N4", time: "8 min", category: "Culture", difficulty: 2 },
  { title: "環境問題について", titleEn: "About Environmental Issues", level: "N3", time: "10 min", category: "Society", difficulty: 3 },
  { title: "AIと未来", titleEn: "AI and the Future", level: "N2", time: "15 min", category: "Technology", difficulty: 4 },
];

const Reading = () => {
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">Reading</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Graded articles with furigana and click-to-translate
        </p>
      </div>

      <div className="space-y-3">
        {articles.map((article, i) => (
          <div
            key={i}
            className="flex items-center gap-4 bg-card rounded-xl shadow-card p-5 cursor-pointer hover:shadow-elevated transition-shadow group"
          >
            <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <BookOpen size={20} className="text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-japanese text-base font-semibold text-foreground">{article.title}</p>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-jlpt-${article.level.toLowerCase()} text-primary-foreground`}>
                  {article.level}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{article.titleEn} · {article.category}</p>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={10} className={j < article.difficulty ? "text-accent fill-accent" : "text-border"} />
                ))}
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Clock size={12} />
                {article.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default Reading;
