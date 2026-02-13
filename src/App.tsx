import { useState, useEffect, useRef } from "react";
import { Heart, Music } from "lucide-react";

// Falling petals component
const FallingPetals = () => {
  const [petals, setPetals] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 6,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-petal-fall"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
          }}
        >
          <Heart
            size={12 + Math.random() * 16}
            className="text-pink-medium/30"
            fill="currentColor"
          />
        </div>
      ))}
    </div>
  );
};

// Hero Section with Envelope
const HeroSection = ({ onOpen }: { onOpen: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-soft via-white to-pink-soft/50">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <Heart
          size={300}
          className="absolute -top-20 -right-20 text-pink-soft/50 animate-heartbeat"
          fill="currentColor"
        />
        <Heart
          size={200}
          className="absolute -bottom-10 -left-10 text-pink-medium/30 animate-pulse-heart"
          fill="currentColor"
          style={{ animationDelay: '0.5s' }}
        />
        <Heart
          size={100}
          className="absolute top-1/4 left-10 text-pink-accent/20 animate-float"
          fill="currentColor"
        />
        <Heart
          size={80}
          className="absolute bottom-1/4 right-20 text-pink-medium/25 animate-float-reverse"
          fill="currentColor"
        />
      </div>

      {/* Envelope */}
      <div
        className={`relative z-20 cursor-pointer transition-all duration-700 ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onOpen}
      >
        <div
          className={`relative w-72 h-48 md:w-96 md:h-56 bg-white rounded-lg shadow-glow transition-all duration-500 ${
            isHovered ? 'shadow-2xl' : ''
          }`}
          style={{
            transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
          }}
        >
          {/* Envelope body */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-soft to-pink-medium/30 rounded-lg overflow-hidden">
            {/* Envelope pattern */}
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 20 }).map((_, i) => (
                <Heart
                  key={i}
                  size={20 + Math.random() * 30}
                  className="absolute text-pink-dark"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  fill="currentColor"
                />
              ))}
            </div>
          </div>

          {/* Envelope flap */}
          <div
            className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-pink-medium/40 to-pink-soft/60"
            style={{
              clipPath: 'polygon(0 0, 50% 60%, 100% 0)',
            }}
          />

          {/* Bottom flaps */}
          <div
            className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-pink-soft/70"
            style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }}
          />
          <div
            className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-pink-soft/70"
            style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
          />

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-center">
              <p className="font-display text-2xl md:text-3xl text-love-dark mb-2">To: Aca</p>
              <div
                className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white rounded-full shadow-lg transition-all duration-500 ${
                  isHovered ? 'scale-110 animate-pulse-heart' : ''
                }`}
              >
                <Heart size={32} className="text-pink-accent" fill="currentColor" />
              </div>
              <p className="font-body text-sm md:text-base text-love-light mt-3">From: Erik</p>
              <p className="font-body text-xs text-love-light/60 mt-4 flex items-center gap-1">
                Tekan Ajaa Sayangkuuuuuuuu......
              </p>
            </div>
          </div>
        </div>

        {/* Shadow */}
        <div
          className={`absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-4 bg-black/10 rounded-full blur-xl transition-all duration-500 ${
            isHovered ? 'scale-110 opacity-60' : 'scale-100 opacity-40'
          }`}
        />
      </div>
    </section>
  );
};

