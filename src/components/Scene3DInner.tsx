"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 1500;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 25;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
    const color = Math.random() > 0.5 ? new THREE.Color("#00D4FF") : new THREE.Color("#7B2FFF");
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.1;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} vertexColors transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function WireframeGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.04;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4}>
      <mesh ref={meshRef} position={[0, 0, -3]}>
        <icosahedronGeometry args={[2, 1]} />
        <meshBasicMaterial color="#7B2FFF" wireframe transparent opacity={0.12} />
      </mesh>
    </Float>
  );
}

function RotatingRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1Ref.current) { ring1Ref.current.rotation.x = t * 0.25; ring1Ref.current.rotation.y = t * 0.15; }
    if (ring2Ref.current) { ring2Ref.current.rotation.x = t * 0.15; ring2Ref.current.rotation.z = t * 0.25; }
    if (ring3Ref.current) { ring3Ref.current.rotation.y = t * 0.3; ring3Ref.current.rotation.z = t * 0.08; }
  });

  return (
    <group position={[0, 0, -5]}>
      <mesh ref={ring1Ref}><torusGeometry args={[3, 0.008, 16, 100]} /><meshBasicMaterial color="#00D4FF" transparent opacity={0.25} /></mesh>
      <mesh ref={ring2Ref}><torusGeometry args={[3.5, 0.006, 16, 100]} /><meshBasicMaterial color="#7B2FFF" transparent opacity={0.15} /></mesh>
      <mesh ref={ring3Ref}><torusGeometry args={[4, 0.004, 16, 100]} /><meshBasicMaterial color="#00D4FF" transparent opacity={0.08} /></mesh>
    </group>
  );
}

export default function Scene3DInner() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.4} color="#7B2FFF" />
        <pointLight position={[-10, -10, -10]} intensity={0.2} color="#00D4FF" />
        <ParticleField />
        <WireframeGeometry />
        <RotatingRings />
      </Canvas>
    </div>
  );
}
