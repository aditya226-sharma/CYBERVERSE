import { create } from "zustand";

export type BuildingId =
  | "soc"
  | "portfolio"
  | "malware-lab"
  | "darkweb-center"
  | "threat-intel"
  | "network-ops"
  | "cloud-security"
  | "forensics"
  | "red-team"
  | "blue-team"
  | "cert-museum"
  | "innovation"
  | "mission-control"
  | "training"
  | "comms"
  | "satellite"
  | "quantum-center";

export interface Building {
  id: BuildingId;
  name: string;
  subtitle: string;
  color: string;
  icon: string;
  position: [number, number, number];
  size: [number, number, number];
  floors: { title: string; content: string }[];
}

interface GameState {
  introComplete: boolean;
  setIntroComplete: (v: boolean) => void;

  activeBuilding: BuildingId | null;
  setActiveBuilding: (id: BuildingId | null) => void;

  activeFloor: number;
  setActiveFloor: (f: number) => void;

  globeMode: string;
  setGlobeMode: (m: string) => void;

  showAttackMap: boolean;
  setShowAttackMap: (v: boolean) => void;

  showAI: boolean;
  setShowAI: (v: boolean) => void;

  showMissions: boolean;
  setShowMissions: (v: boolean) => void;

  missionProgress: number;
  setMissionProgress: (p: number) => void;

  stats: {
    attacksBlocked: number;
    threatsNeutralized: number;
    uptime: number;
  };
}

export const useGameState = create<GameState>((set) => ({
  introComplete: false,
  setIntroComplete: (v) => set({ introComplete: v }),

  activeBuilding: null,
  setActiveBuilding: (id) => set({ activeBuilding: id }),

  activeFloor: 0,
  setActiveFloor: (f) => set({ activeFloor: f }),

  globeMode: "idle",
  setGlobeMode: (m) => set({ globeMode: m }),

  showAttackMap: false,
  setShowAttackMap: (v) => set({ showAttackMap: v }),

  showAI: false,
  setShowAI: (v) => set({ showAI: v }),

  showMissions: false,
  setShowMissions: (v) => set({ showMissions: v }),

  missionProgress: 0,
  setMissionProgress: (p) => set({ missionProgress: p }),

  stats: {
    attacksBlocked: 1_847_293,
    threatsNeutralized: 42_891,
    uptime: 99.97,
  },
}));
