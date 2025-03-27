"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const GameSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Game state
  const gameStateRef = useRef({
    carSpeed: 0,
    maxSpeed: 0.5,
    acceleration: 0.01,
    deceleration: 0.005,
    handling: 0.03,
    score: 0,
    isGameOver: false,
  });

  // Controls state
  const controlsRef = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    if (!gameStarted || !canvasRef.current) return;

    // Three.js variables
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let road: THREE.Mesh;
    let car: THREE.Object3D;
    let obstacles: THREE.Mesh[] = [];
    let animationId: number;
    let clock = new THREE.Clock();

    // Reset game state
    const gameState = gameStateRef.current;
    gameState.carSpeed = 0;
    gameState.score = 0;
    gameState.isGameOver = false;
    setScore(0);

    // Setup scene
    const initScene = () => {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x1a1a2e);
      
      // Add fog for depth perception - increased fog distance
      scene.fog = new THREE.Fog(0x1a1a2e, 20, 200);
      
      // Camera
      camera = new THREE.PerspectiveCamera(
        75,
        canvasRef.current!.clientWidth / canvasRef.current!.clientHeight,
        0.1,
        1000
      );
      camera.position.set(0, 3, 5);
      camera.lookAt(0, 0, -10);
      
      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(10, 20, 0);
      scene.add(directionalLight);
      
      // Renderer
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        antialias: true,
        alpha: true
      });
      renderer.setSize(canvasRef.current!.clientWidth, canvasRef.current!.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Create road
      createRoad();
      
      // Create simple car
      createCar();
      
      // Create initial obstacles
      createObstacles();
    };
    
    // Create infinite road
    const createRoad = () => {
      // Create a longer road for better visuals
      const roadGeometry = new THREE.PlaneGeometry(10, 500);
      const roadMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        side: THREE.DoubleSide,
        roughness: 0.8
      });
      
      road = new THREE.Mesh(roadGeometry, roadMaterial);
      road.rotation.x = -Math.PI / 2;
      road.position.z = -250; // Position it further back to extend into the distance
      scene.add(road);
      
      // Add road lines
      addRoadLines();
    };
    
    // Add center and side lines to road
    const addRoadLines = () => {
      // Center line - more segments for longer road
      for (let i = 0; i < 50; i++) {
        const lineGeometry = new THREE.PlaneGeometry(0.2, 2);
        const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const line = new THREE.Mesh(lineGeometry, lineMaterial);
        line.rotation.x = -Math.PI / 2;
        line.position.z = -i * 10;
        scene.add(line);
      }
      
      // Side lines - longer to match road
      const leftLineGeometry = new THREE.PlaneGeometry(0.2, 500);
      const rightLineGeometry = new THREE.PlaneGeometry(0.2, 500);
      const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      
      const leftLine = new THREE.Mesh(leftLineGeometry, lineMaterial);
      leftLine.rotation.x = -Math.PI / 2;
      leftLine.position.x = -5;
      leftLine.position.z = -250;
      scene.add(leftLine);
      
      const rightLine = new THREE.Mesh(rightLineGeometry, lineMaterial);
      rightLine.rotation.x = -Math.PI / 2;
      rightLine.position.x = 5;
      rightLine.position.z = -250;
      scene.add(rightLine);
    };

    // Create simple car model
    const createCar = () => {
      // Create a simple car shape as a placeholder
      // In a production app, you'd load a proper 3D model with GLTFLoader
      const carGroup = new THREE.Group();

      // Car body
      const bodyGeometry = new THREE.BoxGeometry(1.5, 0.5, 3);
      const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x1173E2 });
      const carBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
      carBody.position.y = 0.5;
      carGroup.add(carBody);

      // Car cabin
      const cabinGeometry = new THREE.BoxGeometry(1.2, 0.4, 1.5);
      const cabinMaterial = new THREE.MeshStandardMaterial({ color: 0x2a80e3 });
      const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
      cabin.position.y = 1;
      cabin.position.z = -0.2;
      carGroup.add(cabin);

      // Wheels
      const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 16);
      const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });

      const frontLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      frontLeftWheel.rotation.z = Math.PI / 2;
      frontLeftWheel.position.set(-1, 0.4, -1);
      carGroup.add(frontLeftWheel);

      const frontRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      frontRightWheel.rotation.z = Math.PI / 2;
      frontRightWheel.position.set(1, 0.4, -1);
      carGroup.add(frontRightWheel);

      const backLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      backLeftWheel.rotation.z = Math.PI / 2;
      backLeftWheel.position.set(-1, 0.4, 1);
      carGroup.add(backLeftWheel);

      const backRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      backRightWheel.rotation.z = Math.PI / 2;
      backRightWheel.position.set(1, 0.4, 1);
      carGroup.add(backRightWheel);

      // Lights
      const headlightGeometry = new THREE.CircleGeometry(0.2, 16);
      const headlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffcc });

      const leftHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
      leftHeadlight.position.set(-0.5, 0.7, -1.5);
      leftHeadlight.rotation.y = Math.PI;
      carGroup.add(leftHeadlight);

      const rightHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
      rightHeadlight.position.set(0.5, 0.7, -1.5);
      rightHeadlight.rotation.y = Math.PI;
      carGroup.add(rightHeadlight);

      carGroup.position.y = 0.4;
      carGroup.position.z = 0;

      car = carGroup;
      scene.add(car);
    };

    // Create random obstacles
    const createObstacles = () => {
      // Clear previous obstacles
      obstacles.forEach(obstacle => scene.remove(obstacle));
      obstacles = [];
      
      // Create new obstacles - reduced from 10 to 6 for less frequency
      for (let i = 0; i < 6; i++) {
        const width = Math.random() * 1 + 2; // Wider
        const height = Math.random() * 0.5 + 0.5;
        const depth = Math.random() * 0.5 + 0.5;
        
        const obstacleGeometry = new THREE.BoxGeometry(width, height, depth);
        const obstacleMaterial = new THREE.MeshStandardMaterial({
          color: Math.random() > 0.5 ? 0x333333 : 0x222222, // Dark gray colors
          roughness: 0.8
        });
        
        const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
        
        // Random position - more spread out distance
        obstacle.position.x = (Math.random() - 0.5) * 8;
        obstacle.position.y = height / 2;
        obstacle.position.z = -Math.random() * 150 - 20; // More spread out along the road
        
        scene.add(obstacle);
        obstacles.push(obstacle);
      }
    };

    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;

      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Game loop
    const animate = () => {
      if (gameState.isGameOver) {
        cancelAnimationFrame(animationId);
        return;
      }
      
      const delta = clock.getDelta();
      const controls = controlsRef.current;
      
      // Handle car movement
      if (controls.forward) {
        gameState.carSpeed = Math.min(gameState.carSpeed + gameState.acceleration, gameState.maxSpeed);
      } else if (controls.backward) {
        gameState.carSpeed = Math.max(gameState.carSpeed - gameState.acceleration, -gameState.maxSpeed / 2);
      } else {
        // Natural deceleration
        if (gameState.carSpeed > 0) {
          gameState.carSpeed = Math.max(gameState.carSpeed - gameState.deceleration, 0);
        } else if (gameState.carSpeed < 0) {
          gameState.carSpeed = Math.min(gameState.carSpeed + gameState.deceleration, 0);
        }
      }
      
      // Turn left/right when moving
      if (Math.abs(gameState.carSpeed) > 0.05) {
        if (controls.left) {
          car.rotation.y += gameState.handling * (gameState.carSpeed > 0 ? 1 : -1);
        }
        if (controls.right) {
          car.rotation.y -= gameState.handling * (gameState.carSpeed > 0 ? 1 : -1);
        }
      }
      
      // Calculate forward vector based on car's rotation
      const forwardVector = new THREE.Vector3(
        Math.sin(car.rotation.y),
        0,
        Math.cos(car.rotation.y)
      );
      
      // Move car in its forward direction
      car.position.add(forwardVector.clone().multiplyScalar(-gameState.carSpeed));
      
      // Keep car within road boundaries
      car.position.x = THREE.MathUtils.clamp(car.position.x, -4, 4);
      
      // Track car's total forward movement to create infinite road effect
      // If car reaches near the end of the road, reset its position
      if (car.position.z < -450) {
        car.position.z = 0;
        
        // Increase score when completing a road section
        gameState.score += 50;
        setScore(gameState.score);
      }
      
      // Move obstacles relative to the car's movement
      obstacles.forEach(obstacle => {
        // Move obstacle towards car
        obstacle.position.z += gameState.carSpeed;
        
        // If obstacle passes the car, reset its position
        if (obstacle.position.z > 5) {
          obstacle.position.z = -Math.random() * 200 - 10;
          obstacle.position.x = (Math.random() - 0.5) * 8;
          
          // Increase score when passing obstacle
          gameState.score += 10;
          setScore(gameState.score);
        }
        
        // Check collision with car
        const carBox = new THREE.Box3().setFromObject(car);
        const obstacleBox = new THREE.Box3().setFromObject(obstacle);
        
        if (carBox.intersectsBox(obstacleBox)) {
          endGame();
        }
      });
      
      // Update camera position to follow car
      camera.position.x = car.position.x;
      camera.position.z = car.position.z + 5;
      camera.lookAt(car.position.x, car.position.y, car.position.z - 5);
      
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    // End game
    const endGame = () => {
      gameState.isGameOver = true;
      setGameStarted(false);

      if (gameState.score > highScore) {
        setHighScore(gameState.score);
      }
    };

    // Initialize scene
    initScene();

    // Set up keyboard controls
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted) return;

      // Prevent default browser scrolling with arrow keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowUp':
          controlsRef.current.forward = true;
          break;
        case 'ArrowDown':
          controlsRef.current.backward = true;
          break;
        case 'ArrowLeft':
          controlsRef.current.left = true;
          break;
        case 'ArrowRight':
          controlsRef.current.right = true;
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          controlsRef.current.forward = false;
          break;
        case 'ArrowDown':
          controlsRef.current.backward = false;
          break;
        case 'ArrowLeft':
          controlsRef.current.left = false;
          break;
        case 'ArrowRight':
          controlsRef.current.right = false;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Start animation loop
    animate();

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationId);
      // Clean up Three.js resources
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [gameStarted, highScore]);

  // Start game
  const startGame = () => {
    setScore(0);
    setGameStarted(true);
  };

  // Touch controls handler
  const handleControlPress = (control: 'forward' | 'backward' | 'left' | 'right', isPressed: boolean) => {
    controlsRef.current[control] = isPressed;
  };

  return (
    <section id="game" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-16 text-center">
          Enough Bragging About me<br/>  {" "}
          <span className="text-[#1173E2] text-2xl md:text-3xl">Now Let's Have Some Fun</span>
        </h2>

        <div className="max-w-3xl mx-auto bg-card rounded-lg p-6 shadow-lg">
          <div className="text-center mb-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-medium">Score: {score}</p>
              <p className="text-lg font-medium">High Score: {highScore}</p>
            </div>

            {!gameStarted && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">3D Car Driving Simulation</h3>
                <p className="text-muted-foreground mb-4">
                  Drive the car and avoid obstacles. Use arrow keys or the on-screen controls to move.
                </p>
                <Button onClick={startGame} className="px-8 py-2">
                  {highScore > 0 ? "Drive Again" : "Start Driving"}
                </Button>
              </div>
            )}
          </div>

          <div className="h-96 max-w-4xl mx-auto relative">
            <canvas
              ref={canvasRef}
              className="border border-border rounded-lg w-full h-full"
              style={{ display: gameStarted ? "block" : "none" }}
            />

            {!gameStarted && (
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-900/40 to-indigo-900/40 flex items-center justify-center">
                <div className="text-4xl font-bold text-primary-foreground">
                  {highScore > 0 ? `Score: ${score}` : "Let's Drive!"}
                </div>
              </div>
            )}

            {/* On-screen controls for touch devices */}
            {gameStarted && (
              <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center">
                <button
                  className="w-14 h-14 bg-black/50 rounded-full mb-2 flex items-center justify-center"
                  onTouchStart={() => handleControlPress('forward', true)}
                  onTouchEnd={() => handleControlPress('forward', false)}
                  onMouseDown={() => handleControlPress('forward', true)}
                  onMouseUp={() => handleControlPress('forward', false)}
                  onMouseLeave={() => handleControlPress('forward', false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>

                <div className="flex justify-center gap-2">
                  <button
                    className="w-14 h-14 bg-black/50 rounded-full flex items-center justify-center"
                    onTouchStart={() => handleControlPress('left', true)}
                    onTouchEnd={() => handleControlPress('left', false)}
                    onMouseDown={() => handleControlPress('left', true)}
                    onMouseUp={() => handleControlPress('left', false)}
                    onMouseLeave={() => handleControlPress('left', false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    className="w-14 h-14 bg-black/50 rounded-full flex items-center justify-center"
                    onTouchStart={() => handleControlPress('backward', true)}
                    onTouchEnd={() => handleControlPress('backward', false)}
                    onMouseDown={() => handleControlPress('backward', true)}
                    onMouseUp={() => handleControlPress('backward', false)}
                    onMouseLeave={() => handleControlPress('backward', false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <button
                    className="w-14 h-14 bg-black/50 rounded-full flex items-center justify-center"
                    onTouchStart={() => handleControlPress('right', true)}
                    onTouchEnd={() => handleControlPress('right', false)}
                    onMouseDown={() => handleControlPress('right', true)}
                    onMouseUp={() => handleControlPress('right', false)}
                    onMouseLeave={() => handleControlPress('right', false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameSection;