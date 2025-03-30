"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// --- Constants ---
const CAR_MODEL_PATH = '/models/car_g.glb'; 
const ROAD_WIDTH = 10;
const ROAD_LENGTH = 500; // Increased for visual continuity
const MAX_SPEED = 0.5;
const ACCELERATION = 0.01;
const DECELERATION = 0.005;
const HANDLING = 0.03;
const FOG_NEAR = 20;
const FOG_FAR = 150; // Adjusted fog distance
const OBSTACLE_COUNT = 8; // Slightly increased obstacle count
const OBSTACLE_MIN_WIDTH = 1.5;
const OBSTACLE_MAX_WIDTH = 2.5;
const OBSTACLE_SPAWN_RANGE_Z = 180; // How far ahead obstacles spawn
const OBSTACLE_RECYCLE_DISTANCE_Z = -20; // How far behind car to recycle
const CAMERA_FOLLOW_DISTANCE = 6;
const CAMERA_HEIGHT = 3.5;
const CAMERA_LOOKAHEAD = -7;
const CAMERA_LERP_FACTOR = 0.08; // Smoother camera factor
const RESIZE_DEBOUNCE_TIME = 100; // ms

// --- Utility ---
const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const GameSection = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [isLoading, setIsLoading] = useState(false); // Loading state for assets

    // --- Game State Refs ---
    const gameStateRef = useRef({
        carSpeed: 0,
        maxSpeed: MAX_SPEED,
        acceleration: ACCELERATION,
        deceleration: DECELERATION,
        handling: HANDLING,
        score: 0,
        isGameOver: false,
    });

    const controlsRef = useRef({
        forward: false,
        backward: false,
        left: false,
        right: false,
    });

    // --- Three.js Objects Ref ---
    // Using a ref to hold Three.js objects helps manage their lifecycle and cleanup
    const threeStuffRef = useRef<{
        scene?: THREE.Scene;
        camera?: THREE.PerspectiveCamera;
        renderer?: THREE.WebGLRenderer;
        road?: THREE.Mesh;
        roadLines?: THREE.Group; // Group for lines
        car?: THREE.Object3D;
        obstacles?: THREE.Mesh[];
        clock?: THREE.Clock;
        animationId?: number;
        directionalLight?: THREE.DirectionalLight;
        ambientLight?: THREE.AmbientLight;
    }>({});

    // --- Load High Score ---
    useEffect(() => {
        const storedHighScore = localStorage.getItem('carGameHighScore');
        if (storedHighScore) {
            setHighScore(parseInt(storedHighScore, 10));
        }
    }, []);

    // --- Save High Score ---
    useEffect(() => {
        if (highScore > 0) { // Avoid saving initial 0
            localStorage.setItem('carGameHighScore', highScore.toString());
        }
    }, [highScore]);

   const handleResize = useCallback(() => {
       const { camera, renderer } = threeStuffRef.current;
       if (!canvasRef.current || !camera || !renderer) return;

       const width = canvasRef.current.clientWidth;
       const height = canvasRef.current.clientHeight;

       camera.aspect = width / height;
       camera.updateProjectionMatrix();
       renderer.setSize(width, height);
   }, []); // No dependencies needed as it reads refs/DOM directly

   const debouncedResize = useCallback(debounce(handleResize, RESIZE_DEBOUNCE_TIME), [handleResize]);


    // --- Main Game Effect ---
    useEffect(() => {
        if (!gameStarted || !canvasRef.current) {
            return;
        }
       // --- Cleanup Function ---
       // Define cleanupThree at the beginning of the effect's scope
       const cleanupThree = () => {
           const { scene, renderer, obstacles = [], car, road, roadLines, animationId } = threeStuffRef.current;

           console.log("Cleaning up Three.js resources...");

           // Stop animation loop
           if (animationId) {
               cancelAnimationFrame(animationId);
           }

           // Remove event listeners
           window.removeEventListener('keydown', handleKeyDown); // Assuming handleKeyDown is defined below
           window.removeEventListener('keyup', handleKeyUp); // Assuming handleKeyUp is defined below
           window.removeEventListener('resize', debouncedResize); // Use the debounced version defined outside

           if (scene) {
               // ... (rest of cleanup code remains the same) ...
                 // Remove lights? Usually not necessary to remove/dispose basic lights unless causing issues.
                 // if (threeStuffRef.current.ambientLight) scene.remove(threeStuffRef.current.ambientLight)
                 // if (threeStuffRef.current.directionalLight) scene.remove(threeStuffRef.current.directionalLight)

           } // end if(scene)

           // Dispose renderer
           if (renderer) {
               renderer.dispose();
           }

           // Clear the refs object
           threeStuffRef.current = {};
       };

       // Check if cleanup needed before initialization (e.g., quick start/stop)
       if (!gameStarted || !canvasRef.current) {
           cleanupThree();
           return;
       }

        // --- Initialize Three.js ---
        const initThree = () => {
            const canvas = canvasRef.current!;
            const { clientWidth, clientHeight } = canvas;

            // Reset game state values
            gameStateRef.current.carSpeed = 0;
            gameStateRef.current.score = 0;
            gameStateRef.current.isGameOver = false;
            setScore(0); // Reset React state score

            // Scene
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0x1a1a2e); // Dark blue background
            scene.fog = new THREE.Fog(0x1a1a2e, FOG_NEAR, FOG_FAR);
            threeStuffRef.current.scene = scene;

            // Camera
            const camera = new THREE.PerspectiveCamera(75, clientWidth / clientHeight, 0.1, 1000);
            camera.position.set(0, CAMERA_HEIGHT, CAMERA_FOLLOW_DISTANCE);
            threeStuffRef.current.camera = camera;

            // Lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Slightly brighter ambient
            scene.add(ambientLight);
            threeStuffRef.current.ambientLight = ambientLight;

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0); // Brighter directional
            directionalLight.position.set(10, 20, 5);
            directionalLight.castShadow = true; // Enable shadows
            directionalLight.shadow.mapSize.width = 1024; // Shadow map quality
            directionalLight.shadow.mapSize.height = 1024;
             // Define shadow camera frustum (adjust as needed for your scene scale)
            directionalLight.shadow.camera.near = 0.5;
            directionalLight.shadow.camera.far = 50;
            directionalLight.shadow.camera.left = -15;
            directionalLight.shadow.camera.right = 15;
            directionalLight.shadow.camera.top = 15;
            directionalLight.shadow.camera.bottom = -15;
            scene.add(directionalLight);
            threeStuffRef.current.directionalLight = directionalLight;

            // Renderer
            const renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: true,
                alpha: true // Keep alpha if needed, but might impact performance slightly
            });
            renderer.setSize(clientWidth, clientHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.shadowMap.enabled = true; // Enable shadow rendering
            renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows
            threeStuffRef.current.renderer = renderer;

            // Clock
            threeStuffRef.current.clock = new THREE.Clock();

            // Initial camera lookAt
            camera.lookAt(0, 0, CAMERA_LOOKAHEAD);

            // Load assets (car model), then set up the rest
            loadAssets();
        };

        // --- Load Assets (Model) ---
        const loadAssets = () => {
            setIsLoading(true);
            const loader = new GLTFLoader();
            loader.load(
                CAR_MODEL_PATH,
                (gltf) => {
                    const carModel = gltf.scene;
                    // Scale and position the loaded model appropriately
                    // These values depend heavily on your specific model! Adjust as needed.
                    carModel.scale.set(0.6, 0.6, 0.6);
                    carModel.position.y = 0.1; // Adjust so wheels touch the ground (approx)
                    carModel.rotation.y = Math.PI; // Rotate if model faces wrong way

                    // Enable shadows for all meshes in the model
                    carModel.traverse((child) => {
                        if (child instanceof THREE.Mesh) {
                            child.castShadow = true;
                            child.receiveShadow = true; // Optional: car parts receiving shadows
                        }
                    });

                    threeStuffRef.current.car = carModel;
                    threeStuffRef.current.scene?.add(carModel);
                    setIsLoading(false);
                    setupSceneAndStart(); // Proceed once model is loaded
                },
                undefined, // Progress callback (optional)
                (error) => {
                    console.error('Error loading car model:', error);
                    // Fallback to simple placeholder car
                    createPlayerCarPlaceholder();
                    setIsLoading(false);
                    setupSceneAndStart(); // Proceed with placeholder
                }
            );
        };

        // --- Setup Scene Contents and Start Game ---
        const setupSceneAndStart = () => {
            if (!threeStuffRef.current.scene || !threeStuffRef.current.car) return;

            createEnvironment();
            createObstacles();
            setupControls();
            startGameLoop();
        };


        // --- Create Placeholder Car (Fallback) ---
        const createPlayerCarPlaceholder = () => {
            if (!threeStuffRef.current.scene) return;
            console.warn("Using placeholder car geometry.");
            const carGroup = new THREE.Group();
            const bodyGeometry = new THREE.BoxGeometry(1.5, 0.6, 3);
            const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x1173E2, roughness: 0.5 });
            const carBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
            carBody.position.y = 0.3; // Center geometry vertically
            carBody.castShadow = true;
            carBody.receiveShadow = true;
            carGroup.add(carBody);
            carGroup.position.y = 0.3; // Raise the whole group so bottom is at y=0

            threeStuffRef.current.car = carGroup;
            threeStuffRef.current.scene.add(carGroup);
        }

        // --- Create Road and Lines ---
        const createEnvironment = () => {
            if (!threeStuffRef.current.scene) return;

            // Road Plane
            const roadGeometry = new THREE.PlaneGeometry(ROAD_WIDTH, ROAD_LENGTH);
            const roadMaterial = new THREE.MeshStandardMaterial({
                color: 0x444444, // Darker grey road
                side: THREE.DoubleSide,
                roughness: 0.9, // Less reflective road
                metalness: 0.1
            });
            const road = new THREE.Mesh(roadGeometry, roadMaterial);
            road.rotation.x = -Math.PI / 2;
            road.position.z = -ROAD_LENGTH / 2 + 50; // Center the long road visually
            road.receiveShadow = true; // Road receives shadows
            threeStuffRef.current.scene.add(road);
            threeStuffRef.current.road = road;

            // Road Lines Group
            const linesGroup = new THREE.Group();
            const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

            // Center dashed lines
            const dashLength = 4;
            const dashGap = 6;
            const numDashes = Math.floor(ROAD_LENGTH / (dashLength + dashGap));
            for (let i = 0; i < numDashes; i++) {
                const lineGeometry = new THREE.PlaneGeometry(0.2, dashLength);
                const line = new THREE.Mesh(lineGeometry, lineMaterial);
                line.rotation.x = -Math.PI / 2;
                // Position dashes along the center, accounting for road's position
                line.position.z = road.position.z + ROAD_LENGTH / 2 - dashLength / 2 - i * (dashLength + dashGap);
                line.position.y = 0.01; // Slightly above road to prevent z-fighting
                linesGroup.add(line);
            }

            // Side lines
            const sideLineGeometry = new THREE.PlaneGeometry(0.2, ROAD_LENGTH);
            const leftLine = new THREE.Mesh(sideLineGeometry, lineMaterial);
            leftLine.rotation.x = -Math.PI / 2;
            leftLine.position.x = -ROAD_WIDTH / 2;
            leftLine.position.z = road.position.z;
             leftLine.position.y = 0.01;
            linesGroup.add(leftLine);

            const rightLine = new THREE.Mesh(sideLineGeometry, lineMaterial);
            rightLine.rotation.x = -Math.PI / 2;
            rightLine.position.x = ROAD_WIDTH / 2;
            rightLine.position.z = road.position.z;
             rightLine.position.y = 0.01;
            linesGroup.add(rightLine);

            threeStuffRef.current.scene.add(linesGroup);
            threeStuffRef.current.roadLines = linesGroup;
        };

        // --- Create Obstacles ---
        const createObstacles = () => {
             if (!threeStuffRef.current.scene) return;

             threeStuffRef.current.obstacles = [];
             const obstacleMaterial = new THREE.MeshStandardMaterial({
                 color: 0xcc0000, // Red obstacles
                 roughness: 0.7,
                 metalness: 0.2
             });

             for (let i = 0; i < OBSTACLE_COUNT; i++) {
                const width = THREE.MathUtils.randFloat(OBSTACLE_MIN_WIDTH, OBSTACLE_MAX_WIDTH);
                const height = THREE.MathUtils.randFloat(0.8, 1.5);
                const depth = THREE.MathUtils.randFloat(0.8, 1.5);
                const obstacleGeometry = new THREE.BoxGeometry(width, height, depth);
                const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial.clone()); // Clone material

                // Position obstacles further ahead initially
                obstacle.position.x = THREE.MathUtils.randFloatSpread(ROAD_WIDTH - width); // Spread within road width
                obstacle.position.y = height / 2 + 0.01; // Place on road surface
                obstacle.position.z = -Math.random() * OBSTACLE_SPAWN_RANGE_Z - 50; // Spread out ahead

                obstacle.castShadow = true;
                obstacle.receiveShadow = true; // Obstacles can receive shadows

                threeStuffRef.current.scene.add(obstacle);
                threeStuffRef.current.obstacles.push(obstacle);
            }
        };

        // --- Resize Handler ---
        // const handleResize = useCallback(() => {
        //     const { camera, renderer } = threeStuffRef.current;
        //     if (!canvasRef.current || !camera || !renderer) return;

        //     const width = canvasRef.current.clientWidth;
        //     const height = canvasRef.current.clientHeight;

        //     camera.aspect = width / height;
        //     camera.updateProjectionMatrix();
        //     renderer.setSize(width, height);
        // }, []); // No dependencies needed as it reads refs/DOM directly

        const debouncedResize = debounce(handleResize, RESIZE_DEBOUNCE_TIME);

        // --- Keyboard Controls ---
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameStateRef.current.isGameOver) return;
            // Prevent page scroll for arrow keys
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
                e.preventDefault();
            }
            switch (e.key) {
                case 'ArrowUp': case 'w': controlsRef.current.forward = true; break;
                case 'ArrowDown': case 's': controlsRef.current.backward = true; break;
                case 'ArrowLeft': case 'a': controlsRef.current.left = true; break;
                case 'ArrowRight': case 'd': controlsRef.current.right = true; break;
            }
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowUp': case 'w': controlsRef.current.forward = false; break;
                case 'ArrowDown': case 's': controlsRef.current.backward = false; break;
                case 'ArrowLeft': case 'a': controlsRef.current.left = false; break;
                case 'ArrowRight': case 'd': controlsRef.current.right = false; break;
            }
        };

        // --- Setup Controls ---
        const setupControls = () => {
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);
            window.addEventListener('resize', debouncedResize);
        };

        // --- Game Loop ---
        const startGameLoop = () => {
            const { scene, camera, renderer, car, obstacles, clock, road, roadLines } = threeStuffRef.current;
            const gameState = gameStateRef.current;
            const controls = controlsRef.current;

            if (!scene || !camera || !renderer || !car || !obstacles || !clock || !road || !roadLines) {
                console.error("Cannot start game loop, essential components missing.");
                return;
            }

            const animate = () => {
                if (gameState.isGameOver) {
                    cancelAnimationFrame(threeStuffRef.current.animationId!);
                    return;
                }

                threeStuffRef.current.animationId = requestAnimationFrame(animate);
                const delta = clock.getDelta(); // Time since last frame

                // --- Handle Car Physics ---
                // Acceleration/Deceleration
                if (controls.forward) {
                    gameState.carSpeed = Math.min(gameState.carSpeed + gameState.acceleration * delta * 60, gameState.maxSpeed); // Scale by delta
                } else if (controls.backward) {
                    gameState.carSpeed = Math.max(gameState.carSpeed - gameState.acceleration * delta * 60, -gameState.maxSpeed / 2);
                } else {
                    // Natural deceleration (friction/drag)
                    const decel = gameState.deceleration * delta * 60;
                    if (gameState.carSpeed > decel) gameState.carSpeed -= decel;
                    else if (gameState.carSpeed < -decel) gameState.carSpeed += decel;
                    else gameState.carSpeed = 0;
                }

                // Steering (only when moving)
                const turnSpeed = gameState.handling * delta * 60;
                if (Math.abs(gameState.carSpeed) > 0.01) {
                    const turnDirection = gameState.carSpeed > 0 ? 1 : -1; // Reverse steering when reversing
                    if (controls.left) {
                        car.rotation.y += turnSpeed * turnDirection;
                    }
                    if (controls.right) {
                        car.rotation.y -= turnSpeed * turnDirection;
                    }
                }

                // --- Update Car Position ---
                // Calculate forward vector based on car's Y rotation
                const forward = new THREE.Vector3(Math.sin(car.rotation.y), 0, Math.cos(car.rotation.y));
                // Multiply by speed and delta time
                const velocity = forward.multiplyScalar(-gameState.carSpeed * delta * 60); // Use scaled speed
                car.position.add(velocity);

                // Keep car within road boundaries
                const halfRoadWidth = ROAD_WIDTH / 2;
                const carWidth = 1.5; // Approximate car width for clamping
                car.position.x = THREE.MathUtils.clamp(car.position.x, -halfRoadWidth + carWidth / 2, halfRoadWidth - carWidth / 2);

                // --- Infinite Road Illusion ---
                // Instead of moving the car infinitely, move the environment (road, lines, obstacles)
                // towards the car. The car's Z position effectively stays near 0 relative to the world origin.
                const effectiveSpeed = gameState.carSpeed * delta * 60; // Scaled speed for env movement
                road.position.z += effectiveSpeed;
                roadLines.position.z += effectiveSpeed;

                // Reset road position when it moves too far
                if (road.position.z > ROAD_LENGTH / 2) {
                    road.position.z -= ROAD_LENGTH;
                    roadLines.position.z -= ROAD_LENGTH; // Keep lines synced with road segment
                }

                // --- Update Obstacles & Check Collisions ---
                const carBox = new THREE.Box3().setFromObject(car); // Update car bounding box each frame

                obstacles.forEach(obstacle => {
                    // Move obstacle towards the player (effectively)
                    obstacle.position.z += effectiveSpeed;

                    // Recycle obstacles that move behind the camera
                    if (obstacle.position.z > CAMERA_FOLLOW_DISTANCE + 10) { // Recycle point based on camera distance
                        obstacle.position.z = OBSTACLE_RECYCLE_DISTANCE_Z - Math.random() * OBSTACLE_SPAWN_RANGE_Z;
                        const obstacleWidth = (obstacle.geometry as THREE.BoxGeometry).parameters.width;
                        obstacle.position.x = THREE.MathUtils.randFloatSpread(ROAD_WIDTH - obstacleWidth);

                        // Increase score for passing an obstacle
                        gameState.score += 10;
                        setScore(gameState.score); // Update React state
                    }

                    // Collision detection
                    const obstacleBox = new THREE.Box3().setFromObject(obstacle);
                    if (carBox.intersectsBox(obstacleBox)) {
                        endGame();
                    }
                });

                // --- Update Camera ---
                // Use lerp for smoother camera movement
                const targetCameraX = car.position.x; // Follow car X directly (or lerp slightly)
                const targetCameraZ = car.position.z + CAMERA_FOLLOW_DISTANCE; // Maintain distance behind car

                camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCameraX, CAMERA_LERP_FACTOR);
                camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCameraZ, CAMERA_LERP_FACTOR);

                // Lerp the lookAt target as well for smoother rotation
                const lookAtTarget = new THREE.Vector3(
                    car.position.x,
                    car.position.y + 0.5, // Look slightly above the car's base
                    car.position.z + CAMERA_LOOKAHEAD
                );
                camera.lookAt(lookAtTarget);


                // --- Render ---
                renderer.render(scene, camera);
            };

            animate(); // Start the loop
        };

        // --- End Game ---
        const endGame = () => {
            if (gameStateRef.current.isGameOver) return; // Prevent multiple calls

            gameStateRef.current.isGameOver = true;
            // Stop the animation loop is handled within animate() check

            // Update high score if current score is higher
            if (gameStateRef.current.score > highScore) {
                setHighScore(gameStateRef.current.score);
            }

            // Set React state to trigger UI change (show start button again)
            setGameStarted(false);

             // Optional: Add visual/audio feedback for game over here (e.g., screen shake, sound)
            console.log("Game Over! Score:", gameStateRef.current.score);
        };

        // --- Cleanup Function ---
        // const cleanupThree = () => {
        //     const { scene, renderer, obstacles = [], car, road, roadLines, animationId } = threeStuffRef.current;

        //     console.log("Cleaning up Three.js resources...");

        //     // Stop animation loop
        //     if (animationId) {
        //         cancelAnimationFrame(animationId);
        //     }

        //     // Remove event listeners
        //     window.removeEventListener('keydown', handleKeyDown);
        //     window.removeEventListener('keyup', handleKeyUp);
        //     window.removeEventListener('resize', debouncedResize);


        //     if (scene) {
        //         // Remove and dispose obstacles
        //         obstacles.forEach(obstacle => {
        //             scene.remove(obstacle);
        //             obstacle.geometry.dispose();
        //             if (Array.isArray(obstacle.material)) {
        //                 obstacle.material.forEach(m => m.dispose());
        //             } else {
        //                 obstacle.material.dispose();
        //             }
        //         });
        //         threeStuffRef.current.obstacles = [];

        //         // Remove and dispose car model/placeholder
        //         if (car) {
        //             scene.remove(car);
        //             car.traverse((object) => {
        //                 if (object instanceof THREE.Mesh) {
        //                     object.geometry.dispose();
        //                     // Dispose materials carefully, avoid double disposal if shared
        //                     if (Array.isArray(object.material)) {
        //                         object.material.forEach(material => material.dispose());
        //                     } else {
        //                         object.material.dispose();
        //                     }
        //                 }
        //             });
        //         }

        //          // Remove and dispose road and lines
        //         if (road) {
        //             scene.remove(road);
        //             road.geometry.dispose();
        //             (road.material as THREE.Material).dispose();
        //         }
        //          if (roadLines) {
        //             scene.remove(roadLines);
        //             // Dispose line geometries/materials if necessary (basic materials often okay)
        //             roadLines.traverse((object) => {
        //                 if (object instanceof THREE.Mesh) {
        //                     object.geometry.dispose();
        //                      if (Array.isArray(object.material)) {
        //                         object.material.forEach(material => material.dispose());
        //                     } else {
        //                         object.material.dispose();
        //                     }
        //                 }
        //             });
        //         }

        //          // Remove lights? Usually not necessary to remove/dispose basic lights unless causing issues.
        //          // if (threeStuffRef.current.ambientLight) scene.remove(threeStuffRef.current.ambientLight)
        //          // if (threeStuffRef.current.directionalLight) scene.remove(threeStuffRef.current.directionalLight)

        //     } // end if(scene)

        //     // Dispose renderer
        //     if (renderer) {
        //         renderer.dispose();
        //         // Optional: Force context loss if issues persist, but usually dispose is enough
        //         // renderer.forceContextLoss();
        //     }

        //     // Clear the refs object
        //     threeStuffRef.current = {};
        // };

        // --- Start Initialization ---
        initThree();

        // --- Return Cleanup Function ---
        return cleanupThree;

    }, [gameStarted, highScore, handleResize]); // Include handleResize derived from useCallback

    // --- Start Game Button Handler ---
    const startGame = () => {
        setScore(0); // Reset score display explicitly on start
        setGameStarted(true);
    };

    // --- Touch Controls Handler ---
    const handleControlPress = useCallback((control: 'forward' | 'backward' | 'left' | 'right', isPressed: boolean) => {
        if (gameStateRef.current.isGameOver) return;
        controlsRef.current[control] = isPressed;
    }, []);


    return (
        <section id="game" className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-16 text-center">
                    Enough Bragging About Me<br/>{" "}
                    <span className="text-[#1173E2] text-2xl md:text-3xl">Now Let's Have Some Fun</span>
                </h2>

                <div className="max-w-4xl mx-auto bg-card rounded-lg px-4 md:px-6 shadow-lg border border-border">
                    <div className="text-center">
                        {!gameStarted && !isLoading && ( 
                            <div className="space-y-4 py-6">
                                {gameStateRef.current.isGameOver && score > 0 && ( 
                                     <p className="text-xl font-bold text-primary mt-4">Game Over! Final Score: {score}</p>
                                )}
                                <Button onClick={startGame} className="px-8 py-3 text-lg">
                                    {highScore > 0 || score > 0 ? "Drive Again" : "Start Driving"}
                                </Button>
                                <p className="text-muted-foreground">
                                    Drive the car, avoid obstacles. Use Arrow Keys (or WASD) or on-screen controls.
                                </p>
                            </div>
                        )}
                        <div className="flex justify-between items-center px-2 my-2">
                            <p className="text-lg font-medium text-foreground">Score: {score}</p>
                            <p className="text-lg font-medium text-foreground">High Score: {highScore}</p>
                        </div>
                    </div>

                    {/* Canvas and Overlay Container */}
                    <div className="aspect-video w-full max-w-4xl mx-auto relative rounded-lg overflow-hidden border border-border">
                        {/* Canvas takes full space */}
                        <canvas
                            ref={canvasRef}
                            className="block w-full h-full"
                        />

                        {/* Loading Overlay */}
                        {isLoading && (
                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
                                <p className="text-2xl font-semibold text-primary-foreground animate-pulse">Loading 3D Assets...</p>
                            </div>
                        )}

                         {/* Initial State / Game Over Overlay (Show when not started AND not loading) */}
                        {!gameStarted && !isLoading && (
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-blue-900/60 flex items-center justify-center z-10 pointer-events-none">
                                <div className="text-4xl font-bold text-primary-foreground opacity-80">
                                    {highScore === 0 && score === 0 ? "Ready to Drive?" : `Score: ${score}`}
                                </div>
                            </div>
                        )}


                        {/* On-screen controls (visible only when game is actively running) */}
                        {gameStarted && !isLoading && (
                            <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center z-30 select-none">
                                {/* Up Button */}
                                <button
                                    className="w-16 h-16 bg-black/50 rounded-full mb-2 flex items-center justify-center active:bg-black/70"
                                    onTouchStart={() => handleControlPress('forward', true)}
                                    onTouchEnd={() => handleControlPress('forward', false)}
                                    onMouseDown={() => handleControlPress('forward', true)}
                                    onMouseUp={() => handleControlPress('forward', false)}
                                    onMouseLeave={() => handleControlPress('forward', false)} // Handle leaving while pressed
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                    </svg>
                                </button>

                                <div className="flex justify-center gap-3">
                                    {/* Left Button */}
                                    <button
                                        className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center active:bg-black/70"
                                        onTouchStart={() => handleControlPress('left', true)}
                                        onTouchEnd={() => handleControlPress('left', false)}
                                        onMouseDown={() => handleControlPress('left', true)}
                                        onMouseUp={() => handleControlPress('left', false)}
                                         onMouseLeave={() => handleControlPress('left', false)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>

                                    {/* Down Button */}
                                     <button
                                        className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center active:bg-black/70"
                                        onTouchStart={() => handleControlPress('backward', true)}
                                        onTouchEnd={() => handleControlPress('backward', false)}
                                        onMouseDown={() => handleControlPress('backward', true)}
                                        onMouseUp={() => handleControlPress('backward', false)}
                                         onMouseLeave={() => handleControlPress('backward', false)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>


                                    {/* Right Button */}
                                    <button
                                        className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center active:bg-black/70"
                                        onTouchStart={() => handleControlPress('right', true)}
                                        onTouchEnd={() => handleControlPress('right', false)}
                                        onMouseDown={() => handleControlPress('right', true)}
                                        onMouseUp={() => handleControlPress('right', false)}
                                         onMouseLeave={() => handleControlPress('right', false)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div> {/* End Canvas/Overlay Container */}
                </div> {/* End Card */}
            </div> {/* End Container */}
        </section>
    );
};

export default GameSection;