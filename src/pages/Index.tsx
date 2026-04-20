import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/81e1c6a6-b45c-49e8-ae6b-7cc650f72aec/files/4d1ca9f1-d3c1-47a7-bb98-d6d1ea801d4b.jpg";

const PHOTOS = [
  { id: 1, src: HERO_IMAGE, caption: "Наш лучший день ☀️" },
  { id: 2, src: HERO_IMAGE, caption: "Помним всё 💜" },
  { id: 3, src: HERO_IMAGE, caption: "Смех до слёз 😂" },
  { id: 4, src: HERO_IMAGE, caption: "Лето навсегда 🌸" },
  { id: 5, src: HERO_IMAGE, caption: "Наши моменты ✨" },
  { id: 6, src: HERO_IMAGE, caption: "Лучшие годы 💕" },
];

const LETTERS = [
  {
    author: "Маша",
    date: "20 апреля 2026",
    avatar: "🌷",
    text: "Дорогая, ты — моё солнышко в пасмурные дни. Столько лет вместе, и каждый раз ты умеешь удивлять. Спасибо за то, что всегда рядом, за твой смех и теплоту. Люблю тебя безгранично!",
  },
  {
    author: "Аня",
    date: "19 апреля 2026",
    avatar: "🌺",
    text: "Ты — человек, который делает жизнь ярче просто своим присутствием. Помню наши первые встречи и не могу поверить, как далеко мы зашли. Ты лучшая подруга, о которой можно мечтать.",
  },
  {
    author: "Катя",
    date: "18 апреля 2026",
    avatar: "🌹",
    text: "Каждый день рядом с тобой — маленький праздник. Твоя доброта, забота и умение слушать — это редкий дар. Желаю тебе всего самого светлого!",
  },
];

const VIDEOS = [
  { id: 1, title: "Наше путешествие", emoji: "🎬", duration: "2:34" },
  { id: 2, title: "День рождения 2024", emoji: "🎉", duration: "5:12" },
  { id: 3, title: "Лесная прогулка", emoji: "🌿", duration: "1:47" },
];

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  symbol: i % 3 === 0 ? "💕" : i % 3 === 1 ? "✨" : "🌸",
  left: `${(i * 5.5 + 3) % 100}%`,
  delay: `${(i * 0.4) % 6}s`,
  duration: `${4 + (i % 4)}s`,
  size: i % 2 === 0 ? "text-lg" : "text-sm",
}));

