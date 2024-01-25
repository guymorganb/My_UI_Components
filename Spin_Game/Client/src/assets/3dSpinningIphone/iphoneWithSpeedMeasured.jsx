import React, { useRef, useEffect, useState } from 'react';
import { Box, ChakraProvider, extendTheme, Text, VStack, Input, Button, List, ListItem } from '@chakra-ui/react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import ScoresBoard from './highScores';
const theme = extendTheme({});

function AppPhone() {
    const mountRef = useRef(null);
    const [speed, setSpeed] = useState(0);
    const [mph, setMph] = useState(0);  //state variable to hold mph
    const [phoneModel, setPhoneModel] = useState("");
    const [isMouseDisabled, setIsMouseDisabled] = useState(false);
    const mouseHoldTimeout = useRef(null);
    const mouseDisabledTimeout = useRef(null);
    const phoneLength = 6;  // phone length 6 inches
    const radius = phoneLength * 0.5;  // top left corner of the phone is at a distance equal to radius of phone
    let isMouseDown = false;
    let lastMouseX = null;
    let lastMouseY = null;
    let speedX = 0;
    let speedY = 0;
    let iPhoneModel;

    
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);
        renderer.setClearColor(0xffffff); // set to white since phone is black

        // Ambinent Light
        const ambientLight = new THREE.AmbientLight(0xffffff, 2.0); // white light with intensity of 2
        scene.add(ambientLight);
        
        // Directional Lights
        const directionalLight1 = new THREE.DirectionalLight(0xffffff, 5);
        directionalLight1.position.set(7, -7, 5);
        scene.add(directionalLight1);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 5);
        directionalLight2.position.set(-7, 7, 5);
        scene.add(directionalLight2);

        const directionalLight3 = new THREE.DirectionalLight(0xffffff, 20);
        directionalLight3.position.copy(camera.position); // this will copy the position of the camera
        directionalLight3.position.y -= 1;  // move light down by 2 units along the y-axis
        scene.add(directionalLight3);

        const directionalLight4 = new THREE.DirectionalLight(0xffffff, 20);
        directionalLight3.position.copy(camera.position); // this will copy the position of the camera
        directionalLight3.position.y += 1;  // move light down by 2 units along the y-axis
        scene.add(directionalLight3);
        
        // Four Point Lights
        const pointLight1 = new THREE.PointLight(0xffffff, 3.0); // white light with intensity of 3.0
        pointLight1.position.set(2, 3, 2);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffffff, 3.0);
        pointLight2.position.set(-2, -2, -2);
        scene.add(pointLight2);

        const pointLight3 = new THREE.PointLight(0xffffff, 3.0);
        pointLight3.position.set(2, -2, 2);
        scene.add(pointLight3);

        const pointLight4 = new THREE.PointLight(0xffffff, 3.0);
        pointLight4.position.set(-2, 2, -2);
        scene.add(pointLight4);

        // Hemisphere Light
        const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 5); // with intensity of 5
        scene.add(hemisphereLight);
        


        // Load the iPhone model
        const loader = new GLTFLoader();
        let iPhoneModel;
        let modelPath;
        switch (phoneModel) {
            
            case "Google_Pixel6":
                modelPath = "/Google_Pixel6.glb";
                break;
            case "SamsungS22_Ultra5G":
                modelPath = "/SamsungS22_Ultra5G.glb";
                break;
            // Add more cases as needed
            default:
                modelPath = "/iPhone15_proMax.glb";
        }
        
        loader.load(
            modelPath, // Replace this with the path to your GLB file
            (gltf) => {
                console.log('Model loaded', gltf);
                iPhoneModel = gltf.scene;
                iPhoneModel.scale.set(2, 2, 2); // Adjust scale 
                scene.add(iPhoneModel);
                iPhoneModel.position.set(0, 0, 4);

                // Set initial rotation
                const radians = THREE.MathUtils.degToRad(135);
                iPhoneModel.rotation.y = radians;

            },
            undefined,
            (error) => {
                console.error('An error happened', error);
            }
        );

        camera.position.z = 5;

        function onMouseDown(event) {
            if (!isMouseDisabled) {
              isMouseDown = true;
              lastMouseX = event.clientX;
              lastMouseY = event.clientY;
            
              // disable the mousedown after 3 seconds
              mouseHoldTimeout.current = setTimeout(() => {
                isMouseDown = false;
                setIsMouseDisabled(true);
                // re-enable mousedown after 1.5 seconds
                mouseDisabledTimeout.current = setTimeout(() => {
                  setIsMouseDisabled(false);
                }, 1500);
              }, 1500);
            }
          }
          
          function onMouseUp() {
            isMouseDown = false;
            clearTimeout(mouseHoldTimeout.current);
            clearTimeout(mouseDisabledTimeout.current);
            setIsMouseDisabled(false);
          }

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        

    function onDocumentMouseMove(event) {
            if (isMouseDown && iPhoneModel) {
               const deltaX = event.clientX - lastMouseX;
               const deltaY = event.clientY - lastMouseY;
               speedX = deltaX * 0.01; // save deltaX to speedX
               speedY = deltaY * 0.01; // save deltaY to speedY
               iPhoneModel.rotation.y += speedX;
               iPhoneModel.rotation.x += speedY;
               lastMouseX = event.clientX;
               lastMouseY = event.clientY;
           }
         }

        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mousemove', onDocumentMouseMove);

        const animate = () => {
            requestAnimationFrame(animate);
        // apply air resistance
            if(!isMouseDown) {
                const dragCoefficient = 0.01; // adjust higher for more wind resistance
                speedX -= dragCoefficient * speedX;
                speedY -= dragCoefficient * speedY;
            }
            if (iPhoneModel) {
                iPhoneModel.rotation.y += speedX;
                iPhoneModel.rotation.x += speedY;
        
                calculateSpeed(speedX, setMph);
            }
            renderer.render(scene, camera);
        
            // calculate active spinning speed
            setSpeed(Math.sqrt(speedX * speedX + speedY * speedY));
        };

        animate();

        return () => {
            mountRef.current.removeChild(renderer.domElement);
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onDocumentMouseMove);
            clearTimeout(mouseHoldTimeout.current);
            clearTimeout(mouseDisabledTimeout.current);
          };

    }, [phoneModel]);
    // Function to calculate speed 
    const calculateSpeed = (speed, setMph) => {
        const absSpeed = Math.abs(speed); // use absolute value of speed
        const angularSpeedRPM = absSpeed * (60 / (2 * Math.PI));  // Convert rad/s to RPM
        const distancePerRevolution = 2 * Math.PI * radius;  // Circumference of the circle covered by the corner of phone
        const linearSpeedInchesPerMinute = angularSpeedRPM * distancePerRevolution;  // Calculate the linear speed in inch/min
        const linearSpeedMPH = linearSpeedInchesPerMinute * 60 / (12*5280);  // Convert in/min to miles/hr
        setMph(linearSpeedMPH);
      }
      
    return (
<ChakraProvider theme={theme}>
      <Box as="main" height="100vh" width="100vw" ref={mountRef} />
      <ScoresBoard mr={5} speed={speed} mph={mph} phoneModel={phoneModel} setPhoneModel={setPhoneModel} /> 
    </ChakraProvider>
    );
 }

export default AppPhone;
