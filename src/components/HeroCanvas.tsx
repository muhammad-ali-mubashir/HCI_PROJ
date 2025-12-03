import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

export const HeroCanvas = () => {
    return (
        <div className="absolute inset-0 -z-10 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Stars 
                    radius={50} 
                    depth={50} 
                    count={2000} 
                    factor={2} 
                    saturation={0} 
                    fade 
                    speed={0.5} 
                />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background opacity-40" />
        </div>
    );
};
