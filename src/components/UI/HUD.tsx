"use client";

import { useState, useEffect } from "react";
import { useGameState } from "@/store/gameStore";
import { BUILDINGS, CYBER_STATS } from "@/utils/constants";
import { Shield, Radio, Cpu, AlertTriangle, Eye, Zap } from "lucide-react";

export default function HUD() {
  const {
    showAI,
    setShowAI,
    showAttackMap,
    setShowAttackMap,
    showMissions,
    setShowMissions,
    activeBuilding,
    setActiveBuilding,
    stats,
  } = useGameState();

  const [time, setTime] = useState("");
  const [threatLevel, setThreatLevel] = useState(87);
  const [activeAlerts, setActiveAlerts] = useState(42);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      setThreatLevel(Math.floor(75 + Math.random() * 25));
      setActiveAlerts(Math.floor(30 + Math.random() * 30));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const statItems = [
    {
      label: "ATTACKS BLOCKED",
      value: stats.attacksBlocked.toLocaleString(),
      icon: Shield,
      color: "#00ff88",
    },
    {
      label: "THREATS ACTIVE",
      value: activeAlerts.toString(),
      icon: AlertTriangle,
      color: "#ff8800",
    },
    {
      label: "UPTIME",
      value: stats.uptime + "%",
      icon: Cpu,
      color: "#00d4ff",
    },
    {
      label: "SYSTEMS ONLINE",
      value: "17/17",
      icon: Zap,
      color: "#8b00ff",
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-30" style={{ fontFamily: "JetBrains Mono, monospace" }}>
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-[#0a0a1599] to-transparent pointer-events-auto flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse-glow" />
            <span
              className="text-[#00ff88] text-xs tracking-[0.3em] font-bold"
              style={{ fontFamily: "Orbitron, monospace" }}
            >
              CYBERVERSE
            </span>
          </div>
          <div className="hidden md:block h-4 w-px bg-[#00ff8833]" />
          <span className="hidden md:block text-[10px] text-[#00ff8866] tracking-wider">
            GLOBAL CYBER DEFENSE NETWORK
          </span>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex items-center gap-2">
            <AlertTriangle size={10} className="text-[#ff8800]" />
            <span className="text-[10px] text-[#ff8800]">THREAT LEVEL: {threatLevel}%</span>
          </div>
          <div className="text-[10px] text-[#00ff8888] tracking-widest">
            {time}
          </div>
          <div className="flex items-center gap-1">
            <Radio size={10} className="text-[#00ff88] animate-pulse-glow" />
            <span className="text-[10px] text-[#00ff88]">LIVE</span>
          </div>
        </div>
      </div>

      {/* Left stats panel */}
      <div className="absolute left-3 top-20 space-y-2 hidden md:block">
        {statItems.map((stat) => (
          <div
            key={stat.label}
            className="glass-panel p-2 w-48 corner-accent relative"
          >
            <div className="flex items-center gap-2 mb-1">
              <stat.icon size={10} style={{ color: stat.color }} />
              <span className="text-[9px] tracking-wider" style={{ color: stat.color }}>
                {stat.label}
              </span>
            </div>
            <div className="text-sm font-bold text-white tracking-wider" style={{ fontFamily: "Orbitron, monospace" }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Right side - threat radar */}
      <div className="absolute right-3 top-20 hidden lg:block">
        <div className="glass-panel p-3 w-40 corner-accent relative">
          <div className="text-[9px] text-[#00ff88] tracking-wider mb-2 text-center">
            THREAT RADAR
          </div>
          <div className="relative w-32 h-32 mx-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Radar circles */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#00ff8822" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="#00ff8822" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="15" fill="none" stroke="#00ff8822" strokeWidth="0.5" />
              <line x1="50" y1="5" x2="50" y2="95" stroke="#00ff8811" strokeWidth="0.5" />
              <line x1="5" y1="50" x2="95" y2="50" stroke="#00ff8811" strokeWidth="0.5" />
              {/* Sweep line */}
              <line
                x1="50"
                y1="50"
                x2="50"
                y2="5"
                stroke="#00ff88"
                strokeWidth="1"
                opacity="0.8"
                style={{
                  transformOrigin: "50px 50px",
                  animation: "spin 3s linear infinite",
                }}
              />
              {/* Threat dots */}
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const r = 10 + Math.random() * 30;
                return (
                  <circle
                    key={i}
                    cx={50 + Math.cos(angle) * r}
                    cy={50 + Math.sin(angle) * r}
                    r={1 + Math.random()}
                    fill={i < 3 ? "#ff0040" : "#ff8800"}
                    opacity={0.6 + Math.random() * 0.4}
                  >
                    <animate
                      attributeName="opacity"
                      values="0.3;1;0.3"
                      dur={`${1 + Math.random() * 2}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0a1599] to-transparent pointer-events-auto flex items-end justify-center pb-3">
        <div className="flex items-center gap-1 md:gap-2">
          <NavButton
            label="ATTACK MAP"
            active={showAttackMap}
            onClick={() => { setShowAttackMap(!showAttackMap); setShowAI(false); setShowMissions(false); }}
            color="#ff0040"
          />
          <NavButton
            label="AI ASSIST"
            active={showAI}
            onClick={() => { setShowAI(!showAI); setShowAttackMap(false); setShowMissions(false); }}
            color="#00d4ff"
          />
          <NavButton
            label="MISSIONS"
            active={showMissions}
            onClick={() => { setShowMissions(!showMissions); setShowAI(false); setShowAttackMap(false); }}
            color="#ff8800"
          />
          <NavButton
            label="BUILDINGS"
            active={false}
            onClick={() => {
              setActiveBuilding(activeBuilding ? null : "soc");
              setShowAI(false);
              setShowAttackMap(false);
              setShowMissions(false);
            }}
            color="#8b00ff"
          />
        </div>
      </div>

      {/* Building selector sidebar */}
      {activeBuilding && (
        <div className="absolute left-3 bottom-20 max-h-[60vh] overflow-y-auto pointer-events-auto">
          <div className="glass-panel p-3 w-56 space-y-1 corner-accent relative">
            <div className="text-[9px] text-[#00ff88] tracking-wider mb-2">
              SELECT DISTRICT
            </div>
            {BUILDINGS.map((b) => (
              <button
                key={b.id}
                onClick={() => setActiveBuilding(b.id === activeBuilding ? null : b.id)}
                className={`w-full text-left px-2 py-1.5 text-[10px] tracking-wider transition-all duration-300 cursor-pointer border ${
                  b.id === activeBuilding
                    ? "border-current bg-current/10"
                    : "border-transparent hover:bg-white/5"
                }`}
                style={{
                  color: b.id === activeBuilding ? b.color : "#ffffff88",
                  borderColor: b.id === activeBuilding ? b.color + "44" : "transparent",
                }}
              >
                <span className="font-medium">{b.name}</span>
                <span className="block text-[8px] opacity-50">{b.subtitle}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function NavButton({
  label,
  active,
  onClick,
  color,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 md:px-4 py-1.5 text-[9px] md:text-[10px] tracking-[0.2em] transition-all duration-300 cursor-pointer border ${
        active
          ? "bg-opacity-10"
          : "border-transparent hover:bg-white/5"
      }`}
      style={{
        color: active ? color : "#ffffff66",
        borderColor: active ? color + "44" : "transparent",
        backgroundColor: active ? color + "11" : "transparent",
        fontFamily: "Orbitron, monospace",
        textShadow: active ? `0 0 10px ${color}` : "none",
      }}
    >
      {label}
    </button>
  );
}
