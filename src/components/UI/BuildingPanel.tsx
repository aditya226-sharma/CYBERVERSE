"use client";

import { useGameState } from "@/store/gameStore";
import { BUILDINGS } from "@/utils/constants";
import { X, ChevronUp, ChevronDown } from "lucide-react";

export default function BuildingPanel() {
  const { activeBuilding, setActiveBuilding, activeFloor, setActiveFloor } = useGameState();

  const building = BUILDINGS.find((b) => b.id === activeBuilding);
  if (!building) return null;

  const maxFloor = building.floors.length - 1;

  const handleFloorUp = () => {
    if (activeFloor < maxFloor) setActiveFloor(activeFloor + 1);
  };

  const handleFloorDown = () => {
    if (activeFloor > 0) setActiveFloor(activeFloor - 1);
  };

  const floor = building.floors[activeFloor];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => { setActiveBuilding(null); setActiveFloor(0); }}
      />

      {/* Panel */}
      <div className="relative w-[90vw] max-w-2xl glass-panel corner-accent overflow-hidden animate-float">
        {/* Header */}
        <div
          className="px-6 py-4 border-b flex items-center justify-between"
          style={{ borderColor: building.color + "33" }}
        >
          <div>
            <h2
              className="text-lg font-bold tracking-[0.15em]"
              style={{
                color: building.color,
                fontFamily: "Orbitron, monospace",
                textShadow: `0 0 20px ${building.color}55`,
              }}
            >
              {building.name}
            </h2>
            <p className="text-[10px] text-[#ffffff44] tracking-wider mt-1">
              {building.subtitle}
            </p>
          </div>
          <button
            onClick={() => { setActiveBuilding(null); setActiveFloor(0); }}
            className="text-[#ffffff44] hover:text-[#ff0044] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex">
          {/* Floor navigator */}
          <div className="w-20 border-r border-[#ffffff11] flex flex-col items-center py-4 gap-1">
            <button
              onClick={handleFloorUp}
              disabled={activeFloor >= maxFloor}
              className="text-[#ffffff44] hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronUp size={16} />
            </button>
            {building.floors.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveFloor(i)}
                className={`w-10 h-6 text-[9px] border transition-all duration-300 cursor-pointer ${
                  i === activeFloor
                    ? "border-current"
                    : "border-[#ffffff11] hover:border-[#ffffff33]"
                }`}
                style={{
                  color: i === activeFloor ? building.color : "#ffffff44",
                  backgroundColor: i === activeFloor ? building.color + "11" : "transparent",
                }}
              >
                F{i + 1}
              </button>
            ))}
            <button
              onClick={handleFloorDown}
              disabled={activeFloor <= 0}
              className="text-[#ffffff44] hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Floor content */}
          <div className="flex-1 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded border flex items-center justify-center"
                style={{ borderColor: building.color + "44" }}
              >
                <span
                  className="text-xs font-bold"
                  style={{ color: building.color, fontFamily: "Orbitron, monospace" }}
                >
                  {activeFloor + 1}
                </span>
              </div>
              <div>
                <h3
                  className="text-sm font-bold tracking-wider"
                  style={{ color: building.color }}
                >
                  {floor.title}
                </h3>
                <p className="text-[9px] text-[#ffffff33]">
                  FLOOR {activeFloor + 1} OF {building.floors.length}
                </p>
              </div>
            </div>
            <div className="text-[12px] leading-relaxed text-[#cccccc] border-l-2 pl-4" style={{ borderColor: building.color + "44" }}>
              {floor.content}
            </div>

            {/* Decorative data visualization */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="p-2 border text-center"
                  style={{ borderColor: building.color + "22" }}
                >
                  <div
                    className="text-lg font-bold"
                    style={{ color: building.color, fontFamily: "Orbitron, monospace" }}
                  >
                    {Math.floor(Math.random() * 900 + 100)}
                  </div>
                  <div className="text-[8px] text-[#ffffff33] tracking-wider">
                    {["ACTIVE", "ONLINE", "SECURE"][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="px-6 py-2 border-t border-[#ffffff11] flex items-center justify-between text-[9px] text-[#ffffff33]">
          <span>DISTRICT STATUS: OPERATIONAL</span>
          <span style={{ color: building.color + "88" }}>
            SECURITY LEVEL: ALPHA
          </span>
        </div>
      </div>
    </div>
  );
}
