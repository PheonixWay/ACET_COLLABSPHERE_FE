import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Sparkles } from '@react-three/drei';

// Component that loads the "Need Some Space" model
function SpaceModel(props) {
  const group = useRef();
  const { scene } = useGLTF('/need_some_space.glb');

  // Auto-rotate the model
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.1;
    }
  });

  return <primitive ref={group} object={scene} scale={2.5} position={[0, -2.5, 0]} {...props} />;
}

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 1, 8], fov: 40 }}>
      <ambientLight intensity={0.5} />
      <directionalLight
        intensity={2.0}
        position={[10, 10, 10]}
        color="#ffffff"
      />
      
      <Suspense fallback={null}>
        <SpaceModel />
      </Suspense>

      {/* Starfield background */}
      <Sparkles
        count={1500}
        speed={0.1}
        opacity={0.8}
        color="white"
        size={0.7}
        scale={[150, 150, 150]}
      />

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.6}
        enableZoom={false}
        enablePan={false}
        minDistance={4}
        maxDistance={15}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
};

export default Scene;
