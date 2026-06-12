'use client';

// ============================================================================
// CinematicLayer — Three.js atmospheric particle system
// ============================================================================
//
// Transparent canvas overlay with warm orange + white glowing particles.
// Uses additive blending, sine-wave oscillation, and subtle mouse parallax
// for a premium cinematic atmosphere.
// ============================================================================

import { useEffect, useRef, useCallback, memo } from 'react';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const PARTICLE_CONFIG = {
  orangeCount: 35,
  whiteCount: 25,
  orangeColor: 0xff8c32,
  whiteColor: 0xffffff,
  orangeSize: 2.5,
  whiteSize: 1.8,
  orangeOpacity: 0.4,
  whiteOpacity: 0.25,
  spread: 14,
  driftSpeed: 0.08,
  oscillationAmplitude: 0.6,
  oscillationFrequency: 0.3,
  parallaxStrength: 0.015,
};

/**
 * CinematicLayer — renders a transparent Three.js canvas with warm cinematic
 * floating particles. Highly optimised with low particle count and manual
 * requestAnimationFrame loop (no R3F overhead).
 *
 * @param {{ className?: string }} props
 */
const CinematicLayer = memo(function CinematicLayer({ className }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const frameRef = useRef(null);

  // ---- Mouse tracking (debounced via lerp in render loop) ------------------

  const handleMouseMove = useCallback((e) => {
    mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

  // ---- Three.js setup & animation loop ------------------------------------

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.z = 8;

    // ---- Create particle systems -------------------------------------------

    const createBokehTexture = () => {
      const size = 64;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      const gradient = ctx.createRadialGradient(
        size / 2, size / 2, 0,
        size / 2, size / 2, size / 2
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.15)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.fill();

      return new THREE.CanvasTexture(canvas);
    };

    const bokehTexture = createBokehTexture();

    const createParticles = (count, color, size, opacity) => {
      const positions = new Float32Array(count * 3);
      const velocities = new Float32Array(count * 3);
      const phases = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * PARTICLE_CONFIG.spread;
        positions[i3 + 1] = (Math.random() - 0.5) * PARTICLE_CONFIG.spread;
        positions[i3 + 2] = (Math.random() - 0.5) * (PARTICLE_CONFIG.spread * 0.5);

        velocities[i3] = (Math.random() - 0.5) * PARTICLE_CONFIG.driftSpeed;
        velocities[i3 + 1] = (Math.random() - 0.5) * PARTICLE_CONFIG.driftSpeed * 0.5;
        velocities[i3 + 2] = (Math.random() - 0.5) * PARTICLE_CONFIG.driftSpeed * 0.3;

        phases[i] = Math.random() * Math.PI * 2;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        size,
        color: new THREE.Color(color),
        transparent: true,
        opacity,
        map: bokehTexture,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      return { geometry, material, points, positions, velocities, phases, count };
    };

    const orangeSystem = createParticles(
      PARTICLE_CONFIG.orangeCount,
      PARTICLE_CONFIG.orangeColor,
      PARTICLE_CONFIG.orangeSize,
      PARTICLE_CONFIG.orangeOpacity
    );

    const whiteSystem = createParticles(
      PARTICLE_CONFIG.whiteCount,
      PARTICLE_CONFIG.whiteColor,
      PARTICLE_CONFIG.whiteSize,
      PARTICLE_CONFIG.whiteOpacity
    );

    // ---- Animation loop ----------------------------------------------------

    const clock = new THREE.Timer();
    clock.connect(document);
    const mouse = mouseRef.current;
    const halfSpread = PARTICLE_CONFIG.spread * 0.5;

    const animate = (timestamp) => {
      frameRef.current = requestAnimationFrame(animate);

      clock.update(timestamp);
      const elapsed = clock.getElapsed();

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.03;
      mouse.y += (mouse.targetY - mouse.y) * 0.03;

      // Update particle positions
      const updateSystem = (system) => {
        const posAttr = system.geometry.attributes.position;
        const arr = posAttr.array;

        for (let i = 0; i < system.count; i++) {
          const i3 = i * 3;

          // Drift
          arr[i3] += system.velocities[i3];
          arr[i3 + 1] += system.velocities[i3 + 1];
          arr[i3 + 2] += system.velocities[i3 + 2];

          // Sine-wave oscillation
          const phase = system.phases[i];
          arr[i3 + 1] += Math.sin(elapsed * PARTICLE_CONFIG.oscillationFrequency + phase)
            * PARTICLE_CONFIG.oscillationAmplitude * 0.005;

          // Boundary wrap
          if (arr[i3] > halfSpread) arr[i3] = -halfSpread;
          if (arr[i3] < -halfSpread) arr[i3] = halfSpread;
          if (arr[i3 + 1] > halfSpread) arr[i3 + 1] = -halfSpread;
          if (arr[i3 + 1] < -halfSpread) arr[i3 + 1] = halfSpread;
        }

        posAttr.needsUpdate = true;
      };

      updateSystem(orangeSystem);
      updateSystem(whiteSystem);

      // Mouse parallax on camera
      camera.position.x = mouse.x * PARTICLE_CONFIG.parallaxStrength * PARTICLE_CONFIG.spread;
      camera.position.y = -mouse.y * PARTICLE_CONFIG.parallaxStrength * PARTICLE_CONFIG.spread;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // ---- Resize handler -----------------------------------------------------

    const handleResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // ---- Cleanup ------------------------------------------------------------

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);

      // Dispose Three.js resources
      [orangeSystem, whiteSystem].forEach((system) => {
        system.geometry.dispose();
        system.material.dispose();
        scene.remove(system.points);
      });

      clock.dispose();
      bokehTexture.dispose();
      renderer.dispose();
    };
  }, [handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
});

export default CinematicLayer;
