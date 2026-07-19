"use client";

import { useState, useEffect, useCallback } from "react";
import { useGameState } from "@/store/gameStore";
import { X, Globe, Activity, AlertTriangle, Shield } from "lucide-react";

interface AttackData {
  id: number;
  from: string;
  to: string;
  type: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  timestamp: string;
}

const ATTACK_TYPES = [
  "DDoS",
  "SQL Injection",
  "Ransomware",
  "Phishing",
  "Zero-Day",
  "MITM",
  "XSS",
  "Brute Force",
  "APT",
  "Supply Chain",
];

const COUNTRIES = [
  "US", "CN", "RU", "KP", "IR", "BR", "DE", "GB", "JP", "IN",
  "FR", "KR", "AU", "CA", "NL", "UA", "IL", "PK", "VN", "NG",
];

const COUNTRY_NAMES: Record<string, string> = {
  US: "United States", CN: "China", RU: "Russia", KP: "North Korea",
  IR: "Iran", BR: "Brazil", DE: "Germany", GB: "United Kingdom",
  JP: "Japan", IN: "India", FR: "France", KR: "South Korea",
  AU: "Australia", CA: "Canada", NL: "Netherlands", UA: "Ukraine",
  IL: "Israel", PK: "Pakistan", VN: "Vietnam", NG: "Nigeria",
};

function generateAttack(): AttackData {
  const severity: AttackData["severity"] = (["CRITICAL", "HIGH", "MEDIUM", "LOW"] as const)[
    Math.floor(Math.random() * 4)
  ];
  return {
    id: Date.now() + Math.floor(Math.random() * 1000),
    from: COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)],
    to: COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)],
    type: ATTACK_TYPES[Math.floor(Math.random() * ATTACK_TYPES.length)],
    severity,
    timestamp: new Date().toISOString().split("T")[1].split(".")[0],
  };
}

