"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useGameState } from "@/store/gameStore";

const BOOT_LINES = [
  { text: "CYBERVERSE DEFENSE NETWORK v7.4.2", delay: 0 },
  { text: "Initializing quantum encryption...", delay: 400 },
  { text: "Loading neural threat matrix...", delay: 800 },
  { text: "Connecting to satellite network... 47/47 ONLINE", delay: 1200 },
  { text: "Decrypting global threat intelligence...", delay: 1800 },
  { text: "Loading AI defense protocols...", delay: 2200 },
  { text: "Calibrating holographic display...", delay: 2600 },
  { text: "SOC Headquarters: ONLINE", delay: 3000 },
  { text: "Malware Research Lab: ONLINE", delay: 3200 },
  { text: "Threat Intelligence Tower: ONLINE", delay: 3400 },
  { text: "Network Operations Center: ONLINE", delay: 3600 },
  { text: "All systems operational.", delay: 4000 },
  { text: "", delay: 4200 },
  { text: "> GLOBAL CYBER DEFENSE NETWORK: ACTIVE", delay: 4400 },
];

export default function IntroSequence() {
  const [phase, setPhase] = useState<"boot" | "earth" | "city" | "enter">("boot");
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [bootDone, setBootDone] = useState(false);
  const [earthOpacity, setEarthOpacity] = useState(0);
  const [cityOpacity, setCityOpacity] = useState(0);
  const [enterOpacity, setEnterOpacity] = useState(0);
  const [isoTime, setIsoTime] = useState("");
  const { setIntroComplete } = useGameState();

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    BOOT_LINES.forEach((line, i) => {
      timeouts.push(
        setTimeout(() => {
          setBootLines((prev) => [...prev, line.text]);
        }, line.delay)
      );
    });
    timeouts.push(setTimeout(() => setBootDone(true), 5000));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    setIsoTime(new Date().toISOString().split(".")[0] + "Z");
  }, []);

  useEffect(() => {
    if (!bootDone) return;
    const t1 = setTimeout(() => setPhase("earth"), 500);
    return () => clearTimeout(t1);
  }, [bootDone]);

  useEffect(() => {
    if (phase === "earth") {
      let opacity = 0;
      const interval = setInterval(() => {
        opacity += 0.02;
        if (opacity >= 1) {
          opacity = 1;
          clearInterval(interval);
          setTimeout(() => setPhase("city"), 1500);
        }
        setEarthOpacity(opacity);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "city") {
      let opacity = 0;
      const interval = setInterval(() => {
        opacity += 0.015;
        if (opacity >= 1) {
          opacity = 1;
          clearInterval(interval);
          setTimeout(() => setPhase("enter"), 1000);
        }
        setCityOpacity(opacity);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "enter") {
      let opacity = 0;
      const interval = setInterval(() => {
        opacity += 0.03;
        if (opacity >= 1) {
          opacity = 1;
          clearInterval(interval);
        }
        setEnterOpacity(opacity);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const handleEnter = useCallback(() => {
    let opacity = 1;
    const interval = setInterval(() => {
      opacity -= 0.03;
      if (opacity <= 0) {
        clearInterval(interval);
        setIntroComplete(true);
      }
      document.getElementById("intro-overlay")!.style.opacity = String(opacity);
    }, 20);
  }, [setIntroComplete]);

  return (
    <div
      id="intro-overlay"
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "#020205" }}
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="w-full h-px bg-[#00ff88]"
            style={{ marginTop: `${i * 10}px`, opacity: 0.05 }}
          />
        ))}
      </div>

      {/* Boot sequence */}
      {phase === "boot" && (
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20">
          <div className="mb-8">
            <h1
              className="text-3xl md:text-5xl font-bold tracking-[0.3em] text-[#00ff88]"
              style={{ fontFamily: "Orbitron, monospace", textShadow: "0 0 30px rgba(0,255,136,0.5)" }}
            >
              CYBERVERSE
            </h1>
            <p className="text-xs md:text-sm tracking-[0.5em] text-[#00ff8866] mt-2" style={{ fontFamily: "Rajdhani, monospace" }}>
              GLOBAL CYBER DEFENSE METROPOLIS
            </p>
          </div>
          <div className="font-mono text-xs md:text-sm space-y-1">
            {bootLines.map((line, i) => (
              <div
                key={i}
                className="animate-flicker"
                style={{
                  color: line.startsWith(">") ? "#00ff88" : "#00ff8888",
                  opacity: line ? 1 : 0,
                  textShadow: line.startsWith(">") ? "0 0 10px #00ff88" : "none",
                }}
              >
                <span className="text-[#00ff8844] mr-2">[OK]</span>
                {line}
              </div>
            ))}
            <span className="inline-block w-2 h-4 bg-[#00ff88] animate-pulse-glow" />
          </div>
        </div>
      )}

      {/* Earth phase */}
      {phase === "earth" && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: earthOpacity }}
        >
          <div className="relative">
            {/* Earth circle */}
            <div
              className="w-40 h-40 md:w-60 md:h-60 rounded-full border-2 border-[#00ff88] relative"
              style={{
                boxShadow: "0 0 60px rgba(0,255,136,0.3), inset 0 0 40px rgba(0,255,136,0.1)",
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
            >
              <div
                className="absolute inset-2 rounded-full border border-[#00ff8844]"
                style={{ animation: "spin 10s linear infinite" }}
              />
              <div
                className="absolute inset-4 rounded-full border border-[#00d4ff33]"
                style={{ animation: "spin 15s linear infinite reverse" }}
              />
              {/* Grid overlay */}
              <div className="absolute inset-0 rounded-full overflow-hidden opacity-20">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full h-px bg-[#00ff88]"
                    style={{ top: `${(i + 1) * 12.5}%` }}
                  />
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={`v${i}`}
                    className="absolute h-full w-px bg-[#00ff88]"
                    style={{ left: `${(i + 1) * 12.5}%` }}
                  />
                ))}
              </div>
            </div>
            <p
              className="text-center text-[#00ff88] mt-6 text-sm tracking-[0.3em]"
              style={{ fontFamily: "Rajdhani, monospace" }}
            >
              CONNECTING TO GLOBAL DEFENSE NETWORK
            </p>
          </div>
        </div>
      )}

      {/* City fly-in */}
      {phase === "city" && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: cityOpacity }}
        >
          <div className="text-center">
            <div
              className="text-5xl md:text-8xl font-bold tracking-[0.2em] text-transparent bg-clip-text"
              style={{
                fontFamily: "Orbitron, monospace",
                backgroundImage: "linear-gradient(180deg, #00ff88, #00d4ff)",
                WebkitBackgroundClip: "text",
                filter: "drop-shadow(0 0 40px rgba(0,255,136,0.5))",
              }}
            >
              CYBERVERSE
            </div>
            <p
              className="text-[#00ff8899] mt-4 text-lg md:text-xl tracking-[0.5em]"
              style={{ fontFamily: "Rajdhani, monospace" }}
            >
              THE WORLD&apos;S FIRST CYBER DEFENSE METROPOLIS
            </p>
          </div>
        </div>
      )}

      {/* Enter button */}
      {phase === "enter" && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-8"
          style={{ opacity: enterOpacity }}
        >
          <div className="text-center mb-10">
            <div
              className="text-4xl md:text-7xl font-bold tracking-[0.2em] text-transparent bg-clip-text mb-4"
              style={{
                fontFamily: "Orbitron, monospace",
                backgroundImage: "linear-gradient(180deg, #00ff88, #00d4ff)",
                WebkitBackgroundClip: "text",
                filter: "drop-shadow(0 0 40px rgba(0,255,136,0.5))",
              }}
            >
              CYBERVERSE
            </div>
            <p
              className="text-[#00ff8899] text-sm md:text-base tracking-[0.4em]"
              style={{ fontFamily: "Rajdhani, monospace" }}
            >
              WELCOME COMMANDER
            </p>
            <p
              className="text-[#00ff8866] text-xs tracking-[0.3em] mt-2"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              GLOBAL CYBER DEFENSE NETWORK ONLINE
            </p>
          </div>

          <button
            onClick={handleEnter}
            className="group relative px-12 py-4 cursor-pointer border border-[#00ff88] bg-transparent transition-all duration-500 hover:bg-[#00ff88] hover:bg-opacity-10 hover:shadow-[0_0_60px_rgba(0,255,136,0.3)]"
          >
            <span
              className="text-[#00ff88] text-lg tracking-[0.5em] font-bold group-hover:text-white transition-colors"
              style={{ fontFamily: "Orbitron, monospace" }}
            >
              ENTER
            </span>
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#00ff88]" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#00ff88]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#00ff88]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#00ff88]" />
          </button>

          <p
            className="text-[#00ff8844] text-xs tracking-[0.2em] mt-4 animate-pulse-glow"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            CLICK TO INITIALIZE DEFENSE PROTOCOLS
          </p>
        </div>
      )}

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-16 h-16 border-t border-l border-[#00ff8833]" />
      <div className="absolute top-4 right-4 w-16 h-16 border-t border-r border-[#00ff8833]" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-b border-l border-[#00ff8833]" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-b border-r border-[#00ff8833]" />

      {/* Status bar bottom */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between text-[10px] text-[#00ff8844] tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>
        <span>SYS.STATUS: NOMINAL</span>
        <span>{isoTime}</span>
        <span>CLEARANCE: LEVEL 7</span>
      </div>
    </div>
  );
}
