"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AttackBeam({
  start,
  end,
  color,
  speed = 1,
  delay = 0,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color: string;
  speed?: number;
  delay?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const progress = useRef(0);

  const curve = useMemo(() => {
    const mid = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5);
    mid.y += start.distanceTo(end) * 0.4;
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [start, end]);

  const tubeGeo = useMemo(
    () => new THREE.TubeGeometry(curve, 20, 0.02, 4, false),
    [curve]
  );

  useFrame((state, delta) => {
    if (!ref.current) return;
    progress.current += delta * speed;
    if (progress.current < delay) {
      ref.current.visible = false;
      return;
    }
    const t = ((progress.current - delay) % 3) / 3;
    ref.current.visible = t > 0 && t < 1;
    if (ref.current.visible) {
      const pos = curve.getPoint(t);
      ref.current.position.copy(pos);
      const scale = Math.sin(t * Math.PI);
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={ref} geometry={tubeGeo}>
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
}

function GlobeMesh() {
  const globeRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.1;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = t * 0.12;
    }
    if (atmosphereRef.current) {
      (atmosphereRef.current.material as THREE.ShaderMaterial).uniforms &&
        (atmosphereRef.current.material as THREE.ShaderMaterial).uniforms.time &&
        ((atmosphereRef.current.material as THREE.ShaderMaterial).uniforms.time.value = t);
    }
  });

  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color("#00ff88") },
        color2: { value: new THREE.Color("#00d4ff") },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float fresnel = pow(1.0 - abs(dot(vNormal, normalize(-vPosition))), 3.0);
          vec3 color = mix(color1, color2, sin(time * 0.5) * 0.5 + 0.5);
          float scan = sin(vPosition.y * 20.0 + time * 2.0) * 0.1 + 0.9;
          gl_FragColor = vec4(color, fresnel * 0.6 * scan);
        }
      `,
      transparent: true,
      side: THREE.FrontSide,
      depthWrite: false,
    });
  }, []);

  const globeTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#050515";
    ctx.fillRect(0, 0, 512, 256);

    // Draw grid lines
    ctx.strokeStyle = "rgba(0, 255, 136, 0.15)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 512; i += 16) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 256);
      ctx.stroke();
    }
    for (let i = 0; i < 256; i += 16) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(512, i);
      ctx.stroke();
    }

    // Draw continents as simplified shapes (dots)
    ctx.fillStyle = "rgba(0, 255, 136, 0.4)";
    // North America
    for (let i = 0; i < 200; i++) {
      const x = 60 + Math.random() * 80;
      const y = 40 + Math.random() * 70;
      ctx.beginPath();
      ctx.arc(x, y, 0.5 + Math.random(), 0, Math.PI * 2);
      ctx.fill();
    }
    // South America
    for (let i = 0; i < 100; i++) {
      const x = 90 + Math.random() * 40;
      const y = 120 + Math.random() * 80;
      ctx.beginPath();
      ctx.arc(x, y, 0.5 + Math.random(), 0, Math.PI * 2);
      ctx.fill();
    }
    // Europe
    for (let i = 0; i < 100; i++) {
      const x = 230 + Math.random() * 60;
      const y = 40 + Math.random() * 50;
      ctx.beginPath();
      ctx.arc(x, y, 0.5 + Math.random(), 0, Math.PI * 2);
      ctx.fill();
    }
    // Africa
    for (let i = 0; i < 120; i++) {
      const x = 240 + Math.random() * 50;
      const y = 90 + Math.random() * 90;
      ctx.beginPath();
      ctx.arc(x, y, 0.5 + Math.random(), 0, Math.PI * 2);
      ctx.fill();
    }
    // Asia
    for (let i = 0; i < 250; i++) {
      const x = 300 + Math.random() * 120;
      const y = 30 + Math.random() * 80;
      ctx.beginPath();
      ctx.arc(x, y, 0.5 + Math.random(), 0, Math.PI * 2);
      ctx.fill();
    }
    // Australia
    for (let i = 0; i < 60; i++) {
      const x = 400 + Math.random() * 50;
      const y = 150 + Math.random() * 40;
      ctx.beginPath();
      ctx.arc(x, y, 0.5 + Math.random(), 0, Math.PI * 2);
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);

  const attackBeams = useMemo(() => {
    const beams = [];
    const cities = [
      new THREE.Vector3(-3, 2, 0),
      new THREE.Vector3(3, 1, 1),
      new THREE.Vector3(0, 3, -2),
      new THREE.Vector3(-2, -1, 3),
      new THREE.Vector3(4, 0, -1),
      new THREE.Vector3(-1, 2.5, -3),
      new THREE.Vector3(2, -2, 2),
      new THREE.Vector3(-4, 0.5, 1),
    ];
    const colors = ["#ff0040", "#ff8800", "#ff0088", "#ff4400", "#ff00ff", "#ffaa00"];
    for (let i = 0; i < 12; i++) {
      const from = cities[Math.floor(Math.random() * cities.length)];
      const to = cities[Math.floor(Math.random() * cities.length)];
      if (from !== to) {
        beams.push({
          start: from.clone().normalize().multiplyScalar(2.01),
          end: to.clone().normalize().multiplyScalar(2.01),
          color: colors[i % colors.length],
          delay: i * 0.5,
        });
      }
    }
    return beams;
  }, []);

  return (
    <group position={[0, 10, 0]}>
      {/* Globe */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={globeTexture}
          emissiveMap={globeTexture}
          emissive={new THREE.Color("#00ff88")}
          emissiveIntensity={0.3}
          metalness={0.5}
          roughness={0.5}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Clouds */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.05, 32, 32]} />
        <meshBasicMaterial
          color="#00ff88"
          transparent
          opacity={0.05}
          wireframe
        />
      </mesh>

      {/* Atmosphere */}
      <mesh ref={atmosphereRef} material={atmosphereMaterial}>
        <sphereGeometry args={[2.2, 32, 32]} />
      </mesh>

      {/* Attack beams */}
      {attackBeams.map((beam, i) => (
        <AttackBeam
          key={i}
          start={beam.start}
          end={beam.end}
          color={beam.color}
          speed={0.5}
          delay={beam.delay}
        />
      ))}

      {/* Orbiting satellites */}
      <Satellites />

      {/* Holographic rings */}
      <HoloRings />
    </group>
  );
}

function Satellites() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 6;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const angle = state.clock.elapsedTime * 0.3 + (i * Math.PI * 2) / count;
        const radius = 3 + i * 0.3;
        const tilt = (i / count) * Math.PI * 0.5;
        child.position.set(
          Math.cos(angle) * radius,
          Math.sin(tilt) * Math.sin(angle) * radius,
          Math.cos(tilt) * Math.sin(angle) * radius
        );
      });
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i}>
          <octahedronGeometry args={[0.05, 0]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function HoloRings() {
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.children.forEach((child, i) => {
        child.rotation.x = state.clock.elapsedTime * 0.1 * (i + 1);
        child.rotation.z = state.clock.elapsedTime * 0.05 * (i + 1);
      });
    }
  });

  return (
    <group ref={ringsRef}>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.5, 0.01, 8, 64]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 4, Math.PI / 3, 0]}>
        <torusGeometry args={[2.8, 0.008, 8, 64]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[Math.PI / 6, 0, Math.PI / 4]}>
        <torusGeometry args={[3.1, 0.006, 8, 64]} />
        <meshBasicMaterial color="#8b00ff" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

export function Globe() {
  return <GlobeMesh />;
}
