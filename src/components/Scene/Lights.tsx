"use client";

export function CyberVerseLights() {
  return (
    <>
      <ambientLight intensity={0.08} color="#001133" />
      <directionalLight
        position={[10, 20, 10]}
        intensity={0.15}
        color="#00ff88"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[0, 10, 0]} intensity={2} color="#00ff88" distance={30} decay={2} />
      <pointLight position={[-8, 8, -6]} intensity={0.8} color="#00ff88" distance={15} decay={2} />
      <pointLight position={[0, 12, 0]} intensity={1.5} color="#00d4ff" distance={20} decay={2} />
      <pointLight position={[8, 8, 4]} intensity={0.8} color="#ff8800" distance={15} decay={2} />
      <pointLight position={[-8, 6, 4]} intensity={0.6} color="#ff0040" distance={12} decay={2} />
      <pointLight position={[8, 6, -6]} intensity={0.6} color="#8b00ff" distance={12} decay={2} />
      <pointLight position={[-4, 5, -10]} intensity={0.4} color="#00ffcc" distance={10} decay={2} />
      <pointLight position={[4, 6, -10]} intensity={0.4} color="#4488ff" distance={10} decay={2} />
    </>
  );
}
