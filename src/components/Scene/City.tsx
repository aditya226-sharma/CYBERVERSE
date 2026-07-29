"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NeonBuilding({
  position,
  size,
  color,
  emissiveIntensity = 0.3,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  emissiveIntensity?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const edgeRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(
    () => new THREE.BoxGeometry(size[0], size[1], size[2]),
    [size]
  );

  const edges = useMemo(
    () => new THREE.EdgesGeometry(geometry),
    [geometry]
  );

  useFrame((state) => {
    if (glowRef.current) {
      const pulse =
        Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1 + 0.4;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = pulse * emissiveIntensity;
    }
    if (edgeRef.current) {
      (edgeRef.current.material as THREE.LineBasicMaterial).opacity =
        0.3 + Math.sin(state.clock.elapsedTime * 0.8 + position[2]) * 0.15;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          color="#0a0a1a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <mesh ref={glowRef} geometry={geometry}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
      <lineSegments ref={edgeRef} geometry={edges}>
        <lineBasicMaterial color={color} transparent opacity={0.4} />
      </lineSegments>
      {/* Window strips */}
      <WindowStrips position={[0, 0, 0]} size={size} color={color} />
    </group>
  );
}

function WindowStrips({
  size,
  color,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}) {
  const stripsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (stripsRef.current) {
      stripsRef.current.children.forEach((child, i) => {
        const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        mat.opacity =
          0.1 +
          Math.abs(Math.sin(state.clock.elapsedTime * 0.3 + i * 0.5)) * 0.5;
      });
    }
  });

  const strips = useMemo(() => {
    const s: { y: number; w: number }[] = [];
    const count = Math.floor(size[1] / 0.6);
    for (let i = 0; i < count; i++) {
      s.push({
        y: -size[1] / 2 + 0.3 + i * 0.6,
        w: 0.3 + Math.random() * (size[0] - 0.4),
      });
    }
    return s;
  }, [size]);

  return (
    <group ref={stripsRef} position={[0, 0, size[2] / 2 + 0.01]}>
      {strips.map((strip, i) => (
        <mesh key={i} position={[0, strip.y, 0]}>
          <planeGeometry args={[strip.w, 0.15]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function CityGrid() {
  const gridRef = useRef<THREE.Group>(null);

  return (
    <group ref={gridRef}>
      <gridHelper
        args={[100, 50, 0x00ff88, 0x001a0a]}
        position={[0, -0.01, 0]}
      />
    </group>
  );
}

function NeonRoad({
  start,
  end,
  color = "#00ff88",
}: {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const dir = new THREE.Vector3(end[0] - start[0], 0, end[2] - start[2]);
  const len = dir.length();
  const center: [number, number, number] = [
    (start[0] + end[0]) / 2,
    0.02,
    (start[2] + end[2]) / 2,
  ];

  return (
    <mesh ref={ref} position={center} rotation={[-Math.PI / 2, 0, Math.atan2(dir.z, dir.x)]}>
      <planeGeometry args={[len, 0.15]} />
      <meshBasicMaterial color={color} transparent opacity={0.15} />
    </mesh>
  );
}

export function City() {
  const cityRef = useRef<THREE.Group>(null);

  const buildings = useMemo(
    () => [
      // SOC HQ
      { pos: [-8, 4, -6] as [number, number, number], size: [3, 8, 3] as [number, number, number], color: "#00ff88" },
      // Portfolio Tower (tallest)
      { pos: [0, 5, 0] as [number, number, number], size: [2.5, 10, 2.5] as [number, number, number], color: "#00d4ff" },
      // Malware Lab
      { pos: [-8, 3.5, 4] as [number, number, number], size: [3, 7, 3] as [number, number, number], color: "#ff0040" },
      // Dark Web
      { pos: [8, 3, -6] as [number, number, number], size: [3, 6, 3] as [number, number, number], color: "#8b00ff" },
      // Threat Intel
      { pos: [8, 4.5, 4] as [number, number, number], size: [3, 9, 3] as [number, number, number], color: "#ff8800" },
      // Network Ops
      { pos: [-4, 3, -10] as [number, number, number], size: [3, 6, 3] as [number, number, number], color: "#00ffcc" },
      // Cloud Security
      { pos: [4, 3.5, -10] as [number, number, number], size: [3, 7, 3] as [number, number, number], color: "#4488ff" },
      // Forensics
      { pos: [-12, 2.5, 0] as [number, number, number], size: [2.5, 5, 2.5] as [number, number, number], color: "#ff4488" },
      // Red Team
      { pos: [12, 2.5, 0] as [number, number, number], size: [2.5, 5, 2.5] as [number, number, number], color: "#ff2200" },
      // Blue Team
      { pos: [-4, 3, 10] as [number, number, number], size: [3, 6, 3] as [number, number, number], color: "#2244ff" },
      // Cert Museum
      { pos: [4, 2.5, 10] as [number, number, number], size: [2.5, 5, 2.5] as [number, number, number], color: "#ffcc00" },
      // Innovation
      { pos: [-12, 2.5, 8] as [number, number, number], size: [2.5, 5, 2.5] as [number, number, number], color: "#00ff44" },
      // Mission Control
      { pos: [12, 2.5, -8] as [number, number, number], size: [2.5, 5, 2.5] as [number, number, number], color: "#ff0088" },
      // Training
      { pos: [-8, 2, -12] as [number, number, number], size: [2.5, 4, 2.5] as [number, number, number], color: "#44ffaa" },
      // Comms
      { pos: [8, 2, 12] as [number, number, number], size: [2.5, 4, 2.5] as [number, number, number], color: "#ffaa44" },
      // Satellite
      { pos: [0, 2, -14] as [number, number, number], size: [2.5, 4, 2.5] as [number, number, number], color: "#aa88ff" },
      // Quantum
      { pos: [0, 2, 14] as [number, number, number], size: [2.5, 4, 2.5] as [number, number, number], color: "#00aaff" },
      // Background buildings
      { pos: [-18, 3, -4] as [number, number, number], size: [2, 6, 2] as [number, number, number], color: "#003322" },
      { pos: [18, 4, 2] as [number, number, number], size: [2.5, 8, 2.5] as [number, number, number], color: "#003322" },
      { pos: [-16, 2, -10] as [number, number, number], size: [2, 4, 2] as [number, number, number], color: "#001133" },
      { pos: [16, 3, -12] as [number, number, number], size: [2, 6, 2] as [number, number, number], color: "#001133" },
      { pos: [-16, 2.5, 12] as [number, number, number], size: [2, 5, 2] as [number, number, number], color: "#001133" },
      { pos: [16, 2, 10] as [number, number, number], size: [2, 4, 2] as [number, number, number], color: "#001133" },
      { pos: [-20, 3, 0] as [number, number, number], size: [2, 6, 2] as [number, number, number], color: "#001122" },
      { pos: [20, 2.5, -2] as [number, number, number], size: [2, 5, 2] as [number, number, number], color: "#001122" },
      // More filler
      { pos: [-6, 1.5, -16] as [number, number, number], size: [1.5, 3, 1.5] as [number, number, number], color: "#001122" },
      { pos: [6, 2, 16] as [number, number, number], size: [1.5, 4, 1.5] as [number, number, number], color: "#001122" },
      { pos: [-14, 1.5, -14] as [number, number, number], size: [1.5, 3, 1.5] as [number, number, number], color: "#001122" },
      { pos: [14, 2, 14] as [number, number, number], size: [1.5, 4, 1.5] as [number, number, number], color: "#001122" },
    ],
    []
  );

  useFrame((state) => {
    if (cityRef.current) {
      cityRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.02) * 0.05;
    }
  });

  return (
    <group ref={cityRef}>
      <CityGrid />
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          color="#050510"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Buildings */}
      {buildings.map((b, i) => (
        <NeonBuilding
          key={i}
          position={b.pos}
          size={b.size}
          color={b.color}
          emissiveIntensity={i < 17 ? 0.4 : 0.15}
        />
      ))}
      {/* Roads */}
      <NeonRoad start={[-14, 0, -6]} end={[14, 0, -6]} />
      <NeonRoad start={[-14, 0, 4]} end={[14, 0, 4]} />
      <NeonRoad start={[-8, 0, -14]} end={[-8, 0, 14]} />
      <NeonRoad start={[8, 0, -14]} end={[8, 0, 14]} />
      <NeonRoad start={[0, 0, -16]} end={[0, 0, 16]} color="#00d4ff" />
      <NeonRoad start={[-16, 0, 0]} end={[16, 0, 0]} color="#00d4ff" />
      {/* Atmospheric particles on ground */}
      <GroundParticles />
    </group>
  );
}

function GroundParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 500;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = Math.random() * 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
      c.setHSL(0.45 + Math.random() * 0.15, 1, 0.5);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          args={[positions, 3]}
          attach="attributes-position"
          count={count}
        />
        <bufferAttribute
          args={[colors, 3]}
          attach="attributes-color"
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}
