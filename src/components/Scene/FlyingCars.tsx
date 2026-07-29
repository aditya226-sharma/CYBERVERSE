"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Car {
  path: THREE.Vector3[];
  speed: number;
  color: string;
  offset: number;
}

export function FlyingCars() {
  const groupRef = useRef<THREE.Group>(null);
  const carRefs = useRef<THREE.Mesh[]>([]);

  const cars = useMemo<Car[]>(() => {
    const paths = [
      [
        new THREE.Vector3(-30, 3, -6),
        new THREE.Vector3(-10, 3.5, -6),
        new THREE.Vector3(10, 3, -6),
        new THREE.Vector3(30, 3.5, -6),
      ],
      [
        new THREE.Vector3(30, 4, 4),
        new THREE.Vector3(10, 3.5, 4),
        new THREE.Vector3(-10, 4, 4),
        new THREE.Vector3(-30, 3.5, 4),
      ],
      [
        new THREE.Vector3(-30, 2.5, -10),
        new THREE.Vector3(0, 3, -10),
        new THREE.Vector3(30, 2.5, -10),
      ],
      [
        new THREE.Vector3(30, 5, 10),
        new THREE.Vector3(0, 4.5, 10),
        new THREE.Vector3(-30, 5, 10),
      ],
      [
        new THREE.Vector3(-30, 3, 0),
        new THREE.Vector3(0, 3.5, 0),
        new THREE.Vector3(30, 3, 0),
      ],
    ];
    const colors = ["#00ff88", "#00d4ff", "#ff0088", "#ff8800", "#8b00ff"];
    return paths.map((path, i) => ({
      path,
      speed: 3 + Math.random() * 4,
      color: colors[i % colors.length],
      offset: Math.random() * 100,
    }));
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    cars.forEach((car, i) => {
      const mesh = carRefs.current[i];
      if (!mesh) return;

      const progress = ((t * car.speed + car.offset) % 100) / 100;
      const curve = new THREE.CatmullRomCurve3(car.path);
      const pos = curve.getPoint(progress);
      const tangent = curve.getTangent(progress);

      mesh.position.copy(pos);
      mesh.position.y += Math.sin(t * 2 + i) * 0.1;

      const target = pos.clone().add(tangent);
      mesh.lookAt(target);

      // Trail glow
      const trail = mesh.children[0] as THREE.Mesh;
      if (trail) {
        (trail.material as THREE.MeshBasicMaterial).opacity =
          0.3 + Math.sin(t * 5 + i) * 0.1;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {cars.map((car, i) => (
        <group key={i}>
          <mesh
            ref={(el) => {
              if (el) carRefs.current[i] = el;
            }}
          >
            <boxGeometry args={[0.4, 0.1, 0.15]} />
            <meshBasicMaterial color={car.color} transparent opacity={0.9} />
            {/* Headlight trail */}
            <mesh position={[-0.3, 0, 0]}>
              <boxGeometry args={[0.5, 0.02, 0.02]} />
              <meshBasicMaterial
                color={car.color}
                transparent
                opacity={0.4}
              />
            </mesh>
          </mesh>
        </group>
      ))}
    </group>
  );
}
