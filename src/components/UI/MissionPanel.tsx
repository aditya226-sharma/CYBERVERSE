"use client";

import { useGameState } from "@/store/gameStore";
import { MISSIONS } from "@/utils/constants";
import { X, Target, Lock, CheckCircle, Zap, ChevronRight } from "lucide-react";

export default function MissionPanel() {
  const { showMissions, setShowMissions } = useGameState();

  if (!showMissions) return null;

  const statusIcons: Record<string, typeof Target> = {
    ACTIVE: Zap,
    LOCKED: Lock,
    COMPLETED: CheckCircle,
  };

  const difficultyColors: Record<string, string> = {
    HIGH: "#ff0040",
    MEDIUM: "#ff8800",
    EXTREME: "#ff00ff",
    LOW: "#00ff88",
  };

  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-xl pointer-events-auto z-50">
      <div className="glass-panel relative corner-accent overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-[#ff880022]">
          <div className="flex items-center gap-3">
            <Target size={16} className="text-[#ff8800]" />
            <span
              className="text-sm tracking-[0.2em] text-[#ff8800] font-bold"
              style={{ fontFamily: "Orbitron, monospace" }}
            >
              MISSION CONTROL
            </span>
          </div>
          <button
            onClick={() => setShowMissions(false)}
            className="text-[#ffffff44] hover:text-[#ff0044] transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Mission progress bar */}
        <div className="px-6 py-3 border-b border-[#ffffff08]">
          <div className="flex items-center justify-between text-[9px] text-[#ffffff44] mb-1">
            <span>OVERALL PROGRESS</span>
            <span>3/5 COMPLETED</span>
          </div>
          <div className="h-1 bg-[#ffffff08] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: "60%",
                background: "linear-gradient(90deg, #ff8800, #ff0040)",
                boxShadow: "0 0 10px #ff880066",
              }}
            />
          </div>
        </div>

        {/* Missions */}
        <div className="max-h-[50vh] overflow-y-auto">
          {MISSIONS.map((mission) => {
            const Icon = statusIcons[mission.status];
            const isLocked = mission.status === "LOCKED";
            return (
              <div
                key={mission.id}
                className={`px-6 py-3 border-b border-[#ffffff08] transition-all duration-300 ${
                  isLocked ? "opacity-40" : "hover:bg-[#ffffff05] cursor-pointer"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon
                      size={14}
                      style={{
                        color:
                          mission.status === "COMPLETED"
                            ? "#00ff88"
                            : mission.status === "LOCKED"
                            ? "#ffffff33"
                            : "#ff8800",
                      }}
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white tracking-wider">
                        {mission.title}
                      </h4>
                      <p className="text-[9px] text-[#ffffff44] mt-0.5">
                        {mission.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <div>
                      <div
                        className="text-[8px] px-1.5 py-0.5 border inline-block"
                        style={{
                          color: difficultyColors[mission.difficulty],
                          borderColor: difficultyColors[mission.difficulty] + "44",
                        }}
                      >
                        {mission.difficulty}
                      </div>
                      <div className="text-[8px] text-[#ffcc00] mt-1">
                        {mission.reward}
                      </div>
                    </div>
                    {!isLocked && <ChevronRight size={12} className="text-[#ffffff22]" />}
                  </div>
                </div>
                {mission.status === "ACTIVE" && (
                  <div className="mt-2 h-0.5 bg-[#ffffff08] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#ff8800] rounded-full"
                      style={{ width: `${Math.random() * 80 + 10}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-2 border-t border-[#ffffff08] flex items-center justify-between text-[8px] text-[#ffffff33]">
          <span>RANK: CYBER COMMANDER</span>
          <span>XP: 12,450 / 20,000</span>
        </div>
      </div>
    </div>
  );
}
