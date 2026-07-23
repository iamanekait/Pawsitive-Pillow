import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sun, Moon, Sparkles, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface ThreePetPillowStageProps {
  customPhotoUrl?: string | null;
  petName?: string;
  isMemorial?: boolean;
}

export const ThreePetPillowStage: React.FC<ThreePetPillowStageProps> = ({
  customPhotoUrl,
  petName = 'Milo',
  isMemorial = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const pillowMeshRef = useRef<THREE.Mesh | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [lightMode, setLightMode] = useState<'day' | 'ambient' | 'sunset'>('day');
  const [zoomLevel, setZoomLevel] = useState(3.5);

  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(isMemorial ? '#F4EFEA' : '#FDFBF7');

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, zoomLevel);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    ambientLight.name = 'ambientLight';
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfffaed, 1.2);
    mainLight.position.set(3, 5, 4);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    mainLight.name = 'mainLight';
    scene.add(mainLight);

    const fillLight = new THREE.PointLight(0xd4af37, 0.6, 10);
    fillLight.position.set(-3, -2, 2);
    fillLight.name = 'fillLight';
    scene.add(fillLight);

    // Create 3D Deformed Cushion Pillow Geometry
    // We create a BoxGeometry and deform vertices outward to simulate a soft plush stuffed pillow!
    const geometry = new THREE.BoxGeometry(1.8, 2.2, 0.45, 16, 16, 8);
    const position = geometry.attributes.position;
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      const z = position.getZ(i);

      // Cushion bulging outward factor
      const factorX = 1 - Math.pow(x / 0.9, 2) * 0.25;
      const factorY = 1 - Math.pow(y / 1.1, 2) * 0.25;
      const distFromCenter = Math.sqrt(x * x + y * y);
      
      if (Math.abs(z) > 0.05) {
        const bulge = Math.cos((distFromCenter / 1.5) * Math.PI * 0.5) * 0.2;
        position.setZ(i, z > 0 ? z + bulge : z - bulge);
      }
    }
    geometry.computeVertexNormals();

    // Default or custom texture
    const textureLoader = new THREE.TextureLoader();
    const defaultImg = customPhotoUrl || (isMemorial
      ? 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80'
      : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80');

    textureLoader.load(
      defaultImg,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.center.set(0.5, 0.5);

        // Materials: Velvet plush sides, front photo, back plush pattern
        const velvetMaterial = new THREE.MeshStandardMaterial({
          color: isMemorial ? 0xF5EBE0 : 0xFAF3EB,
          roughness: 0.85,
          metalness: 0.05,
        });

        const frontMaterial = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.6,
          metalness: 0.0,
        });

        const materials = [
          velvetMaterial, // right
          velvetMaterial, // left
          velvetMaterial, // top
          velvetMaterial, // bottom
          frontMaterial,  // front face (photo)
          frontMaterial   // back face (dual-sided print)
        ];

        const pillowMesh = new THREE.Mesh(geometry, materials);
        pillowMesh.castShadow = true;
        pillowMesh.receiveShadow = true;
        pillowMesh.position.y = 0.1;
        pillowMeshRef.current = pillowMesh;
        scene.add(pillowMesh);
      }
    );

    // Soft Shadow Floor
    const shadowFloorGeo = new THREE.PlaneGeometry(8, 8);
    const shadowFloorMat = new THREE.ShadowMaterial({ opacity: 0.15 });
    const shadowFloor = new THREE.Mesh(shadowFloorGeo, shadowFloorMat);
    shadowFloor.rotation.x = -Math.PI / 2;
    shadowFloor.position.y = -1.3;
    shadowFloor.receiveShadow = true;
    scene.add(shadowFloor);

    // Floating 3D Gentle Particles
    const particleCount = 25;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 6;
      particlePos[i + 1] = (Math.random() - 0.5) * 5;
      particlePos[i + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: isMemorial ? 0xE5C158 : 0x87A96B,
      size: 0.06,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (pillowMeshRef.current && isAutoRotate && !isDraggingRef.current) {
        pillowMeshRef.current.rotation.y += 0.008;
        pillowMeshRef.current.position.y = Math.sin(Date.now() * 0.002) * 0.08 + 0.1;
      }

      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
    };
    animate();

    // Mouse Controls for Dragging
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !pillowMeshRef.current) return;

      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      pillowMeshRef.current.rotation.y += deltaX * 0.01;
      pillowMeshRef.current.rotation.x += deltaY * 0.01;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElem.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      resizeObserver.disconnect();
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.remove();
      }
    };
  }, [customPhotoUrl, isMemorial]);

  // Update camera zoom
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z = zoomLevel;
    }
  }, [zoomLevel]);

  // Update lighting mode
  useEffect(() => {
    if (!sceneRef.current) return;
    const ambient = sceneRef.current.getObjectByName('ambientLight') as THREE.AmbientLight;
    const main = sceneRef.current.getObjectByName('mainLight') as THREE.DirectionalLight;

    if (ambient && main) {
      if (lightMode === 'day') {
        ambient.color.setHex(0xffffff);
        ambient.intensity = 0.9;
        main.color.setHex(0xfffaed);
        main.intensity = 1.2;
      } else if (lightMode === 'ambient') {
        ambient.color.setHex(0xe3d5ca);
        ambient.intensity = 1.1;
        main.color.setHex(0xffe8d6);
        main.intensity = 0.8;
      } else if (lightMode === 'sunset') {
        ambient.color.setHex(0xf4a261);
        ambient.intensity = 1.0;
        main.color.setHex(0xe76f51);
        main.intensity = 1.4;
      }
    }
  }, [lightMode]);

  return (
    <div className="relative w-full h-[420px] sm:h-[500px] rounded-3xl overflow-hidden glass-panel plush-shadow border border-[#E5D7C6]">
      {/* Top Banner Tag */}
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#5C4033] shadow-sm border border-[#E5D7C6]">
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
        <span>3D Interactive Cushion Stage (Drag to Rotate)</span>
      </div>

      {/* 3D Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Control Toolbar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-[#E5D7C6] text-[#5C4033]">
        <button
          onClick={() => setIsAutoRotate(!isAutoRotate)}
          className={`p-2 rounded-xl transition-all ${
            isAutoRotate ? 'bg-[#795548] text-white shadow-sm' : 'hover:bg-[#F5EFE6]'
          }`}
          title="Toggle Auto Rotation"
        >
          <RotateCw className={`w-4 h-4 ${isAutoRotate ? 'animate-spin' : ''}`} />
        </button>

        <div className="h-4 w-px bg-[#E5D7C6]" />

        <button
          onClick={() => setLightMode('day')}
          className={`p-2 rounded-xl text-xs font-medium transition-all ${
            lightMode === 'day' ? 'bg-[#795548] text-white' : 'hover:bg-[#F5EFE6]'
          }`}
          title="Daylight Mode"
        >
          <Sun className="w-4 h-4" />
        </button>

        <button
          onClick={() => setLightMode('sunset')}
          className={`p-2 rounded-xl text-xs font-medium transition-all ${
            lightMode === 'sunset' ? 'bg-[#C86D51] text-white' : 'hover:bg-[#F5EFE6]'
          }`}
          title="Warm Sunset Mode"
        >
          <Moon className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-[#E5D7C6]" />

        <button
          onClick={() => setZoomLevel((z) => Math.max(2.5, z - 0.5))}
          className="p-2 rounded-xl hover:bg-[#F5EFE6] transition-all"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          onClick={() => setZoomLevel((z) => Math.min(5.5, z + 0.5))}
          className="p-2 rounded-xl hover:bg-[#F5EFE6] transition-all"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* Pet Name Tag Overlay */}
      <div className="absolute bottom-4 right-4 z-10 bg-[#5C4033] text-[#FDFBF7] px-3.5 py-1.5 rounded-xl font-rounded font-bold text-sm shadow-md">
        {petName}'s Cutout Pillow
      </div>
    </div>
  );
};