// Love Letter Section
const LetterSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative py-20 px-4 md:px-8"
      style={{
        // backgroundImage: 'url(/valentine-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-pink-soft/60 to-white/80" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Letter card */}
        <div
          className={`glass rounded-3xl p-8 md:p-16 shadow-soft transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div
              className={`inline-flex items-center gap-2 mb-4 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              <Heart size={24} className="text-pink-accent" fill="currentColor" />
              <Heart size={32} className="text-pink-accent animate-pulse-heart" fill="currentColor" />
              <Heart size={24} className="text-pink-accent" fill="currentColor" />
            </div>
            <h1
              className={`font-display text-4xl md:text-6xl text-love-dark mb-2 transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              Happy Valentine, Aca!
            </h1>
            <p
              className={`font-body text-pink-accent transition-all duration-700 delay-700 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              🌸
            </p>
          </div>

          {/* Letter content */}
          <div className="space-y-6 text-love-dark">
            <p
              className={`font-body text-lg md:text-xl leading-relaxed transition-all duration-700 delay-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
              }`}
            >
              Gaa terasa ya sayang, udah jalan dari{' '}
              <span className="font-semibold text-pink-accent">7 September 2025</span> sampe hari ini <span className="font-semibold text-pink-accent"> 14 Februari 2026. </span>
               Sumpah, makasih banget udah hadir dan bikin hari-hari aku yang tadinya biasa aja jadi lebih
              berwarna <span className="text-pink-accent">(sewarna soft pink kesukaan kamu wkwk)</span>.
            </p>

            <p
              className={`font-body text-lg md:text-xl leading-relaxed transition-all duration-700 delay-900 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
              }`}
            >
              Jujur, beberapa bulan ke depan bakal jadi tantangan baru buat kita ya. Kamu happy-happy di{' '}
              <span className="font-semibold text-pink-accent">Balikpapan</span> sama Papa Mama kamu yaaa sayangggg. Bakal
              kangen lebih berat sih pastinya. Keinget kita di <span className="font-semibold text-pink-accent">Bandung</span>, kangen cerewetnya kamu, kangen randomnya kita kalo lagi{' '}
              <span className="italic">hunting makan</span>, atau sekadar ngobrolin hal gak jelas.
            </p>

            <p
              className={`font-body text-lg md:text-xl leading-relaxed transition-all duration-700 delay-1100 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
              }`}
            >
              Tapi aku seneng kamu bisa pulang, manfaatin waktu istirahat kamu di sana ya, Sayang. Puas-puasin
              manja sama orang rumah.
            </p>

            <p
              className={`font-body text-lg md:text-xl leading-relaxed transition-all duration-700 delay-1300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
              }`}
            >
              Aku cuma mau bilang, jarak <span className="font-semibold">Jakarta - Balikpapan</span> tuh cuma
              angka di maps doang kok.{' '}
              <span className="font-display text-2xl text-pink-accent italic">
                Hati aku tetep stay buat kamu.
              </span>
            </p>

            <p
              className={`font-body text-lg md:text-xl leading-relaxed transition-all duration-700 delay-1500 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
              }`}
            >
              Nanti pas kamu udah balik ke Jakarta
              kita bayar lunas semua kangennya ya sayang. Kita cari makan enak lagi, entah itu{' '}
              <span className="italic">mie ayam mirip Pak Kawit</span> atau apapun yang kamu mau nanti.
            </p>

            <p
              className={`font-body text-lg md:text-xl leading-relaxed transition-all duration-700 delay-1700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
              }`}
            >
              Take care ya di sana. Jangan lupa kabarin aku terus.{' '}
              <span className="font-display text-2xl text-pink-accent">
                I'll be right here, supporting you from afar.
              </span>
            </p>
          </div>

          {/* Signature */}
          <div
            className={`mt-12 text-right transition-all duration-700 delay-1900 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <p className="font-display text-3xl text-love-dark italic">Love,</p>
            <p className="font-display text-4xl text-pink-accent mt-2">Erik</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Journey Section
// const JourneySection = () => {
//   const sectionRef = useRef<HTMLElement>(null);
//   const [isVisible, setIsVisible] = useState(false);
//   const [pathProgress, setPathProgress] = useState(0);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           // Animate path progress
//           let progress = 0;
//           const interval = setInterval(() => {
//             progress += 2;
//             setPathProgress(progress);
//             if (progress >= 100) clearInterval(interval);
//           }, 30);
//         }
//       },
//       { threshold: 0.3 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   const stats = [
//     { icon: MapPin, label: 'Jarak', value: '1,200 km', delay: 'delay-300' },
//     { icon: Calendar, label: 'Waktu', value: '3 Bulan', delay: 'delay-500' },
//     { icon: Infinity, label: 'Cinta', value: '∞', delay: 'delay-700' },
//   ];

//   return (
//     <section
//       ref={sectionRef}
//       className="min-h-screen relative py-20 px-4 md:px-8 bg-gradient-to-b from-white via-pink-soft/30 to-pink-soft/50 overflow-hidden"
//     >
//       {/* Background heart */}
//       <Heart
//         size={500}
//         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-soft/30 animate-heartbeat"
//         fill="currentColor"
//       />

//       <div className="relative z-10 max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h2
//             className={`font-display text-4xl md:text-6xl text-love-dark mb-4 transition-all duration-700 ${
//               isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//             }`}
//           >
//             Jarak Jakarta - Balikpapan
//           </h2>
//           <p
//             className={`font-body text-xl md:text-2xl text-love-light italic transition-all duration-700 delay-300 ${
//               isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//             }`}
//           >
//             "Cuma angka di maps doang kok. Hati aku tetep stay buat kamu."
//           </p>
//         </div>

//         {/* Map visualization */}
//         <div
//           className={`relative mb-16 transition-all duration-1000 delay-500 ${
//             isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
//           }`}
//         >
//           <div className="glass rounded-3xl p-8 md:p-12 shadow-soft">
//             {/* SVG Map */}
//             <svg viewBox="0 0 800 300" className="w-full h-auto">
//               {/* Path line */}
//               <path
//                 d="M 100 200 Q 250 100 400 150 T 700 120"
//                 className="connection-line"
//                 strokeDasharray="1000"
//                 strokeDashoffset={1000 - (pathProgress / 100) * 1000}
//                 style={{ transition: 'stroke-dashoffset 0.1s linear' }}
//               />

//               {/* Jakarta point */}
//               <g transform="translate(100, 200)">
//                 <circle r="12" className="fill-pink-accent" />
//                 <circle r="20" className="fill-pink-accent/30 animate-pulse-heart" />
//                 <text y="35" textAnchor="middle" className="fill-love-dark font-body text-sm font-semibold">
//                   Jakarta
//                 </text>
//               </g>

//               {/* Balikpapan point */}
//               <g transform="translate(700, 120)">
//                 <circle r="12" className="fill-pink-accent" />
//                 <circle r="20" className="fill-pink-accent/30 animate-pulse-heart" style={{ animationDelay: '0.5s' }} />
//                 <text y="35" textAnchor="middle" className="fill-love-dark font-body text-sm font-semibold">
//                   Balikpapan
//                 </text>
//               </g>

//               {/* Paper plane */}
//               <g
//                 transform={`translate(${100 + (pathProgress / 100) * 600}, ${200 - (pathProgress / 100) * 80}) rotate(-15)`}
//                 style={{ transition: 'transform 0.1s linear' }}
//               >
//                 <polygon points="0,-10 15,0 0,10 -15,0" className="fill-white stroke-pink-accent stroke-2" />
//                 <polygon points="0,-10 5,0 0,0" className="fill-pink-soft" />
//               </g>
//             </svg>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
//           {stats.map((stat, index) => (
//             <div
//               key={index}
//               className={`glass rounded-2xl p-8 text-center hover-lift transition-all duration-700 ${stat.delay} ${
//                 isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//               }`}
//             >
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-soft rounded-full mb-4">
//                 <stat.icon size={28} className="text-pink-accent" />
//               </div>
//               <p className="stat-number">{stat.value}</p>
//               <p className="font-body text-love-light mt-2">{stat.label}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// Photo Gallery Section
const GallerySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const photos = [
    { src: '/couple-1.jpg', caption: 'Siap-siap Mau Sepedaan di TMII', rotation: -3 },
    { src: '/couple-2.jpg', caption: 'Nemu Photobooth Lucu Banget', rotation: 2 },
    { src: '/couple-5.jpg', caption: 'Pulang dari Jatinangor', rotation: -2 },
    { src: '/couple-4.jpg', caption: 'Katedral Bandung', rotation: 3 },
    { src: '/couple-6.jpg', caption: 'Ini di Ciwalk', rotation: -1 },
    { src: '/couple-3.jpg', caption: 'Gaya Foto Wishlist Kita', rotation: 2 },
  ];

return (
  <section
    ref={sectionRef}
    className="min-h-screen relative py-20 px-4 md:px-8 bg-gradient-to-b from-pink-soft/50 via-white to-pink-soft/30"
  >
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h2
          className={`font-display text-4xl md:text-6xl text-love-dark mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Our Memories
        </h2>
        <p
          className={`font-body text-lg text-love-light transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Kangen Bangett Woiiii Sayanggggggg............
        </p>
      </div>

      {/* Masonry Gallery */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {photos.map((photo, index) => (
          <div
            key={index}
            className={`polaroid break-inside-avoid transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{
              transform: `rotate(${photo.rotation}deg)`,
              transitionDelay: `${index * 150}ms`,
            }}
          >
            <div className="relative overflow-hidden">
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <p className="font-display text-lg text-love-dark text-center mt-4 italic">
              {photo.caption}
            </p>
          </div>
        ))}
      </div>

      {/* VIDEO BUTTON CARD */}
      <div className="mt-16 w-full flex justify-center">
        <div className="w-full max-w-4xl px-4">
          <div className="glass rounded-3xl p-10 shadow-soft text-center">
            <h3 className="font-display text-3xl md:text-4xl text-love-dark mb-3">
              Ada Video Kita Juga 💕
            </h3>

            <p className="font-body text-love-light mb-8 text-base md:text-lg">
              Klik ya sayang. Jangan lupa senyum pas nonton wkwk.
            </p>

            <a
              href="https://youtube.com/shorts/8JxCTzAnlqc?feature=share"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic animate-wiggle inline-flex items-center gap-3 px-8 py-4 bg-pink-accent text-white rounded-full font-body text-lg font-semibold shadow-lg hover:shadow-xl hover:bg-pink-dark transition-all duration-500 delay-700"
            >
              🎬 Buka Video
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);
};


// Closing Section
const ClosingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative flex items-center justify-center py-15 px-4 md:px-8 bg-gradient-to-b from-pink-soft/30 via-pink-soft/60 to-pink-soft overflow-hidden"
    >
      {/* Background heartbeat heart */}
      <Heart
        size={600}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-medium/20 animate-heartbeat"
        fill="currentColor"
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div
          className={`glass rounded-3xl p-12 md:p-16 shadow-glow transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Hearts decoration */}
          <div className="flex justify-center gap-4 mb-8">
            <Heart size={32} className="text-pink-medium animate-float" fill="currentColor" />
            <Heart size={48} className="text-pink-accent animate-pulse-heart" fill="currentColor" />
            <Heart size={32} className="text-pink-medium animate-float-reverse" fill="currentColor" />
          </div>

          <h2
            className={`font-display text-5xl md:text-7xl text-love-dark mb-4 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            LOVEEEEE UUUUUUUU
          </h2>

          <p
            className={`font-body text-xl md:text-2xl text-love-light mb-10 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Kangen Aca Selamanyaaaaaaa....
          </p>

          {/* Spotify button */}
         <a
            href="https://open.spotify.com/playlist/36a0QOyTLfHNXhyLJ46XnW?si=hSIOeghuTjyIsrrYUi8zNQ&pi=1MVoJ6MYT96ZA"
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-magnetic animate-wiggle inline-flex items-center gap-3 px-8 py-4 bg-pink-accent text-white rounded-full font-body text-lg font-semibold shadow-lg hover:shadow-xl hover:bg-pink-dark transition-all duration-500 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Coba Liat Hehe
          </a>

         {/* Hidden reply message
          {showReply && (
            <div className="mt-8 p-6 bg-white/80 rounded-2xl animate-fade-in-up">
              <p className="font-body text-love-dark">
                Aww, terima kasih sayang! 💕
              </p>
              <p className="font-display text-2xl text-pink-accent mt-2">
                Love you too, Erik!
              </p>
            </div>
          )} */}

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-pink-medium/30">
            <p className="font-body text-sm text-love-light/60">
              Made with{' '}
              <Heart size={14} className="inline text-pink-accent" fill="currentColor" /> for Aca dari Si Ndut
            </p>
            <p className="font-display text-lg text-love-dark mt-2">
              Happy Valentine's Day 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Music Player Component
const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying]);


  return (
    <>
      {/* Audio */}
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      {/* Button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isPlaying
            ? "bg-pink-accent animate-pulse-heart"
            : "bg-white hover:bg-pink-soft"
        }`}
      >
        <Music
          size={24}
          className={isPlaying ? "text-white" : "text-pink-accent"}
        />
      </button>
    </>
  );
};

// Main App
function App() {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    setIsOpened(true);
    // Smooth scroll to letter section
    setTimeout(() => {
      document.getElementById('letter-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  return (
    <div className="relative">
      {/* Falling petals */}
      <FallingPetals />

      {/* Hero Section */}
      {!isOpened && <HeroSection onOpen={handleOpen} />}

      {/* Main Content */}
      <div id="letter-section">
        <LetterSection />
      </div>
      <GallerySection />
      <ClosingSection />

      {/* Music Player */}
      <MusicPlayer />
    </div>
  );
}

export default App;