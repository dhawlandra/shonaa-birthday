import { useEffect, useRef, useState, useCallback } from "react";

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

import homeMusic from "./assets/music/home.mp3";
import galleryMusic from "./assets/music/gallery.mp3";
import gameMusic from "./assets/music/game.mp3";
import finalMusic from "./assets/music/final.mp3";

/* ─── GLOBAL STYLES injected once ─────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Great+Vibes&family=Montserrat:wght@300;400;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --rose:     #ff4d7d;
    --blush:    #ffb3c6;
    --gold:     #f7c873;
    --cream:    #fff5f7;
    --deep:     #1a0010;
    --midnight: #0d000a;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--midnight);
    font-family: 'Montserrat', sans-serif;
    cursor: none;
    overflow-x: hidden;
  }

  .cursor {
    position: fixed; top: 0; left: 0; z-index: 99999;
    pointer-events: none; transform: translate(-50%,-50%);
    width: 18px; height: 18px;
    background: var(--rose);
    border-radius: 50%;
    box-shadow: 0 0 14px var(--rose), 0 0 30px rgba(255,77,125,0.5);
    transition: transform 0.08s ease;
    mix-blend-mode: screen;
  }
  .cursor-trail {
    position: fixed; top: 0; left: 0; z-index: 99998;
    pointer-events: none; transform: translate(-50%,-50%);
    width: 36px; height: 36px;
    border: 1.5px solid rgba(255,77,125,0.4);
    border-radius: 50%;
    transition: top 0.18s ease, left 0.18s ease;
  }

  .font-script  { font-family: 'Great Vibes', cursive; }
  .font-serif   { font-family: 'Cormorant Garamond', serif; }
  .font-sans    { font-family: 'Montserrat', sans-serif; }

  @keyframes riseUp {
    from { opacity:0; transform: translateY(60px); }
    to   { opacity:1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity:0; } to { opacity:1; }
  }
  @keyframes scaleIn {
    from { opacity:0; transform: scale(0.7); }
    to   { opacity:1; transform: scale(1); }
  }
  @keyframes floatHeart {
    0%   { transform: translateY(0)    rotate(0deg)   scale(1);   opacity:0.9; }
    50%  { transform: translateY(-40px) rotate(15deg) scale(1.1); opacity:0.7; }
    100% { transform: translateY(-90px) rotate(-10deg) scale(0.8); opacity:0; }
  }
  @keyframes spinGlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes shimmer {
    0%,100% { opacity: 0.5; }
    50%      { opacity: 1; }
  }
  @keyframes heartbeat {
    0%,100% { transform: scale(1); }
    14%     { transform: scale(1.18); }
    28%     { transform: scale(1); }
    42%     { transform: scale(1.12); }
    70%     { transform: scale(1); }
  }
  @keyframes orbitFloat {
    0%   { transform: translateY(0px) translateX(0px); }
    25%  { transform: translateY(-20px) translateX(10px); }
    50%  { transform: translateY(0px) translateX(20px); }
    75%  { transform: translateY(20px) translateX(10px); }
    100% { transform: translateY(0px) translateX(0px); }
  }
  @keyframes glowPulse {
    0%,100% { box-shadow: 0 0 40px rgba(255,77,125,0.6), 0 0 80px rgba(255,77,125,0.3); }
    50%      { box-shadow: 0 0 80px rgba(255,77,125,1),   0 0 140px rgba(255,77,125,0.6); }
  }
  @keyframes textGlow {
    0%,100% { text-shadow: 0 0 20px rgba(255,77,125,0.5); }
    50%      { text-shadow: 0 0 60px rgba(255,77,125,1), 0 0 100px rgba(255,179,198,0.6); }
  }
  @keyframes particleFly {
    0%   { transform: translate(0,0) scale(1); opacity:1; }
    100% { transform: translate(var(--tx),var(--ty)) scale(0); opacity:0; }
  }
  @keyframes petalsRain {
    0%   { transform: translateY(-10px) rotate(0deg); opacity:1; }
    100% { transform: translateY(110vh)  rotate(720deg); opacity:0; }
  }
  @keyframes ringPulse {
    0%   { transform: scale(1);   opacity:0.8; }
    100% { transform: scale(2.5); opacity:0; }
  }
  @keyframes bounce3d {
    0%,100% { transform: translateY(0) scale(1); }
    50%      { transform: translateY(-24px) scale(1.08); }
  }
  @keyframes countUp {
    from { opacity:0; transform: scale(0.5) rotate(-10deg); }
    to   { opacity:1; transform: scale(1)   rotate(0deg); }
  }
  @keyframes revealWidth {
    from { width:0; }
    to   { width:100%; }
  }

  .anim-rise     { animation: riseUp   0.9s cubic-bezier(0.22,1,0.36,1) forwards; opacity:0; }
  .anim-fade     { animation: fadeIn   1s ease forwards; opacity:0; }
  .anim-scale    { animation: scaleIn  0.7s cubic-bezier(0.34,1.56,0.64,1) forwards; opacity:0; }
  .anim-heartbeat{ animation: heartbeat 1.4s ease-in-out infinite; }
  .anim-float    { animation: orbitFloat 6s ease-in-out infinite; }
  .anim-glow     { animation: glowPulse 2.5s ease-in-out infinite; }
  .anim-shimmer  { animation: shimmer 2s ease-in-out infinite; }
  .anim-bounce3d { animation: bounce3d 2s ease-in-out infinite; }
  .anim-textglow { animation: textGlow 2.5s ease-in-out infinite; }

  .scene {
    position: fixed; inset: 0; z-index: 10;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center;
    background: radial-gradient(ellipse at 50% 40%, #2d0020 0%, var(--midnight) 70%);
    overflow: hidden; padding: 24px;
  }

  .glass {
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(24px);
    border: 1px solid rgba(255,179,198,0.2);
    border-radius: 32px;
    box-shadow: 0 8px 60px rgba(255,77,125,0.15), inset 0 1px 0 rgba(255,255,255,0.1);
  }

  .divider {
    width: 120px; height: 1px;
    background: linear-gradient(90deg, transparent, var(--rose), transparent);
    margin: 16px auto;
  }

  .photo-frame {
    border-radius: 50%;
    border: 3px solid transparent;
    background: linear-gradient(var(--midnight), var(--midnight)) padding-box,
                linear-gradient(135deg, var(--rose), var(--gold), var(--rose)) border-box;
    padding: 5px;
  }
  .photo-frame img {
    border-radius: 50%; display: block;
    width: 100%; height: 100%; object-fit: cover;
  }

  .ring-wrap { position: relative; display: inline-block; }
  .ring-wrap::before, .ring-wrap::after {
    content:''; position:absolute; inset:-12px;
    border-radius:50%; border:1.5px solid rgba(255,77,125,0.4);
    animation: ringPulse 2.4s ease-out infinite;
  }
  .ring-wrap::after { animation-delay:1.2s; }

  .btn-rose {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700; letter-spacing: 0.08em;
    text-transform: uppercase; font-size: 13px;
    padding: 16px 44px; border-radius: 100px; border: none; cursor: none;
    background: linear-gradient(135deg, #ff4d7d, #ff1a5e);
    color: #fff;
    box-shadow: 0 4px 30px rgba(255,77,125,0.5), 0 0 0 0 rgba(255,77,125,0.4);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .btn-rose:hover {
    transform: translateY(-3px) scale(1.04);
    box-shadow: 0 12px 50px rgba(255,77,125,0.7), 0 0 0 8px rgba(255,77,125,0.15);
  }
  .btn-rose:active { transform: scale(0.97); }

  .btn-gold {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700; letter-spacing: 0.08em;
    text-transform: uppercase; font-size: 13px;
    padding: 16px 44px; border-radius: 100px; border: none; cursor: none;
    background: linear-gradient(135deg, #f7c873, #e8a020);
    color: #1a0010;
    box-shadow: 0 4px 30px rgba(247,200,115,0.4);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .btn-gold:hover {
    transform: translateY(-3px) scale(1.04);
    box-shadow: 0 12px 50px rgba(247,200,115,0.7);
  }

  .btn-green {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700; letter-spacing: 0.08em; font-size: 15px;
    padding: 20px 60px; border-radius: 100px; border: none; cursor: none;
    background: linear-gradient(135deg, #00e676, #00c853);
    color: #fff;
    box-shadow: 0 4px 40px rgba(0,230,118,0.5);
    transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s;
  }
  .btn-green:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 60px rgba(0,230,118,0.7);
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    padding: 24px 32px;
    max-width: 1100px;
    width: 100%;
  }
  .gallery-item {
    position: relative; overflow: hidden;
    border-radius: 20px; aspect-ratio: 1;
    border: 2px solid rgba(255,77,125,0.25);
    box-shadow: 0 8px 32px rgba(255,77,125,0.15);
    transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s;
    cursor: none;
  }
  .gallery-item:hover {
    transform: scale(1.06) rotate(1deg);
    box-shadow: 0 20px 60px rgba(255,77,125,0.5);
    border-color: var(--rose);
    z-index: 2;
  }
  .gallery-item img { width:100%; height:100%; object-fit:cover; display:block; }
  .gallery-item::after {
    content:''; position:absolute; inset:0;
    background: linear-gradient(180deg, transparent 50%, rgba(255,77,125,0.3) 100%);
    opacity:0; transition: opacity 0.3s;
  }
  .gallery-item:hover::after { opacity:1; }

  .meter-bar {
    width: 300px; height: 10px; border-radius: 100px;
    background: rgba(255,255,255,0.1); overflow: hidden; margin: 14px auto;
  }
  .meter-fill {
    height: 100%; border-radius: 100px;
    background: linear-gradient(90deg, #ff4d7d, #f7c873, #ff4d7d);
    background-size: 200% 100%;
    animation: shimmer 1.5s linear infinite;
    transition: width 0.1s linear;
  }

  .petal {
    position: fixed; top:-30px; pointer-events:none;
    animation: petalsRain linear infinite; z-index: 5;
  }

  input[type=range] {
    -webkit-appearance: none; appearance: none;
    height: 6px; border-radius: 100px;
    background: rgba(255,77,125,0.25);
    outline: none;
  }
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none;
    width: 24px; height: 24px; border-radius: 50%;
    background: linear-gradient(135deg, #ff4d7d, #f7c873);
    cursor: none;
    box-shadow: 0 0 16px rgba(255,77,125,0.7);
    transition: transform 0.15s;
  }
  input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.2); }
`;

function useGlobalCSS(css) {
  useEffect(() => {
    const el = document.createElement("style");
    el.innerHTML = css;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);
}

function Cursor() {
  const curRef   = useRef(null);
  const trailRef = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (curRef.current) {
        curRef.current.style.left = e.clientX + "px";
        curRef.current.style.top  = e.clientY + "px";
      }
      setTimeout(() => {
        if (trailRef.current) {
          trailRef.current.style.left = e.clientX + "px";
          trailRef.current.style.top  = e.clientY + "px";
        }
      }, 80);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div className="cursor" ref={curRef} />
      <div className="cursor-trail" ref={trailRef} />
    </>
  );
}

function FloatingHearts({ count = 18 }) {
  const items = ["❤️","🌸","✨","💕","🌹","💖","🌺"];
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          position:"fixed",
          left:`${(i * 7.3) % 100}%`,
          bottom:"-30px",
          fontSize:`${(i % 5) * 5 + 14}px`,
          animation:`floatHeart ${(i % 4) * 2 + 6}s ease-in ${(i * 1.3) % 10}s infinite`,
          pointerEvents:"none", zIndex:3, opacity:0.65,
        }}>
          {items[i % items.length]}
        </div>
      ))}
    </>
  );
}

function FallingPetals({ count = 12 }) {
  const petals = ["🌸","🌹","🌺","🌷","💮"];
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="petal" style={{
          left:`${(i * 9.1) % 100}%`,
          fontSize:`${(i % 4) * 4 + 14}px`,
          animationDuration:`${(i % 5) * 2 + 7}s`,
          animationDelay:`${(i * 1.7) % 10}s`,
          opacity:0.55,
        }}>
          {petals[i % petals.length]}
        </div>
      ))}
    </>
  );
}

function useClickParticles() {
  useEffect(() => {
    const burst = (e) => {
      const colors = ["#ff4d7d","#f7c873","#ffb3c6","#ffffff","#ff80ab"];
      for (let i = 0; i < 9; i++) {
        const p = document.createElement("div");
        const angle = (i / 9) * 360;
        const dist  = Math.random() * 90 + 40;
        const tx = Math.cos((angle * Math.PI) / 180) * dist;
        const ty = Math.sin((angle * Math.PI) / 180) * dist;
        p.style.cssText = `
          position:fixed; left:${e.clientX}px; top:${e.clientY}px;
          width:${Math.random()*6+5}px; height:${Math.random()*6+5}px;
          border-radius:50%; pointer-events:none;
          background:${colors[Math.floor(Math.random()*colors.length)]};
          z-index:99997; --tx:${tx}px; --ty:${ty}px;
          animation:particleFly 0.65s ease-out forwards;
          transform:translate(-50%,-50%);
          box-shadow:0 0 8px currentColor;
        `;
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 700);
      }
    };
    window.addEventListener("click", burst);
    return () => window.removeEventListener("click", burst);
  }, []);
}

/* ══════════════════════════════════════════════════════════════════ */
export default function App() {
  useGlobalCSS(GLOBAL_CSS);
  useClickParticles();

  const [screen, setScreen]           = useState("tap");
  const [heartScore, setHeartScore]   = useState(0);
  const [lovePercent, setLovePercent] = useState(0);
  const [sliderVal, setSliderVal]     = useState(50);
  const [noPos, setNoPos]             = useState({ top:55, left:55 });
  const [noEmoji, setNoEmoji]         = useState("😒");
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [galleryIn, setGalleryIn]     = useState(false);

  const audioRef = useRef(null);
  const noEmojis = ["😒","😭","🏃","😂","🚫","😈","🙈","💨"];
  const memories = [pic1,pic2,pic3,pic4,pic5,pic6,pic7,pic8,pic9,pic10];

  const playMusic = useCallback(async (src) => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    const a = new Audio(src);
    a.loop = true; a.volume = 0.55;
    try { await a.play(); audioRef.current = a; } catch(e) { console.log(e); }
  }, []);

  const go = useCallback((s, music) => {
    if (music) playMusic(music);
    setScreen(s);
  }, [playMusic]);

  useEffect(() => {
    if (screen !== "final") return;
    const id = setInterval(() => setLovePercent(p => p >= 999999 ? p : p + 19999), 40);
    return () => clearInterval(id);
  }, [screen]);

  useEffect(() => {
    if (screen === "gallery") setTimeout(() => setGalleryIn(true), 100);
    else setGalleryIn(false);
  }, [screen]);

  const moveNo = () => {
    navigator.vibrate?.(80);
    setNoPos({ top: Math.random()*70, left: Math.random()*70 });
    setNoEmoji(noEmojis[Math.floor(Math.random()*noEmojis.length)]);
  };

  /* ─── TAP TO BEGIN ─── */
  if (screen === "tap") return (
    <div className="scene" onClick={() => go("home", homeMusic)}>
      <Cursor />
      <FloatingHearts count={20} />

      <div style={{ position:"absolute", width:500, height:500,
        background:"radial-gradient(circle, rgba(255,77,125,0.22) 0%, transparent 70%)",
        borderRadius:"50%", animation:"heartbeat 2s ease-in-out infinite", pointerEvents:"none" }} />

      <div style={{ position:"absolute", width:300, height:300,
        border:"1px dashed rgba(255,179,198,0.25)", borderRadius:"50%",
        animation:"spinGlow 20s linear infinite", pointerEvents:"none" }} />

      <div style={{ position:"relative", zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", gap:20 }}>
        <div className="anim-scale" style={{ fontSize:80, animationDelay:"0.1s", lineHeight:1 }}>💖</div>

        <h1 className="font-script anim-rise" style={{
          fontSize:"clamp(52px,12vw,90px)", color:"#ff4d7d",
          textShadow:"0 0 60px rgba(255,77,125,0.8), 0 0 120px rgba(255,77,125,0.4)",
          animationDelay:"0.3s", lineHeight:1.1,
        }}>A Love Story</h1>

        <div className="divider anim-fade" style={{ animationDelay:"0.6s" }} />

        <p className="font-serif anim-rise" style={{
          fontSize:"clamp(16px,3vw,22px)", color:"rgba(255,179,198,0.85)",
          fontStyle:"italic", animationDelay:"0.8s", letterSpacing:"0.04em",
        }}>
          written just for you, Shonaa
        </p>

        <div className="anim-rise" style={{ animationDelay:"1.2s", marginTop:28 }}>
          <div style={{
            padding:"14px 40px", borderRadius:100,
            border:"1.5px solid rgba(255,77,125,0.45)",
            color:"rgba(255,255,255,0.65)",
            fontFamily:"Montserrat,sans-serif",
            fontSize:12, letterSpacing:"0.16em", textTransform:"uppercase",
            animation:"shimmer 2s ease-in-out infinite",
            backdropFilter:"blur(8px)",
          }}>
            ✦ Touch anywhere to begin ✦
          </div>
        </div>
      </div>
    </div>
  );

  /* ─── HOME ─── */
  if (screen === "home") return (
    <div className="scene">
      <Cursor /><FloatingHearts count={16} /><FallingPetals count={10} />

      <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
        <div style={{ position:"absolute", width:600, height:600, top:"5%", left:"-15%",
          background:"radial-gradient(circle, rgba(255,77,125,0.16) 0%, transparent 65%)", borderRadius:"50%" }} />
        <div style={{ position:"absolute", width:400, height:400, bottom:"5%", right:"-10%",
          background:"radial-gradient(circle, rgba(247,200,115,0.1) 0%, transparent 65%)", borderRadius:"50%" }} />
      </div>

      <div style={{ position:"relative", zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", gap:8, maxWidth:700 }}>
        <p className="font-sans anim-rise" style={{ fontSize:11, letterSpacing:"0.32em", textTransform:"uppercase", color:"var(--rose)", animationDelay:"0.1s" }}>
          ✦ With all my love ✦
        </p>

        <h1 className="font-script anim-rise" style={{
          fontSize:"clamp(60px,14vw,110px)", lineHeight:1.1,
          background:"linear-gradient(135deg, #ff4d7d, #f7c873, #ff4d7d)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          filter:"drop-shadow(0 0 40px rgba(255,77,125,0.5))",
          animationDelay:"0.25s",
        }}>Happy Birthday</h1>

        <h2 className="font-script anim-rise" style={{
          fontSize:"clamp(50px,12vw,88px)", color:"#ffb3c6",
          textShadow:"0 0 40px rgba(255,179,198,0.7)",
          animationDelay:"0.45s", lineHeight:1,
        }}>Shonaa 💖</h2>

        <div className="divider anim-fade" style={{ animationDelay:"0.6s", width:180 }} />

        <div className="ring-wrap anim-scale" style={{ animationDelay:"0.7s", marginTop:6 }}>
          <div className="photo-frame anim-glow" style={{ width:210, height:210 }}>
            <img src={shonaa1} alt="Shonaa" />
          </div>
        </div>

        <p className="font-serif anim-rise" style={{
          fontSize:"clamp(16px,3vw,21px)", color:"rgba(255,255,255,0.72)",
          fontStyle:"italic", lineHeight:1.85, marginTop:10,
          animationDelay:"1s",
        }}>
          "You are the most beautiful thing<br />
          that ever happened in my life"
        </p>

        <div className="anim-rise" style={{ animationDelay:"1.3s", marginTop:22 }}>
          <button className="btn-rose" onClick={() => go("heart", galleryMusic)}>
            Open My Heart &nbsp;💌
          </button>
        </div>
      </div>
    </div>
  );

  /* ─── HEART POPUP ─── */
  if (screen === "heart") return (
    <div className="scene">
      <Cursor /><FloatingHearts count={20} /><FallingPetals count={10} />

      <div className="glass anim-scale" style={{
        maxWidth:540, width:"100%", padding:"44px 36px",
        display:"flex", flexDirection:"column", alignItems:"center", gap:14,
        position:"relative", zIndex:10,
      }}>
        <div style={{ fontSize:52, animation:"heartbeat 1.4s ease-in-out infinite" }}>❤️</div>

        <h2 className="font-script" style={{
          fontSize:"clamp(38px,9vw,62px)", color:"#ff4d7d",
          textShadow:"0 0 40px rgba(255,77,125,0.6)",
        }}>My Heart For You</h2>

        <div className="divider" />

        <div className="ring-wrap" style={{ margin:"8px 0" }}>
          <div className="photo-frame anim-glow" style={{ width:190, height:190 }}>
            <img src={shonaa2} alt="Shonaa" />
          </div>
        </div>

        <p className="font-serif" style={{
          fontSize:"clamp(16px,3vw,20px)", color:"rgba(255,255,255,0.78)",
          fontStyle:"italic", lineHeight:1.9,
        }}>
          Every heartbeat of mine<br />
          whispers your name, always ❤️
        </p>

        <div className="divider" />

        <button className="btn-gold" style={{ marginTop:6 }} onClick={() => go("gallery")}>
          Our Memories &nbsp;✨ 📸
        </button>
      </div>
    </div>
  );

  /* ─── GALLERY ─── */
  if (screen === "gallery") return (
    <div style={{
      position:"fixed", inset:0, zIndex:10,
      background:"radial-gradient(ellipse at 50% 20%, #2d0020 0%, #0d000a 70%)",
      overflowY:"auto", cursor:"none",
    }}>
      <Cursor /><FallingPetals count={10} />

      <div style={{ paddingTop:56, paddingBottom:32, textAlign:"center" }}>
        <p style={{ fontSize:11, letterSpacing:"0.3em", textTransform:"uppercase", color:"var(--rose)", fontFamily:"Montserrat,sans-serif" }}>
          ✦ Every moment with you ✦
        </p>
        <h1 className="font-script" style={{
          fontSize:"clamp(44px,10vw,80px)", color:"#ff4d7d",
          textShadow:"0 0 60px rgba(255,77,125,0.6)", marginTop:8,
        }}>Our Beautiful Memories</h1>
        <div className="divider" style={{ width:200, margin:"14px auto" }} />
      </div>

      <div className="gallery-grid" style={{ margin:"0 auto" }}>
        {memories.map((img, i) => (
          <div key={i} className="gallery-item" style={{
            opacity: galleryIn ? 1 : 0,
            transform: galleryIn ? "none" : "translateY(40px)",
            transition:`opacity 0.6s ease ${i*0.07}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${i*0.07}s`,
          }}>
            <img src={img} alt={`Memory ${i+1}`} loading="lazy" />
          </div>
        ))}
      </div>

      <div style={{ textAlign:"center", padding:"40px 0 60px" }}>
        <button className="btn-rose" onClick={() => go("love", gameMusic)}>
          Final Love Question &nbsp;❤️
        </button>
      </div>
    </div>
  );

  /* ─── LOVE QUESTION ─── */
  if (screen === "love") return (
    <div className="scene">
      <Cursor /><FloatingHearts count={24} /><FallingPetals count={8} />

      <div style={{
        position:"absolute", width:700, height:700,
        background:"radial-gradient(circle, rgba(255,77,125,0.18) 0%, transparent 65%)",
        borderRadius:"50%", animation:"heartbeat 2.5s ease-in-out infinite", pointerEvents:"none",
      }} />

      <div style={{ position:"relative", zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", gap:22, maxWidth:700 }}>
        <h1 className="font-script anim-rise" style={{
          fontSize:"clamp(42px,10vw,76px)",
          background:"linear-gradient(135deg,#ff4d7d,#f7c873)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          filter:"drop-shadow(0 0 30px rgba(255,77,125,0.5))",
        }}>
          Will you stay with me forever?
        </h1>

        <div className="divider" />

        <p className="font-serif anim-rise" style={{
          fontSize:"clamp(15px,2.5vw,19px)",
          color:"rgba(255,179,198,0.7)", fontStyle:"italic", animationDelay:"0.4s",
        }}>
          Choose wisely, my love 😌
        </p>

        <div className="anim-scale" style={{ animationDelay:"0.7s", marginTop:14 }}>
          <button className="btn-green" style={{ fontSize:20, padding:"22px 70px" }}
            onClick={() => go("final", finalMusic)}>
            YES 😍 &nbsp;Forever
          </button>
        </div>

        {/* Runaway NO button */}
        <button
          onMouseEnter={moveNo} onClick={moveNo} onTouchStart={moveNo}
          style={{
            position:"absolute",
            top:`${noPos.top}%`, left:`${noPos.left}%`,
            transform:"translate(-50%,-50%)",
            fontFamily:"Montserrat,sans-serif", fontWeight:700,
            fontSize:13, letterSpacing:"0.06em",
            padding:"13px 30px", borderRadius:100, border:"none", cursor:"none",
            background:"linear-gradient(135deg,#ff3d3d,#c0392b)",
            color:"#fff",
            boxShadow:"0 4px 24px rgba(255,61,61,0.5)",
            transition:"top 0.2s cubic-bezier(0.34,1.56,0.64,1), left 0.2s cubic-bezier(0.34,1.56,0.64,1)",
            zIndex:20,
            animation:"bounce3d 1.6s ease-in-out infinite",
          }}>
          NO {noEmoji}
        </button>
      </div>
    </div>
  );

  /* ─── FINAL / LOVE METER ─── */
  if (screen === "final") return (
    <div className="scene">
      <Cursor /><FloatingHearts count={30} /><FallingPetals count={16} />

      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        background:"radial-gradient(ellipse at 50% 50%, rgba(255,77,125,0.2) 0%, transparent 70%)",
        animation:"heartbeat 3s ease-in-out infinite",
      }} />

      <div style={{ position:"relative", zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", gap:12, maxWidth:700 }}>
        <div style={{ fontSize:60, animation:"heartbeat 1.2s ease-in-out infinite" }}>💍</div>

        <h1 className="font-script anim-rise" style={{
          fontSize:"clamp(52px,12vw,96px)",
          background:"linear-gradient(135deg,#ff4d7d,#f7c873,#ff4d7d)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          filter:"drop-shadow(0 0 40px rgba(255,77,125,0.7))",
        }}>Forever Us ❤️</h1>

        <div className="divider" />

        <p className="font-serif anim-rise" style={{
          fontSize:"clamp(17px,3vw,23px)", color:"rgba(255,255,255,0.8)",
          fontStyle:"italic", lineHeight:1.8, animationDelay:"0.4s",
        }}>
          Thank you for existing in my life 💖
        </p>

        <div className="glass anim-scale" style={{
          padding:"26px 44px", marginTop:14, animationDelay:"0.6s",
          display:"flex", flexDirection:"column", alignItems:"center", gap:10,
        }}>
          <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:11, letterSpacing:"0.25em", textTransform:"uppercase", color:"var(--rose)" }}>
            ✦ Love Meter ✦
          </p>
          <div className="font-serif" style={{
            fontSize:"clamp(48px,10vw,78px)", fontWeight:700,
            background:"linear-gradient(135deg,#ff4d7d,#f7c873)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            lineHeight:1, animation:"countUp 0.4s ease-out",
          }}>
            {lovePercent.toLocaleString()}%
          </div>
          <div className="meter-bar">
            <div className="meter-fill" style={{ width:`${Math.min((lovePercent/999999)*100,100)}%` }} />
          </div>
          <p style={{ fontFamily:"Cormorant Garamond,serif", fontStyle:"italic", color:"rgba(255,179,198,0.65)", fontSize:15 }}>
            And counting… ∞
          </p>
        </div>

        <div className="anim-rise" style={{ animationDelay:"0.9s", marginTop:6 }}>
          <button className="btn-rose" onClick={() => go("catch")}>
            Love Challenges &nbsp;🎮
          </button>
        </div>
      </div>
    </div>
  );

  /* ─── CATCH HEARTS ─── */
  if (screen === "catch") return (
    <div className="scene" style={{ overflow:"hidden" }}>
      <Cursor />

      <div style={{
        position:"absolute", inset:0,
        background:"radial-gradient(ellipse at 50% 50%, #2a001a 0%, #0d000a 80%)",
        pointerEvents:"none",
      }} />

      <div style={{ position:"relative", zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
        <h1 className="font-script" style={{
          fontSize:"clamp(36px,9vw,66px)", color:"#ff4d7d",
          textShadow:"0 0 50px rgba(255,77,125,0.7)",
        }}>Catch 10 Hearts ❤️</h1>

        <div className="glass" style={{ padding:"10px 36px" }}>
          <span style={{
            fontFamily:"Cormorant Garamond,serif", fontSize:28, fontWeight:600,
            color:"var(--gold)", textShadow:"0 0 20px rgba(247,200,115,0.8)", letterSpacing:"0.06em",
          }}>{heartScore} / 10</span>
        </div>

        <p style={{ fontFamily:"Cormorant Garamond,serif", fontStyle:"italic", color:"rgba(255,179,198,0.55)", fontSize:15 }}>
          tap every heart before it flies away!
        </p>
      </div>

      {Array.from({ length: 26 }).map((_, i) => (
        <button key={i} onClick={() => {
          const next = heartScore + 1;
          setHeartScore(next);
          if (next >= 10) { setScreen("quiz"); setHeartScore(0); }
        }}
        style={{
          position:"absolute",
          left:`${5 + (i * 3.7) % 88}%`,
          top:`${12 + (i * 5.1) % 76}%`,
          fontSize:`${(i%4)*7+26}px`,
          background:"none", border:"none", cursor:"none",
          animation:`floatHeart ${(i%4)*1.5+4}s ease-in ${(i*0.9)%6}s infinite`,
          zIndex:20, lineHeight:1, padding:0,
          filter:"drop-shadow(0 0 8px rgba(255,77,125,0.7))",
          transition:"transform 0.1s",
        }}
        onMouseEnter={e => e.currentTarget.style.transform="scale(1.6)"}
        onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
        >❤️</button>
      ))}
    </div>
  );

  /* ─── QUIZ ─── */
  if (screen === "quiz") return (
    <div className="scene">
      <Cursor /><FloatingHearts count={14} />

      <div style={{ position:"relative", zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", gap:18, maxWidth:700 }}>
        <h1 className="font-script anim-rise" style={{
          fontSize:"clamp(40px,10vw,74px)", color:"#ff4d7d",
          textShadow:"0 0 50px rgba(255,77,125,0.6)",
        }}>Who Fell In Love First? 😏</h1>

        <div className="divider" />

        {!quizAnswered ? (
          <div style={{ display:"flex", gap:20, flexWrap:"wrap", justifyContent:"center", marginTop:14 }}>
            {["ME ❤️","YOU ❤️"].map((label, idx) => (
              <button key={label}
                className={idx===0 ? "btn-rose" : "btn-gold"}
                style={{ fontSize:16, padding:"18px 52px" }}
                onClick={() => setQuizAnswered(true)}>
                {label}
              </button>
            ))}
          </div>
        ) : (
          <div className="glass anim-scale" style={{ padding:"34px 42px", marginTop:14, display:"flex", flexDirection:"column", alignItems:"center", gap:14 }}>
            <div style={{ fontSize:50, animation:"heartbeat 1s ease-in-out infinite" }}>😭❤️</div>
            <h2 className="font-script" style={{ fontSize:"clamp(32px,8vw,56px)", color:"#ffb3c6" }}>Correct Answer!</h2>
            <div className="divider" />
            <p className="font-serif" style={{ fontSize:"clamp(16px,3vw,21px)", fontStyle:"italic", color:"rgba(255,255,255,0.78)", lineHeight:1.85 }}>
              We both instantly fell<br />for each other 💖
            </p>
            <button className="btn-rose" style={{ marginTop:10 }}
              onClick={() => { setQuizAnswered(false); setScreen("slider"); }}>
              Next &nbsp;→
            </button>
          </div>
        )}
      </div>
    </div>
  );

  /* ─── SLIDER ─── */
  if (screen === "slider") return (
    <div className="scene">
      <Cursor /><FloatingHearts count={16} /><FallingPetals count={8} />

      <div style={{ position:"relative", zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", gap:16, maxWidth:640, width:"100%" }}>
        <h1 className="font-script anim-rise" style={{
          fontSize:"clamp(38px,10vw,72px)", color:"#ff4d7d",
          textShadow:"0 0 50px rgba(255,77,125,0.6)",
        }}>How much do you love me? 😭</h1>

        <div className="divider" />

        <div className="anim-rise" style={{ width:"88%", animationDelay:"0.4s" }}>
          <input type="range" min="0" max="100" value={sliderVal}
            onChange={e => setSliderVal(+e.target.value)} style={{ width:"100%" }} />
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:10 }}>
            <span style={{ fontFamily:"Montserrat,sans-serif", fontSize:10, color:"rgba(255,179,198,0.35)", letterSpacing:"0.1em" }}>A LITTLE</span>
            <span style={{ fontFamily:"Montserrat,sans-serif", fontSize:10, color:"rgba(255,179,198,0.35)", letterSpacing:"0.1em" }}>FOREVER</span>
          </div>
        </div>

        <div className="glass anim-rise" style={{ padding:"20px 44px", animationDelay:"0.6s", textAlign:"center" }}>
          <div className="font-script" style={{
            fontSize:"clamp(42px,10vw,68px)", color:"#f7c873",
            textShadow:"0 0 30px rgba(247,200,115,0.6)",
          }}>
            {sliderVal}%
          </div>
          <p className="font-serif" style={{
            fontSize:17, fontStyle:"italic", color:"rgba(255,255,255,0.6)", marginTop:6,
          }}>
            {sliderVal < 40 ? "That's it? 🥺" : sliderVal < 75 ? "Still not enough 😏❤️" : "Almost there… 😉"}
          </p>
        </div>

        <div className="anim-rise" style={{ animationDelay:"0.8s", marginTop:6 }}>
          <button className="btn-rose" onClick={() => go("proposal")}>
            Final Surprise &nbsp;💍
          </button>
        </div>
      </div>
    </div>
  );

  /* ─── PROPOSAL ─── */
  if (screen === "proposal") return (
    <div className="scene" style={{ overflow:"hidden" }}>
      <Cursor />

      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        background:"radial-gradient(ellipse at 50% 50%, rgba(255,77,125,0.26) 0%, transparent 65%)",
        animation:"heartbeat 2s ease-in-out infinite",
      }} />

      <FallingPetals count={22} /><FloatingHearts count={28} />

      <div style={{ position:"absolute", width:540, height:540,
        border:"1px solid rgba(247,200,115,0.13)", borderRadius:"50%",
        animation:"spinGlow 22s linear infinite", pointerEvents:"none" }} />
      <div style={{ position:"absolute", width:380, height:380,
        border:"1px dashed rgba(255,77,125,0.18)", borderRadius:"50%",
        animation:"spinGlow 14s linear infinite reverse", pointerEvents:"none" }} />

      <div style={{ position:"relative", zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", gap:12, maxWidth:780, padding:"0 24px" }}>

        <div style={{ fontSize:62, animation:"heartbeat 1.1s ease-in-out infinite", lineHeight:1 }}>💍</div>

        <h1 className="font-script anim-rise" style={{
          fontSize:"clamp(54px,13vw,108px)", lineHeight:1.05,
          background:"linear-gradient(135deg,#ff4d7d 20%,#f7c873 50%,#ff4d7d 80%)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          filter:"drop-shadow(0 0 50px rgba(255,77,125,0.8))",
        }}>I Choose You</h1>

        <div className="divider" style={{ width:220 }} />

        <div className="glass anim-scale" style={{
          padding:"34px 44px", animationDelay:"0.5s",
          display:"flex", flexDirection:"column", alignItems:"center", gap:14,
        }}>
          <p className="font-serif" style={{
            fontSize:"clamp(18px,3.5vw,25px)", fontStyle:"italic",
            color:"rgba(255,255,255,0.87)", lineHeight:2.1, textAlign:"center",
          }}>
            In every universe…<br />
            In every lifetime…<br />
            I would still find you<br />
            and love you all over again 💖
          </p>
        </div>

        <div className="divider" style={{ width:220 }} />

        <h2 className="font-script anim-rise" style={{
          fontSize:"clamp(36px,9vw,70px)",
          color:"#f7c873",
          textShadow:"0 0 40px rgba(247,200,115,0.8), 0 0 80px rgba(247,200,115,0.4)",
          animationDelay:"0.8s",
          animation:"bounce3d 2.2s ease-in-out infinite",
        }}>
          Forever & Always ❤️
        </h2>

        <div className="anim-rise" style={{ animationDelay:"1.2s", marginTop:8 }}>
          <button
            style={{
              fontFamily:"Montserrat,sans-serif", fontWeight:600, fontSize:11,
              letterSpacing:"0.22em", textTransform:"uppercase",
              padding:"12px 30px", borderRadius:100,
              border:"1px solid rgba(255,179,198,0.28)",
              background:"transparent", color:"rgba(255,179,198,0.55)",
              cursor:"none", transition:"all 0.3s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor="var(--rose)"; e.currentTarget.style.color="var(--rose)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,179,198,0.28)"; e.currentTarget.style.color="rgba(255,179,198,0.55)"; }}
            onClick={() => {
              setLovePercent(0); setHeartScore(0);
              if (audioRef.current) audioRef.current.pause();
              go("tap", null);
            }}
          >
            ↺ Replay from the beginning
          </button>
        </div>
      </div>
    </div>
  );

  return null;
}
