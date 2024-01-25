import React, { Suspense, useEffect  } from 'react';
import { Canvas } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DirectionalLight as ThreeDirectionalLight } from 'three';

export const DesktopPc = () => {
  const largeNumber = 100 * Math.PI
  // Define animation properties using react-spring for a slower rotation
  const props = useSpring({
    from: { rotation: [1, 0, 0] },
    to: async (next) => {
      while (1) {
        await next({ rotation: [0, largeNumber, 0] })
      }
    },
    loop: true,
    config: { duration: 1000000 }, // speed (in milliseconds)
  });

  //  render 3D model
  const DesktopPc = () => {
    const gltf = useLoader(GLTFLoader, '/pc.glb'); //  .glb file
    return <primitive object={gltf.scene} />;
  };

  const cameraProps = {
    fov: 98,
    position:[5,5,11]
  }

  return (

    <Canvas camera={cameraProps}>
      <Suspense fallback={null}>
        {/* Basic ambient light */}
        <ambientLight intensity={2.0} />

        {/* Three.js Directional light */}
        <hemisphereLight skyColor={0xffffbb} groundColor={0x080820} intensity={5} />

        <pointLight position={[2, 3, 2]} intensity={3.0} />
        <pointLight position={[-2, -2, -2]} intensity={3.0} />
        <pointLight position={[2, -2, 2]} intensity={3.0} />
        <pointLight position={[-2, 2, -2]} intensity={3.0} />

        <primitive object={new ThreeDirectionalLight(0xffffff, 5)} position={[7, -7, 5]} />
        <primitive object={new ThreeDirectionalLight(0xffffff, 5)} position={[-7, 7, 5]} />
        <primitive object={new ThreeDirectionalLight(0xffffff, 6)} position={cameraProps.position} />

        {/* Animated mesh */}
        <a.mesh {...props}>
          <DesktopPc />
        </a.mesh>
      </Suspense>
    </Canvas>

  );
};
