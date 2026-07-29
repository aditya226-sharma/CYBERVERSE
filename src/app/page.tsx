"use client";

import dynamic from "next/dynamic";
import { useGameState } from "@/store/gameStore";
import IntroSequence from "@/components/UI/IntroSequence";
import HUD from "@/components/UI/HUD";
import AIAssistant from "@/components/UI/AIAssistant";
import AttackMap from "@/components/UI/AttackMap";
import BuildingPanel from "@/components/UI/BuildingPanel";
import MissionPanel from "@/components/UI/MissionPanel";
import PortfolioTower from "@/components/Portfolio/PortfolioTower";

const CyberVerseScene = dynamic(
  () => import("@/components/Scene/CyberVerseScene"),
  { ssr: false }
);

export default function Home() {
  const { introComplete } = useGameState();

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#050508]">
      {/* Cinematic intro */}
      {!introComplete && <IntroSequence />}

      {/* 3D Scene (always rendered behind) */}
      <div className="absolute inset-0 z-0">
        <CyberVerseScene />
      </div>

      {/* UI Overlays */}
      {introComplete && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <HUD />
          <AIAssistant />
          <AttackMap />
          <BuildingPanel />
          <MissionPanel />
          <PortfolioTower />
        </div>
      )}
    </main>
  );
}
