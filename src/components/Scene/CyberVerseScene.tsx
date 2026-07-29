"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { City } from "./City";
import { Globe } from "./Globe";
import { Rain } from "./Rain";
import { FlyingCars } from "./FlyingCars";
import { PostEffects } from "./PostEffects";
import { CyberVerseLights } from "./Lights";

export default function CyberVerseScene() {
  return (
    <Canvas
      camera={{ position: [0, 8, 20], fov: 60, near: 0.1, far: 500 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        stencil: false,
      }}
      dpr={[1, 2]}
      style={{ background: "#050508" }}
    >
      <Suspense fallback={null}>
        <color attach="background" args={["#050508"]} />
        <fog attach="fog" args={["#050508", 20, 80]} />
        <CyberVerseLights />
        <City />
        <Globe />
        <Rain />
        <FlyingCars />
        <PostEffects />
      </Suspense>
    </Canvas>
  );
}
