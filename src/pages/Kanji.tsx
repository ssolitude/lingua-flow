import AppLayout from "@/components/AppLayout";
import { Search } from "lucide-react";

const kanjiList = [
  { char: "日", meaning: "day/sun", on: "ニチ", kun: "ひ", strokes: 4, level: "N5", learned: true },
  { char: "月", meaning: "moon/month", on: "ゲツ", kun: "つき", strokes: 4, level: "N5", learned: true },
  { char: "火", meaning: "fire", on: "カ", kun: "ひ", strokes: 4, level: "N5", learned: true },
  { char: "水", meaning: "water", on: "スイ", kun: "みず", strokes: 4, level: "N5", learned: false },
  { char: "木", meaning: "tree", on: "モク", kun: "き", strokes: 4, level: "N5", learned: false },
  { char: "金", meaning: "gold/money", on: "キン", kun: "かね", strokes: 8, level: "N5", learned: false },
  { char: "土", meaning: "earth", on: "ド", kun: "つち", strokes: 3, level: "N5", learned: false },
  { char: "人", meaning: "person", on: "ジン", kun: "ひと", strokes: 2, level: "N5", learned: false },
  { char: "大", meaning: "big", on: "ダイ", kun: "おおきい", strokes: 3, level: "N5", learned: false },
  { char: "学", meaning: "study", on: "ガク", kun: "まなぶ", strokes: 8, level: "N5", learned: false },
  { char: "山", meaning: "mountain", on: "サン", kun: "やま", strokes: 3, level: "N5", learned: false },
  { char: "川", meaning: "river", on: "セン", kun: "かわ", strokes: 3, level: "N5", learned: false },
];

const Kanji = () => {
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">Kanji</h1>
        <p className="text-sm text-muted-foreground mt-1">
          3/80 N5 Kanji mastered
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
        <input
          type="text"
          placeholder="Search kanji by meaning, reading, or character..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {kanjiList.map((k) => (
          <div
            key={k.char}
            className={`bg-card rounded-xl shadow-card p-4 text-center cursor-pointer hover:shadow-elevated transition-shadow group ${
              k.learned ? "ring-2 ring-success/30" : ""
            }`}
          >
            <p className="font-japanese text-3xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
              {k.char}
            </p>
            <p className="text-xs text-muted-foreground mb-1">{k.meaning}</p>
            <div className="flex justify-center gap-2 text-[10px] text-muted-foreground/70">
              <span>{k.on}</span>
              <span>·</span>
              <span>{k.kun}</span>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default Kanji;
