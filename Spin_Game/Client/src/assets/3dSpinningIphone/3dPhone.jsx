import React, { Suspense, useEffect  } from 'react';
import { Canvas } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DirectionalLight as ThreeDirectionalLight } from 'three';

export const Iphone = () => {
  // Define animation properties using react-spring for a slower rotation
  const props = useSpring({
    to: { rotation: [0, 2 * Math.PI, 0] },
    from: { rotation: [0, 0, 0] },
    loop: true,
    config: { duration: 10000 }, // speed (in milliseconds)
  });

  //  render 3D model
  const PhoneModel = () => {
    const gltf = useLoader(GLTFLoader, './iphone.glb'); //  .glb file
    return <primitive object={gltf.scene} />;
  };

  const cameraProps = {
    fov: 75,
    position:[0,0,.2]
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
          <PhoneModel />
        </a.mesh>
      </Suspense>
    </Canvas>
  );
};
