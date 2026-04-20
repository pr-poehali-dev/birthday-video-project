import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/81e1c6a6-b45c-49e8-ae6b-7cc650f72aec/files/4d1ca9f1-d3c1-47a7-bb98-d6d1ea801d4b.jpg";
const LILY_IMAGE = "https://cdn.poehali.dev/projects/81e1c6a6-b45c-49e8-ae6b-7cc650f72aec/files/402fe31a-f070-474d-b1af-8f73f2e8e72d.jpg";

const PHOTOS = [
  { id: 1, src: HERO_IMAGE, caption: "Наш лучший день ☀️" },
  { id: 2, src: HERO_IMAGE, caption: "Помним всё 💛" },
  { id: 3, src: HERO_IMAGE, caption: "Смех до слёз 😂" },
  { id: 4, src: HERO_IMAGE, caption: "Лето навсегда 🌸" },
  { id: 5, src: HERO_IMAGE, caption: "Наши моменты ✨" },
  { id: 6, src: HERO_IMAGE, caption: "Лучшие годы 💙" },
];

const LETTERS = [
  {
    author: "Маша",
    date: "20 апреля 2026",
    avatar: "🌼",
    text: "Дорогая, ты — моё солнышко в пасмурные дни. Столько лет вместе, и каждый раз ты умеешь удивлять. Спасибо за то, что всегда рядом, за твой смех и теплоту. Люблю тебя безгранично!",
  },
  {
    author: "Аня",
    date: "19 апреля 2026",
    avatar: "💐",
    text: "Ты — человек, который делает жизнь ярче просто своим присутствием. Помню наши первые встречи и не могу поверить, как далеко мы зашли. Ты лучшая подруга, о которой можно мечтать.",
  },
  {
    author: "Катя",
    date: "18 апреля 2026",
    avatar: "🌷",
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
  symbol: i % 3 === 0 ? "🌼" : i % 3 === 1 ? "✨" : "💛",
  left: `${(i * 5.5 + 3) % 100}%`,
  delay: `${(i * 0.4) % 6}s`,
  duration: `${5 + (i % 4)}s`,
  size: i % 2 === 0 ? "text-lg" : "text-sm",
}));

