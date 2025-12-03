import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedSphere = ({ position, color, scale }: { position: [number, number, number], color: string, scale: number }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
            <Sphere args={[1, 32, 32]} position={position} scale={scale} ref={meshRef}>
                <MeshDistortMaterial
                    color={color}
                    attach="material"
                    distort={0.25}
                    speed={1.5}
                    roughness={0.3}
                    metalness={0.6}
                />
            </Sphere>
        </Float>
    );
};

export const HeroCanvas = () => {
    return (
        <div className="absolute inset-0">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 10, 5]} intensity={0.5} color="#F5F1E8" />
                <pointLight position={[-10, -10, -5]} intensity={0.3} color="#E8DCC4" />

                <Stars radius={100} depth={50} count={1500} factor={2} saturation={0.1} fade speed={0.3} />

                {/* Subtle warm spheres for background */}
                <AnimatedSphere position={[3, 1, -3]} color="#E8DCC4" scale={0.8} />
                <AnimatedSphere position={[-3, -1, -4]} color="#F5F1E8" scale={0.6} />
                <AnimatedSphere position={[0, 2, -5]} color="#D4C5A9" scale={0.7} />
            </Canvas>
        </div>
    );
};
