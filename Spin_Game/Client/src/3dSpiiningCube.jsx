import React, { useRef, useEffect } from 'react';
import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react';
import * as THREE from 'three';
import { Raycaster, Vector2 } from 'three';

// Extend the default Chakra theme (if needed).
const theme = extendTheme({});

function App() {
    // Reference to the DOM element where Three.js scene will be mounted.
    const mountRef = useRef(null);

    // State variables to manage mouse interactions.
    let isMouseDown = false;   // Check if mouse is pressed down.
    let lastMouseX = null;     // Last recorded mouse X position.
    let lastMouseY = null;     // Last recorded mouse Y position.

    // Three.js utilities for picking objects in the scene and tracking mouse positions.
    const raycaster = new THREE.Raycaster();
    const mouse = new Vector2();

    // Track which cube (if any) is currently selected.
    let SELECTED;

    // This useEffect hook runs once on component mount.
    useEffect(() => {
        // Create a new Three.js scene.
        const scene = new THREE.Scene();
        // Create a new perspective camera.
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        // Create a WebGL renderer with antialiasing.
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Attach the renderer's output (canvas) to our React component.
        mountRef.current.appendChild(renderer.domElement);

        // Load a texture for the cube.
        const textureLoader = new THREE.TextureLoader();
        const cubeTexture = textureLoader.load("https://i.imgur.com/tTbzG1j.jpg");
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ map: cubeTexture });
        const cube = new THREE.Mesh(geometry, material);

        // Add the cube to the scene.
        scene.add(cube);

        // Clone the first cube.
        const cube2 = cube.clone();

        // Set the position of the first cube 1 unit above the center.
        cube.position.set(0, 1, 0);

        // Set the position of the cloned cube 1 unit below the center.
        cube2.position.set(0, -1, 0);

        // Add the cloned cube to the scene.
        scene.add(cube2);

        // Initially set the selected cube to the first cube.
        SELECTED = cube;

        // Position the camera.
        camera.position.z = 5;

        // Add event listeners for mouse interactions.
        document.addEventListener('mousedown', onMouseDown, false);
        document.addEventListener('mouseup', onMouseUp, false);
        document.addEventListener('mousemove', onDocumentMouseMove, false);

        // Store the rotation state of both cubes.
        const cubesState = {
            cube1: {
                object: null,
                rotationVelocityX: 0,
                rotationVelocityY: 0,
            },
            cube2: {
                object: null,
                rotationVelocityX: 0,
                rotationVelocityY: 0,
            },
        };

        // Animation loop.
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate both cubes based on their respective velocities.
            cube.rotation.x += cubesState.cube1.rotationVelocityY;
            cube.rotation.y += cubesState.cube1.rotationVelocityX;
            cube2.rotation.x += cubesState.cube2.rotationVelocityY;
            cube2.rotation.y += cubesState.cube2.rotationVelocityX;

            // Render the scene through the camera.
            renderer.render(scene, camera);
        };
        animate();

        // Event listener functions.
        function onMouseDown(event) {
            // Only consider left mouse button.
            if (event.button !== 0) return;

            // Convert mouse position into [-1, 1] x [-1, 1] coordinate system.
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Find intersected objects.
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects([cube, cube2]);

            if (intersects.length > 0) {
                SELECTED = intersects[0].object;
                isMouseDown = true;
                lastMouseX = event.clientX;
                lastMouseY = event.clientY;
            }
        }

        function onMouseUp(event) {
            if (event.button === 0) {
                isMouseDown = false;
            }
        }

        function onDocumentMouseMove(event) {
            if (isMouseDown) {
                if (SELECTED) {
                    const velocity = SELECTED === cube ? cubesState.cube1 : cubesState.cube2;
                    velocity.rotationVelocityX = (event.clientX - lastMouseX) * 0.01;
                    velocity.rotationVelocityY = (event.clientY - lastMouseY) * 0.01;
                }
                lastMouseX = event.clientX;
                lastMouseY = event.clientY;
            }
        }

        // Cleanup on component unmount.
        return () => {
            mountRef.current.removeChild(renderer.domElement);
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onDocumentMouseMove);
        }
    }, []);

    // Render our React component.
    return (
        <ChakraProvider theme={theme}>
            <Box as="main" height="100vh" width="100vw" ref={mountRef}></Box>  // Mounting point for Three.js scene.
        </ChakraProvider>
    );
}

export default App;