type Section = "hero" | "about" | "gallery" | "videos" | "letters";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  const [visibleLetters, setVisibleLetters] = useState<number[]>([]);
  const lettersRef = useRef<HTMLDivElement>(null);

  const friendshipMonths = 10;
  const friendshipDays = Math.round(10 * 30.44);

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
    { id: "about", label: "О ней", emoji: "💛" },
    { id: "gallery", label: "Галерея", emoji: "📷" },
    { id: "videos", label: "Видео", emoji: "🎬" },
    { id: "letters", label: "Письма", emoji: "💌" },
  ];

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background: "linear-gradient(135deg, #fffde7 0%, #e8f4fd 50%, #fffde7 100%)",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {/* Lily decoration corners */}
      <div
        className="fixed top-0 right-0 w-64 h-64 opacity-20 pointer-events-none z-0"
        style={{ backgroundImage: `url(${LILY_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div
        className="fixed bottom-0 left-0 w-48 h-48 opacity-15 pointer-events-none z-0"
        style={{ backgroundImage: `url(${LILY_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center", transform: "scaleX(-1) rotate(20deg)" }}
      />

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className={`absolute ${p.size} opacity-50`}
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
      <nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b shadow-sm"
        style={{ background: "rgba(255,253,231,0.75)", borderColor: "#b3d9f0" }}
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <span
            className="text-xl italic font-light tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7aaccc" }}
          >
            моя лучшая ✦
          </span>
          <div className="flex gap-1 sm:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className="px-2 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300"
                style={
                  activeSection === item.id
                    ? { background: "#a8d5e2", color: "#fff", boxShadow: "0 2px 8px #a8d5e244", transform: "scale(1.05)" }
                    : { color: "#7aaccc" }
                }
              >
                <span className="sm:hidden">{item.emoji}</span>
                <span className="hidden sm:inline">{item.emoji} {item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="pt-16 relative z-10">

        {/* HERO */}
        {activeSection === "hero" && (
          <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
            <div className="mb-2 opacity-60">
              <img src={LILY_IMAGE} alt="" className="w-48 h-24 object-cover rounded-full mx-auto" style={{ objectPosition: "center top" }} />
            </div>

            <div className="relative mb-6">
              <div
                className="w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden mx-auto shadow-2xl"
                style={{ border: "4px solid #a8d5e2" }}
              >
                <img src={HERO_IMAGE} alt="Подруга" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-3 -right-3 text-4xl animate-bounce">🌼</div>
              <div className="absolute -bottom-3 -left-3 text-3xl animate-bounce" style={{ animationDelay: "0.5s" }}>💛</div>
              <div className="absolute top-1/2 -right-8 text-2xl animate-pulse">✨</div>
            </div>

            <h1
              className="text-5xl sm:text-7xl italic font-light mb-2 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7aaccc" }}
            >
              Моей лучшей
            </h1>
            <h2
              className="text-4xl sm:text-6xl font-semibold mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#e6b84a" }}
            >
              подруге на свете
            </h2>
            <p className="text-xl sm:text-2xl mb-10 max-w-md" style={{ fontFamily: "'Caveat', cursive", color: "#9abfd6" }}>
              Этот сайт создан с любовью и теплом для тебя 🌸
            </p>

            <div className="flex gap-4 mb-12 flex-wrap justify-center">
              <div
                className="text-center rounded-2xl px-6 py-4 shadow-md"
                style={{ background: "rgba(255,255,255,0.75)", border: "1px solid #b3d9f0" }}
              >
                <div className="text-4xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#e6b84a" }}>
                  {friendshipMonths}
                </div>
                <div className="text-xs mt-1" style={{ color: "#9abfd6" }}>месяцев дружбы</div>
              </div>
              <div
                className="text-center rounded-2xl px-6 py-4 shadow-md"
                style={{ background: "rgba(255,255,255,0.75)", border: "1px solid #b3d9f0" }}
              >
                <div className="text-4xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#a8d5e2" }}>
                  {friendshipDays}
                </div>
                <div className="text-xs mt-1" style={{ color: "#9abfd6" }}>дней вместе</div>
              </div>
              <div
                className="text-center rounded-2xl px-6 py-4 shadow-md"
                style={{ background: "rgba(255,255,255,0.75)", border: "1px solid #b3d9f0" }}
              >
                <div className="text-4xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#e6b84a" }}>∞</div>
                <div className="text-xs mt-1" style={{ color: "#9abfd6" }}>любви к тебе</div>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap justify-center">
              {navItems.slice(1).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className="rounded-full px-5 py-2.5 text-sm font-medium transition-all hover:scale-105 hover:shadow-md"
                  style={{ background: "rgba(255,255,255,0.8)", border: "1px solid #a8d5e2", color: "#7aaccc" }}
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
            <div className="flex justify-center mb-4">
              <img src={LILY_IMAGE} alt="лилии" className="w-40 h-20 object-cover rounded-2xl opacity-70" />
            </div>
            <h2
              className="text-5xl italic text-center mb-12"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7aaccc" }}
            >
              О ней ✨
            </h2>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {[
                {
                  emoji: "🌼",
                  title: "Безграничная доброта",
                  text: "Она из тех редких людей, у которых доброта живёт в каждом взгляде и жесте. Никогда не откажет в помощи, всегда найдёт тёплые слова и поддержит в самый нужный момент. Рядом с ней становится легче дышать.",
                },
                {
                  emoji: "💫",
                  title: "Настоящая красавица",
                  text: "Красота — это не только внешность, но и то, как она светится изнутри. Её улыбка способна осветить любую комнату, а грация и изящество восхищают всех, кто её знает.",
                },
                {
                  emoji: "🤍",
                  title: "Дружелюбие как суперсила",
                  text: "С ней легко и тепло абсолютно всем. Она умеет быть рядом — тихо и ненавязчиво, или весело и задорно — именно тогда, когда это нужно. Её дружелюбие — настоящий подарок.",
                },
                {
                  emoji: "🌸",
                  title: "Свет в нашей жизни",
                  text: "Она делает мир вокруг себя добрее и ярче. Её присутствие — это как весенний день: тепло, свежо и хочется улыбаться без повода.",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="rounded-3xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
                  style={{ background: "rgba(255,255,255,0.80)", border: "1px solid #b3d9f0" }}
                >
                  <div className="text-4xl mb-3">{card.emoji}</div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "#e6b84a" }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#7aaccc" }}>{card.text}</p>
                </div>
              ))}
            </div>

            <div
              className="rounded-3xl p-8 text-center shadow-inner"
              style={{ background: "linear-gradient(135deg, #fffde7, #e8f4fd)", border: "1px solid #b3d9f0" }}
            >
              <div className="text-3xl mb-3" style={{ fontFamily: "'Caveat', cursive", color: "#e6b84a" }}>Ты — это...</div>
              <p
                className="text-xl italic leading-relaxed"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7aaccc" }}
              >
                «...тёплый свет в окне, цветок лилии под дождём, смех в тишине. Ты — это дом, куда всегда хочется вернуться.»
              </p>
            </div>
          </div>
        )}

        {/* GALLERY */}
        {activeSection === "gallery" && (
          <div className="min-h-screen px-4 py-12 max-w-5xl mx-auto">
            <h2
              className="text-5xl italic text-center mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7aaccc" }}
            >
              Наши моменты 📷
            </h2>
            <p className="text-center text-xl mb-10" style={{ fontFamily: "'Caveat', cursive", color: "#b8d9a0" }}>
              Каждое фото — частица нашей истории
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {PHOTOS.map((photo, i) => (
                <div
                  key={photo.id}
                  className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:scale-105"
                  onClick={() => setGalleryOpen(i)}
                >
                  <img src={photo.src} alt={photo.caption} className="w-full aspect-square object-cover" />
                  <div className="absolute inset-0 transition-all flex items-end group-hover:bg-sky-200/30">
                    <div className="opacity-0 group-hover:opacity-100 transition-all p-3 w-full">
                      <p className="text-white text-lg drop-shadow" style={{ fontFamily: "'Caveat', cursive" }}>{photo.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                className="rounded-full px-8 py-3 font-medium transition-all hover:scale-105 shadow-md text-white"
                style={{ background: "#a8d5e2" }}
              >
                + Добавить фото
              </button>
            </div>
          </div>
        )}

        {/* VIDEO */}
        {activeSection === "videos" && (
          <div className="min-h-screen px-4 py-12 max-w-4xl mx-auto">
            <h2
              className="text-5xl italic text-center mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7aaccc" }}
            >
              Видео воспоминания 🎬
            </h2>
            <p className="text-center text-xl mb-10" style={{ fontFamily: "'Caveat', cursive", color: "#e6b84a" }}>
              Живые моменты, которые греют душу
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {VIDEOS.map((video) => (
                <div
                  key={video.id}
                  className="rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.80)", border: "1px solid #b3d9f0" }}
                >
                  <div
                    className="h-44 flex items-center justify-center relative"
                    style={{ background: "linear-gradient(135deg, #fffde7, #e8f4fd)" }}
                  >
                    <span className="text-6xl">{video.emoji}</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                        style={{ background: "rgba(255,255,255,0.85)" }}
                      >
                        <Icon name="Play" size={24} className="ml-1" style={{ color: "#a8d5e2" }} />
                      </div>
                    </div>
                    <div
                      className="absolute bottom-2 right-3 text-white text-xs rounded px-2 py-0.5"
                      style={{ background: "rgba(0,0,0,0.35)" }}
                    >
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3
                      className="text-lg font-semibold"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7aaccc" }}
                    >
                      {video.title}
                    </h3>
                    <p className="text-xs mt-1" style={{ color: "#b3d9f0" }}>Нажми, чтобы посмотреть</p>
                  </div>
                </div>
              ))}

              <div
                className="border-2 border-dashed rounded-3xl h-64 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:opacity-80"
                style={{ borderColor: "#a8d5e2", background: "rgba(255,255,255,0.4)" }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "#e8f4fd" }}>
                  <Icon name="Plus" size={24} style={{ color: "#a8d5e2" }} />
                </div>
                <p className="text-lg" style={{ fontFamily: "'Caveat', cursive", color: "#a8d5e2" }}>Добавить видео</p>
              </div>
            </div>
          </div>
        )}

        {/* LETTERS */}
        {activeSection === "letters" && (
          <div className="min-h-screen px-4 py-12 max-w-3xl mx-auto" ref={lettersRef}>
            <div className="flex justify-center mb-4">
              <img src={LILY_IMAGE} alt="лилии" className="w-40 h-20 object-cover rounded-2xl opacity-60" />
            </div>
            <h2
              className="text-5xl italic text-center mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7aaccc" }}
            >
              Письма от друзей 💌
            </h2>
            <p className="text-center text-xl mb-10" style={{ fontFamily: "'Caveat', cursive", color: "#e6b84a" }}>
              Слова, идущие прямо из сердца
            </p>

            <div className="space-y-5 mb-8">
              {LETTERS.map((letter, i) => (
                <div
                  key={i}
                  className="rounded-3xl p-6 shadow-md transition-all duration-500"
                  style={{
                    background: "rgba(255,255,255,0.82)",
                    border: "1px solid #b3d9f0",
                    opacity: visibleLetters.includes(i) ? 1 : 0,
                    transform: visibleLetters.includes(i) ? "translateY(0)" : "translateY(16px)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                      style={{ background: "#fffde7" }}
                    >
                      {letter.avatar}
                    </div>
                    <div>
                      <div
                        className="text-lg font-semibold"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#e6b84a" }}
                      >
                        {letter.author}
                      </div>
                      <div className="text-xs" style={{ color: "#b3d9f0" }}>{letter.date}</div>
                    </div>
                    <div className="ml-auto">
                      <Icon name="Heart" size={20} style={{ color: "#a8d5e2" }} />
                    </div>
                  </div>
                  <p className="text-lg leading-relaxed" style={{ fontFamily: "'Caveat', cursive", color: "#7aaccc" }}>
                    {letter.text}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="rounded-3xl p-6"
              style={{ background: "linear-gradient(135deg, #fffde7, #e8f4fd)", border: "1px solid #b3d9f0" }}
            >
              <h3
                className="text-2xl text-center mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7aaccc" }}
              >
                Написать письмо 💛
              </h3>
              <div className="space-y-3">
                <input
                  className="w-full rounded-2xl px-4 py-3 text-sm focus:outline-none"
                  style={{
                    border: "1px solid #b3d9f0",
                    background: "rgba(255,255,255,0.85)",
                    color: "#7aaccc",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                  placeholder="Твоё имя..."
                />
                <textarea
                  rows={4}
                  className="w-full rounded-2xl px-4 py-3 text-sm focus:outline-none resize-none"
                  style={{
                    border: "1px solid #b3d9f0",
                    background: "rgba(255,255,255,0.85)",
                    color: "#7aaccc",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                  placeholder="Напиши тёплые слова..."
                />
                <button
                  className="w-full rounded-2xl py-3 font-medium transition-all hover:scale-[1.02] shadow-md text-white"
                  style={{ background: "#a8d5e2" }}
                >
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.65)" }}
          onClick={() => setGalleryOpen(null)}
        >
          <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={PHOTOS[galleryOpen].src} alt="" className="w-full rounded-3xl shadow-2xl" />
            <p className="text-white text-2xl text-center mt-4" style={{ fontFamily: "'Caveat', cursive" }}>
              {PHOTOS[galleryOpen].caption}
            </p>
            <button
              className="absolute -top-3 -right-3 bg-white rounded-full w-9 h-9 flex items-center justify-center shadow-lg"
              onClick={() => setGalleryOpen(null)}
            >
              <Icon name="X" size={18} style={{ color: "#a8d5e2" }} />
            </button>
            <div className="flex justify-center gap-3 mt-4">
              <button
                className="text-white rounded-full px-5 py-2 transition-all hover:opacity-80"
                style={{ background: "rgba(255,255,255,0.2)" }}
                onClick={() => setGalleryOpen((galleryOpen - 1 + PHOTOS.length) % PHOTOS.length)}
              >
                ←
              </button>
              <button
                className="text-white rounded-full px-5 py-2 transition-all hover:opacity-80"
                style={{ background: "rgba(255,255,255,0.2)" }}
                onClick={() => setGalleryOpen((galleryOpen + 1) % PHOTOS.length)}
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}

      <footer
        className="relative z-10 text-center py-8 text-lg"
        style={{ fontFamily: "'Caveat', cursive", color: "#b3d9f0" }}
      >
        сделано с любовью 💛
      </footer>

      <style>{`
        @keyframes floatDown {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0.5; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
