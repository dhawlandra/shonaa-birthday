import { useEffect, useState } from "react";

import shonaa1 from "./assets/shona1.jpeg";
import shonaa2 from "./assets/shona4.jpeg";

import pic1 from "./assets/pic1.jpeg";
import pic2 from "./assets/pic2.jpeg";
import pic3 from "./assets/pic3.jpeg";
import pic4 from "./assets/pic4.jpeg";
import pic5 from "./assets/pic5.jpeg";
import pic6 from "./assets/pic6.jpeg";
import pic7 from "./assets/pic7.jpeg";
import pic8 from "./assets/pic8.jpeg";
import pic9 from "./assets/pic9.jpeg";
import pic10 from "./assets/pic10.jpeg";

export default function App() {
  const [openHeart, setOpenHeart] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showLoveGame, setShowLoveGame] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  const [showCatchGame, setShowCatchGame] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showSlider, setShowSlider] = useState(false);
  const [showProposal, setShowProposal] = useState(false);

  const [heartScore, setHeartScore] = useState(0);

  const [noPosition, setNoPosition] = useState({
    top: 50,
    left: 50,
  });

  const [lovePercent, setLovePercent] = useState(0);

  const memories = [
    pic1,
    pic2,
    pic3,
    pic4,
    pic5,
    pic6,
    pic7,
    pic8,
    pic9,
    pic10,
  ];

  useEffect(() => {
    let interval;

    if (showFinal) {
      interval = setInterval(() => {
        setLovePercent((prev) => {
          if (prev >= 999999) return prev;
          return prev + 22222;
        });
      }, 40);
    }

    return () => clearInterval(interval);
  }, [showFinal]);

 const emojis = ["😒", "😭", "🏃", "😂", "🚫", "😈"];

const [noEmoji, setNoEmoji] = useState("😒");