export default function AttackMap() {
  const { showAttackMap, setShowAttackMap } = useGameState();
  const [attacks, setAttacks] = useState<AttackData[]>([]);
  const [stats, setStats] = useState({
    totalAttacks: 1847293,
    blocked: 1843891,
    active: 3402,
    countries: 195,
  });

  const addAttack = useCallback(() => {
    const attack = generateAttack();
    setAttacks((prev) => [attack, ...prev].slice(0, 50));
    setStats((prev) => ({
      ...prev,
      totalAttacks: prev.totalAttacks + Math.floor(Math.random() * 10),
      blocked: prev.blocked + Math.floor(Math.random() * 10),
      active: Math.floor(3000 + Math.random() * 1000),
    }));
  }, []);

  useEffect(() => {
    if (!showAttackMap) return;
    const interval = setInterval(addAttack, 1500);
    for (let i = 0; i < 10; i++) addAttack();
    return () => clearInterval(interval);
  }, [showAttackMap, addAttack]);

  if (!showAttackMap) return null;

  const severityColors = {
    CRITICAL: "#ff0040",
    HIGH: "#ff8800",
    MEDIUM: "#ffcc00",
    LOW: "#00ff88",
  };

  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-5xl h-[80vh] pointer-events-auto z-50">
      <div className="glass-panel h-full flex flex-col relative corner-accent overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-[#ff004022]">
          <div className="flex items-center gap-3">
            <Globe size={16} className="text-[#ff0040]" />
            <span
              className="text-sm tracking-[0.2em] text-[#ff0040] font-bold"
              style={{ fontFamily: "Orbitron, monospace" }}
            >
              GLOBAL CYBER ATTACK MAP
            </span>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-[#ff004015] border border-[#ff004033]">
              <Activity size={8} className="text-[#ff0040] animate-pulse-glow" />
              <span className="text-[8px] text-[#ff0040]">LIVE</span>
            </div>
          </div>
          <button
            onClick={() => setShowAttackMap(false)}
            className="text-[#ffffff44] hover:text-[#ff0044] transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Map area */}
          <div className="flex-1 relative p-4">
            {/* Simplified world map grid */}
            <div className="absolute inset-4 grid-bg rounded overflow-hidden">
              {/* Attack visualization area */}
              <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
                {/* Grid */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <line
                    key={`h${i}`}
                    x1="0" y1={i * 20} x2="800" y2={i * 20}
                    stroke="#00ff8808" strokeWidth="0.5"
                  />
                ))}
                {Array.from({ length: 40 }).map((_, i) => (
                  <line
                    key={`v${i}`}
                    x1={i * 20} y1="0" x2={i * 20} y2="400"
                    stroke="#00ff8808" strokeWidth="0.5"
                  />
                ))}

                {/* Simplified continent outlines */}
                <path d="M100,100 Q150,80 200,90 L220,120 Q180,140 150,130 Z" fill="#00ff8811" stroke="#00ff8833" strokeWidth="0.5" />
                <path d="M160,150 Q170,180 180,220 L160,250 Q140,200 150,160 Z" fill="#00ff8811" stroke="#00ff8833" strokeWidth="0.5" />
                <path d="M350,80 Q400,70 450,90 L440,130 Q400,140 360,120 Z" fill="#00ff8811" stroke="#00ff8833" strokeWidth="0.5" />
                <path d="M370,140 Q400,160 420,200 L390,250 Q360,200 370,150 Z" fill="#00ff8811" stroke="#00ff8833" strokeWidth="0.5" />
                <path d="M450,70 Q520,60 600,80 L620,120 Q560,140 460,120 Z" fill="#00ff8811" stroke="#00ff8833" strokeWidth="0.5" />
                <path d="M650,180 Q680,170 700,190 L690,210 Q670,220 650,200 Z" fill="#00ff8811" stroke="#00ff8833" strokeWidth="0.5" />

                {/* Attack beams */}
                {attacks.slice(0, 15).map((attack, i) => {
                  const x1 = 50 + Math.random() * 700;
                  const y1 = 30 + Math.random() * 340;
                  const x2 = 50 + Math.random() * 700;
                  const y2 = 30 + Math.random() * 340;
                  const midX = (x1 + x2) / 2;
                  const midY = Math.min(y1, y2) - 30 - Math.random() * 50;
                  return (
                    <g key={attack.id}>
                      <path
                        d={`M${x1},${y1} Q${midX},${midY} ${x2},${y2}`}
                        fill="none"
                        stroke={severityColors[attack.severity]}
                        strokeWidth="1"
                        opacity={0.6}
                      >
                        <animate
                          attributeName="stroke-dasharray"
                          from="0 1000"
                          to="1000 0"
                          dur="1.5s"
                          fill="freeze"
                        />
                      </path>
                      <circle cx={x2} cy={y2} r="3" fill={severityColors[attack.severity]} opacity="0.8">
                        <animate attributeName="r" values="2;6;2" dur="1s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1s" repeatCount="indefinite" />
                      </circle>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Side panel */}
          <div className="w-72 border-l border-[#ffffff11] flex flex-col">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 p-3">
              {[
                { label: "TOTAL", value: stats.totalAttacks.toLocaleString(), color: "#ff0040" },
                { label: "BLOCKED", value: stats.blocked.toLocaleString(), color: "#00ff88" },
                { label: "ACTIVE", value: stats.active.toLocaleString(), color: "#ff8800" },
                { label: "COUNTRIES", value: String(stats.countries), color: "#00d4ff" },
              ].map((s) => (
                <div key={s.label} className="p-2 border" style={{ borderColor: s.color + "22" }}>
                  <div className="text-[8px] tracking-wider" style={{ color: s.color + "88" }}>
                    {s.label}
                  </div>
                  <div className="text-xs font-bold" style={{ color: s.color, fontFamily: "Orbitron, monospace" }}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Attack feed */}
            <div className="flex-1 overflow-y-auto border-t border-[#ffffff11]">
              <div className="p-2 text-[8px] text-[#ffffff44] tracking-wider sticky top-0 bg-[#0a0a15]">
                LIVE ATTACK FEED
              </div>
              {attacks.slice(0, 20).map((attack) => (
                <div
                  key={attack.id}
                  className="px-3 py-1.5 border-b border-[#ffffff08] hover:bg-[#ffffff05] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={8} style={{ color: severityColors[attack.severity] }} />
                      <span className="text-[9px] text-white">{attack.type}</span>
                    </div>
                    <span
                      className="text-[7px] px-1 py-0.5 border"
                      style={{
                        color: severityColors[attack.severity],
                        borderColor: severityColors[attack.severity] + "44",
                      }}
                    >
                      {attack.severity}
                    </span>
                  </div>
                  <div className="text-[8px] text-[#ffffff33] mt-0.5">
                    {COUNTRY_NAMES[attack.from] || attack.from} → {COUNTRY_NAMES[attack.to] || attack.to}
                    <span className="ml-2 text-[#ffffff22]">{attack.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Severity legend */}
            <div className="p-3 border-t border-[#ffffff11] flex items-center gap-4">
              {(["CRITICAL", "HIGH", "MEDIUM", "LOW"] as const).map((s) => (
                <div key={s} className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: severityColors[s] }} />
                  <span className="text-[7px] text-[#ffffff44]">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