type Section = "hero" | "about" | "gallery" | "videos" | "letters";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  const [visibleLetters, setVisibleLetters] = useState<number[]>([]);
  const [friendshipDays] = useState(() => {
    const start = new Date("2020-03-15");
    const now = new Date();
    return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  });

  const lettersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeSection === "letters") {
      setVisibleLetters([]);
      const timers = LETTERS.map((_, i) =>
        setTimeout(() => setVisibleLetters((prev) => [...prev, i]), i * 300 + 100)
      );
      return () => timers.forEach(clearTimeout);
    }
  }, [activeSection]);

  const navItems: { id: Section; label: string; emoji: string }[] = [
    { id: "hero", label: "Главная", emoji: "🏠" },
    { id: "about", label: "О ней", emoji: "💜" },
    { id: "gallery", label: "Галерея", emoji: "📷" },
    { id: "videos", label: "Видео", emoji: "🎬" },
    { id: "letters", label: "Письма", emoji: "💌" },
  ];

  return (
    <div className="min-h-screen bg-rose-50 overflow-x-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className={`absolute ${p.size} opacity-40`}
            style={{
              left: p.left,
              top: "-20px",
              animationDelay: p.delay,
              animationDuration: p.duration,
              animationName: "floatDown",
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
              display: "inline-block",
            }}
          >
            {p.symbol}
          </span>
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-rose-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-xl text-rose-400 italic font-light tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            моя лучшая ✦
          </span>
          <div className="flex gap-1 sm:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-2 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-rose-300 text-white shadow-md scale-105"
                    : "text-rose-400 hover:bg-rose-100"
                }`}
              >
                <span className="sm:hidden">{item.emoji}</span>
                <span className="hidden sm:inline">{item.emoji} {item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-16 relative z-10">

        {/* HERO */}
        {activeSection === "hero" && (
          <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
            <div className="relative mb-8">
              <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-rose-200 shadow-2xl mx-auto">
                <img src={HERO_IMAGE} alt="Подруга" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-3 -right-3 text-4xl animate-bounce">💕</div>
              <div className="absolute -bottom-3 -left-3 text-3xl animate-bounce" style={{ animationDelay: "0.5s" }}>🌸</div>
              <div className="absolute top-1/2 -right-8 text-2xl animate-pulse">✨</div>
            </div>

            <h1 className="text-5xl sm:text-7xl text-rose-400 italic font-light mb-2 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Моей лучшей
            </h1>
            <h2 className="text-4xl sm:text-6xl text-rose-600 font-semibold mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              подруге на свете
            </h2>
            <p className="text-xl sm:text-2xl text-rose-400 mb-10 max-w-md" style={{ fontFamily: "'Caveat', cursive" }}>
              Этот сайт создан с любовью и теплом для тебя 💜
            </p>

            <div className="flex gap-6 mb-12">
              <div className="text-center bg-white/80 rounded-2xl px-6 py-4 shadow-md border border-rose-100">
                <div className="text-4xl text-rose-500 font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{friendshipDays}</div>
                <div className="text-xs text-rose-300 mt-1">дней дружбы</div>
              </div>
              <div className="text-center bg-white/80 rounded-2xl px-6 py-4 shadow-md border border-rose-100">
                <div className="text-4xl text-rose-500 font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>∞</div>
                <div className="text-xs text-rose-300 mt-1">любви к тебе</div>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap justify-center">
              {navItems.slice(1).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className="bg-white/80 hover:bg-rose-100 border border-rose-200 text-rose-500 rounded-full px-5 py-2.5 text-sm font-medium transition-all hover:scale-105 hover:shadow-md"
                >
                  {item.emoji} {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ABOUT */}
        {activeSection === "about" && (
          <div className="min-h-screen px-4 py-12 max-w-3xl mx-auto">
            <h2 className="text-5xl text-rose-400 italic text-center mb-12" style={{ fontFamily: "'Cormorant Garamond', serif" }}>О ней ✨</h2>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {[
                { emoji: "🌸", title: "Добрая душа", text: "Всегда готова помочь, выслушать и поддержать в любой момент — это её суперсила." },
                { emoji: "✨", title: "Настоящая волшебница", text: "Умеет превращать обычные моменты в незабываемые воспоминания." },
                { emoji: "💫", title: "Вечный оптимист", text: "Даже в самый серый день находит повод улыбнуться и зарядить всех вокруг." },
                { emoji: "🌷", title: "Сердце из золота", text: "Заботится о близких так, будто каждый день — последний шанс сказать «я люблю тебя»." },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-white/80 rounded-3xl p-6 border border-rose-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="text-4xl mb-3">{card.emoji}</div>
                  <h3 className="text-xl text-rose-600 font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{card.title}</h3>
                  <p className="text-rose-400 text-sm leading-relaxed">{card.text}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-rose-100 to-pink-50 rounded-3xl p-8 text-center border border-rose-200 shadow-inner">
              <div className="text-3xl text-rose-500 mb-3" style={{ fontFamily: "'Caveat', cursive" }}>Ты — это...</div>
              <p className="text-xl italic text-rose-600 leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                «...тёплый свет в окне, смех в тишине, объятия без слов. Ты — это дом, куда всегда хочется вернуться.»
              </p>
            </div>
          </div>
        )}

        {/* GALLERY */}
        {activeSection === "gallery" && (
          <div className="min-h-screen px-4 py-12 max-w-5xl mx-auto">
            <h2 className="text-5xl text-rose-400 italic text-center mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Наши моменты 📷</h2>
            <p className="text-center text-rose-400 text-xl mb-10" style={{ fontFamily: "'Caveat', cursive" }}>Каждое фото — частица нашей истории</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {PHOTOS.map((photo, i) => (
                <div
                  key={photo.id}
                  className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:scale-105"
                  onClick={() => setGalleryOpen(i)}
                >
                  <img src={photo.src} alt={photo.caption} className="w-full aspect-square object-cover" />
                  <div className="absolute inset-0 bg-rose-400/0 group-hover:bg-rose-400/30 transition-all flex items-end">
                    <div className="opacity-0 group-hover:opacity-100 transition-all p-3 w-full">
                      <p className="text-white text-lg drop-shadow" style={{ fontFamily: "'Caveat', cursive" }}>{photo.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button className="bg-rose-300 hover:bg-rose-400 text-white rounded-full px-8 py-3 font-medium transition-all hover:scale-105 shadow-md">
                + Добавить фото
              </button>
            </div>
          </div>
        )}

        {/* VIDEO */}
        {activeSection === "videos" && (
          <div className="min-h-screen px-4 py-12 max-w-4xl mx-auto">
            <h2 className="text-5xl text-rose-400 italic text-center mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Видео воспоминания 🎬</h2>
            <p className="text-center text-rose-400 text-xl mb-10" style={{ fontFamily: "'Caveat', cursive" }}>Живые моменты, которые греют душу</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {VIDEOS.map((video) => (
                <div
                  key={video.id}
                  className="bg-white/80 rounded-3xl overflow-hidden border border-rose-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
                >
                  <div className="bg-gradient-to-br from-rose-100 to-pink-100 h-44 flex items-center justify-center relative">
                    <span className="text-6xl">{video.emoji}</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <Icon name="Play" size={24} className="text-rose-400 ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-3 bg-black/40 text-white text-xs rounded px-2 py-0.5">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg text-rose-600 font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{video.title}</h3>
                    <p className="text-rose-300 text-xs mt-1">Нажми, чтобы посмотреть</p>
                  </div>
                </div>
              ))}

              <div className="bg-white/50 border-2 border-dashed border-rose-200 rounded-3xl h-64 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-rose-50 transition-all">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                  <Icon name="Plus" size={24} className="text-rose-400" />
                </div>
                <p className="text-rose-400 text-lg" style={{ fontFamily: "'Caveat', cursive" }}>Добавить видео</p>
              </div>
            </div>
          </div>
        )}

        {/* LETTERS */}
        {activeSection === "letters" && (
          <div className="min-h-screen px-4 py-12 max-w-3xl mx-auto" ref={lettersRef}>
            <h2 className="text-5xl text-rose-400 italic text-center mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Письма от друзей 💌</h2>
            <p className="text-center text-rose-400 text-xl mb-10" style={{ fontFamily: "'Caveat', cursive" }}>Слова, идущие прямо из сердца</p>

            <div className="space-y-5 mb-8">
              {LETTERS.map((letter, i) => (
                <div
                  key={i}
                  className="bg-white/80 rounded-3xl p-6 border border-rose-100 shadow-md transition-all duration-500"
                  style={{
                    opacity: visibleLetters.includes(i) ? 1 : 0,
                    transform: visibleLetters.includes(i) ? "translateY(0)" : "translateY(16px)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-xl">
                      {letter.avatar}
                    </div>
                    <div>
                      <div className="text-lg text-rose-600 font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{letter.author}</div>
                      <div className="text-xs text-rose-300">{letter.date}</div>
                    </div>
                    <div className="ml-auto">
                      <Icon name="Heart" size={20} className="text-rose-300" />
                    </div>
                  </div>
                  <p className="text-rose-500 text-lg leading-relaxed" style={{ fontFamily: "'Caveat', cursive" }}>{letter.text}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-6 border border-rose-200">
              <h3 className="text-2xl text-rose-500 mb-4 text-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Написать письмо 💕</h3>
              <div className="space-y-3">
                <input
                  className="w-full rounded-2xl border border-rose-200 bg-white/80 px-4 py-3 text-rose-600 placeholder-rose-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="Твоё имя..."
                />
                <textarea
                  rows={4}
                  className="w-full rounded-2xl border border-rose-200 bg-white/80 px-4 py-3 text-rose-600 placeholder-rose-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none"
                  placeholder="Напиши тёплые слова..."
                />
                <button className="w-full bg-rose-300 hover:bg-rose-400 text-white rounded-2xl py-3 font-medium transition-all hover:scale-[1.02] shadow-md">
                  Отправить письмо 💌
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Gallery Lightbox */}
      {galleryOpen !== null && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setGalleryOpen(null)}
        >
          <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={PHOTOS[galleryOpen].src}
              alt=""
              className="w-full rounded-3xl shadow-2xl"
            />
            <p className="text-white text-2xl text-center mt-4" style={{ fontFamily: "'Caveat', cursive" }}>{PHOTOS[galleryOpen].caption}</p>
            <button
              className="absolute -top-3 -right-3 bg-white rounded-full w-9 h-9 flex items-center justify-center shadow-lg"
              onClick={() => setGalleryOpen(null)}
            >
              <Icon name="X" size={18} className="text-rose-400" />
            </button>
            <div className="flex justify-center gap-3 mt-4">
              <button
                className="bg-white/20 hover:bg-white/40 text-white rounded-full px-5 py-2 transition-all"
                onClick={() => setGalleryOpen((galleryOpen - 1 + PHOTOS.length) % PHOTOS.length)}
              >
                ←
              </button>
              <button
                className="bg-white/20 hover:bg-white/40 text-white rounded-full px-5 py-2 transition-all"
                onClick={() => setGalleryOpen((galleryOpen + 1) % PHOTOS.length)}
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-rose-300 text-lg" style={{ fontFamily: "'Caveat', cursive" }}>
        сделано с любовью 💕
      </footer>

      <style>{`
        @keyframes floatDown {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0.4; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