const moveNoButton = () => {
  navigator.vibrate?.(100);
  setNoPosition({
    top: Math.random() * 75,
    left: Math.random() * 75,
  });

  setNoEmoji(
    emojis[Math.floor(Math.random() * emojis.length)]
  );
};

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/40 via-black to-red-900/40 animate-pulse"></div>

      {/* Hearts */}
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="absolute text-pink-500 animate-bounce opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 30 + 15}px`,
            animationDuration: `${Math.random() * 5 + 3}s`,
          }}
        >
          ❤️
        </div>
      ))}

      {/* HERO */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-6">

        <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent animate-pulse">
          Happy Birthday
        </h1>

        <h2 className="text-5xl md:text-7xl font-black text-pink-300 mt-6 animate-bounce">
          SHONAA 💖
        </h2>

        <img
          src={shonaa1}
          alt=""
          className="w-80 h-80 rounded-full object-cover border-[6px] border-pink-400 shadow-[0_0_60px_rgba(255,0,120,0.9)] mt-10 hover:scale-110 transition-all duration-700"
        />

        <p className="mt-10 max-w-3xl text-lg md:text-2xl text-gray-300 leading-relaxed">
          You are the most beautiful thing that ever happened in my life ❤️
        </p>

        <button
          onClick={() => setOpenHeart(true)}
          className="mt-10 px-10 py-4 rounded-full text-xl font-bold bg-gradient-to-r from-pink-500 to-red-500 hover:scale-110 transition-all duration-500 shadow-[0_0_50px_rgba(255,0,120,0.9)]"
        >
          Open My Heart 💌
        </button>
      </section>

      {/* HEART POPUP */}
      {openHeart && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-6">

          <div className="bg-white/10 backdrop-blur-xl border border-pink-500/30 rounded-[40px] p-10 max-w-2xl text-center">

            <h2 className="text-5xl font-black text-pink-400 mb-8">
              My Heart For You ❤️
            </h2>

            <img
              src={shonaa2}
              alt=""
              className="w-80 h-80 object-cover rounded-full border-[6px] border-pink-400 shadow-[0_0_60px_rgba(255,0,120,0.9)] mx-auto mb-8"
            />

            <p className="text-xl text-gray-200 leading-loose">
              Every heartbeat of mine whispers your name ❤️
            </p>

            <button
              onClick={() => setShowGallery(true)}
              className="mt-10 px-10 py-4 rounded-full text-xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 animate-bounce hover:scale-110 transition-all"
            >
              Our Beautiful Memories ✨📸
            </button>
          </div>
        </div>
      )}

      {/* GALLERY */}
      {showGallery && (
        <div className="fixed inset-0 z-[100] bg-black overflow-y-auto">

          <div className="text-center pt-14">
            <h1 className="text-5xl md:text-7xl font-black text-pink-400 animate-pulse">
              Our Beautiful Memories ❤️
            </h1>
          </div>

          <div className="max-w-7xl mx-auto py-20 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 place-items-center">

            {memories.map((img, index) => (
              <div
                key={index}
                className="animate-float hover:scale-110 transition-all duration-500"
                style={{
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                <img
                  src={img}
                  alt=""
                  className="w-72 h-72 object-cover rounded-[30px] border-4 border-pink-500 shadow-[0_0_40px_rgba(255,0,120,0.8)]"
                />
              </div>
            ))}
          </div>

          <div className="text-center pb-20">
            <button
              onClick={() => setShowLoveGame(true)}
              className="px-12 py-5 rounded-full text-2xl font-black bg-gradient-to-r from-pink-500 to-red-500 animate-pulse hover:scale-110 transition-all"
            >
              Final Love Question ❤️
            </button>
          </div>
        </div>
      )}

      {/* LOVE GAME */}
      {showLoveGame && (
        <div className="fixed inset-0 z-[200] bg-black flex flex-col justify-center items-center text-center overflow-hidden">

          <h1 className="text-4xl md:text-7xl font-black text-pink-400 mb-16">
            Will You Stay With Me Forever? ❤️
          </h1>

          <button
            onClick={() => setShowFinal(true)}
            className="px-16 py-6 rounded-full text-3xl font-black bg-green-500 hover:scale-125 transition-all duration-500 shadow-[0_0_50px_rgba(0,255,100,0.9)]"
          >
            YESSS 😍
          </button>

         <button
  onMouseEnter={moveNoButton}
  onClick={moveNoButton}
  onTouchStart={moveNoButton}
  style={{
    position: "absolute",
    top: `${noPosition.top}%`,
    left: `${noPosition.left}%`,
    transform: `
      rotate(${Math.random() * 30 - 15}deg)
      scale(${Math.random() * 0.3 + 0.9})
    `,
  }}
  className="
    px-10
    py-4
    rounded-full
    text-xl
    font-bold
    bg-red-500
    transition-all
    duration-200
    hover:scale-110
    active:scale-90
    shadow-[0_0_30px_rgba(255,0,0,0.8)]
    animate-bounce
  "
>
  NO {noEmoji}
</button>
        </div>
      )}

      {/* FOREVER SCREEN */}
      {showFinal && (
        <div className="fixed inset-0 z-[300] bg-black flex flex-col justify-center items-center text-center px-6 overflow-hidden">

          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 50 + 20}px`,
                animationDuration: `${Math.random() * 3 + 1}s`,
              }}
            >
              ❤️
            </div>
          ))}

          <h1 className="text-5xl md:text-8xl font-black text-pink-400 animate-pulse z-10">
            FOREVER US ❤️
          </h1>

          <p className="mt-10 text-2xl md:text-4xl text-gray-200 z-10">
            Thank you for existing in my life 💖
          </p>

          <div className="mt-16 z-10">
            <h2 className="text-3xl md:text-5xl font-black text-yellow-300">
              LOVE METER 💘
            </h2>

            <div className="mt-6 text-5xl md:text-7xl font-black text-pink-400">
              {lovePercent.toLocaleString()}%
            </div>
          </div>

          <h2 className="mt-20 text-4xl md:text-6xl font-black text-white animate-bounce z-10">
            HAPPY BIRTHDAY SHONAA 👑❤️
          </h2>

          <button
            onClick={() => setShowCatchGame(true)}
            className="mt-16 px-12 py-5 rounded-full text-2xl font-black bg-gradient-to-r from-pink-500 to-red-500 hover:scale-110 transition-all z-10"
          >
            Continue To Love Challenges 🎮
          </button>
        </div>
      )}

      {/* HEART CATCH GAME */}
      {showCatchGame && (
        <div className="fixed inset-0 z-[400] bg-black flex flex-col items-center justify-center text-center overflow-hidden">

          <h1 className="text-5xl font-black text-pink-400 mb-10">
            Catch 10 Hearts ❤️
          </h1>

          <h2 className="text-3xl text-yellow-300 mb-20">
            Score: {heartScore}/10
          </h2>

          {[...Array(15)].map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (heartScore < 10) {
                  setHeartScore(heartScore + 1);
                }

                if (heartScore + 1 >= 10) {
                  setShowQuiz(true);
                }
              }}
              className="absolute text-5xl animate-bounce"
              style={{
                left: `${Math.random() * 90}%`,
                top: `${Math.random() * 90}%`,
              }}
            >
              ❤️
            </button>
          ))}
        </div>
      )}

      {/* QUIZ */}
  {/* QUIZ */}
{showQuiz && (
  <div className="
    fixed
    inset-0
    z-[500]
    bg-black
    flex
    flex-col
    justify-center
    items-center
    text-center
    px-6
    overflow-hidden
  ">

    {/* Floating Hearts */}
    {[...Array(30)].map((_, i) => (
      <div
        key={i}
        className="absolute text-pink-500 animate-bounce opacity-70"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          fontSize: `${Math.random() * 30 + 15}px`,
          animationDuration: `${Math.random() * 5 + 2}s`,
        }}
      >
        ❤️
      </div>
    ))}

    <h1 className="
      text-5xl
      md:text-7xl
      font-black
      text-pink-400
      mb-20
      z-10
    ">
      Who Fell In Love First? 😏❤️
    </h1>

    <div className="
      flex
      gap-10
      flex-wrap
      justify-center
      z-10
    ">

      {/* ME BUTTON */}
      <button
        onClick={() => {
          document.getElementById("answerBox").classList.remove("hidden");

          setTimeout(() => {
            setShowSlider(true);
          }, 3500);
        }}
        className="
          px-12
          py-5
          rounded-full
          text-2xl
          font-black
          bg-pink-500
          hover:scale-110
          transition-all
          duration-500
          shadow-[0_0_40px_rgba(255,0,120,0.8)]
        "
      >
        ME ❤️
      </button>

      {/* YOU BUTTON */}
      <button
        onClick={() => {
          document.getElementById("answerBox").classList.remove("hidden");

          setTimeout(() => {
            setShowSlider(true);
          }, 3500);
        }}
        className="
          px-12
          py-5
          rounded-full
          text-2xl
          font-black
          bg-red-500
          hover:scale-110
          transition-all
          duration-500
          shadow-[0_0_40px_rgba(255,0,120,0.8)]
        "
      >
        YOU ❤️
      </button>
    </div>

    {/* Hidden Cinematic Answer */}
    <div
      id="answerBox"
      className="
        hidden
        mt-20
        z-10
        animate-bounce
      "
    >
      <h2 className="
        text-4xl
        md:text-6xl
        font-black
        text-white
        animate-pulse
      ">
        Correct Answer 😭💖
      </h2>

      <p className="
        mt-8
        text-2xl
        md:text-4xl
        text-pink-300
        leading-relaxed
      ">
        We both instantly fell
        in love with each other ❤️
      </p>

      <div className="mt-10 text-6xl animate-spin">
        💞
      </div>
    </div>
  </div>
)}

      {/* SLIDER */}
      {showSlider && (
        <div className="fixed inset-0 z-[600] bg-black flex flex-col justify-center items-center text-center px-6">

          <h1 className="text-5xl md:text-7xl font-black text-pink-400 mb-16">
            How Much You Love Me? 😭❤️
          </h1>

          <input
            type="range"
            min="0"
            max="100"
            className="w-[80%]"
          />

          <p className="mt-10 text-3xl text-gray-300">
            Still not enough 😏❤️
          </p>

          <button
            onClick={() => setShowProposal(true)}
            className="mt-20 px-12 py-5 rounded-full text-2xl font-black bg-gradient-to-r from-pink-500 to-red-500 hover:scale-110 transition-all"
          >
            Final Surprise 💍
          </button>
        </div>
      )}

      {/* FINAL PROPOSAL */}
      {showProposal && (
        <div className="fixed inset-0 z-[700] bg-black flex flex-col justify-center items-center text-center overflow-hidden px-6">

          {[...Array(120)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 50 + 20}px`,
                animationDuration: `${Math.random() * 3 + 1}s`,
              }}
            >
              🌹
            </div>
          ))}

          <h1 className="text-5xl md:text-8xl font-black text-pink-400 animate-pulse z-10">
            I CHOOSE YOU ❤️
          </h1>

          <p className="mt-16 text-2xl md:text-4xl text-gray-200 max-w-4xl leading-relaxed z-10">
            In every universe...
            <br />
            In every lifetime...
            <br />
            I would still find you
            and love you all over again 💖
          </p>

          <h2 className="mt-20 text-4xl md:text-6xl font-black text-white animate-bounce z-10">
            FOREVER & ALWAYS 💍❤️
          </h2>
        </div>
      )}
    </div>
  );
}