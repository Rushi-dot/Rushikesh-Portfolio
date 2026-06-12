'use client';

// ============================================================================
// Particles — Three.js particle field
// ============================================================================

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DEFAULT_PARTICLE_CONFIG } from '@/lib/constants';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';
import styles from './Particles.module.css';

/**
 * Internal Three.js particle mesh — animated floating points.
 */
function ParticleField({ config }) {
  const meshRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const { positions, count } = useMemo(() => {
    const count = config.count;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * config.spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * config.spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * config.spread;
    }
    return { positions, count };
  }, [config.count, config.spread]);

  useFrame((state) => {
    if (reducedMotion || !meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * config.speed * 0.1;
    meshRef.current.rotation.x = Math.sin(time * config.speed * 0.05) * 0.1;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={config.size}
        color={config.color}
        transparent
        opacity={config.opacity}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * Particles wrapper — renders a Three.js Canvas with a floating particle field.
 *
 * @param {{
 *   config?: Partial<typeof DEFAULT_PARTICLE_CONFIG>,
 *   interactive?: boolean,
 *   className?: string,
 * }} props
 */
export default function Particles({
  config: userConfig = {},
  interactive = false,
  className,
}) {
  const config = { ...DEFAULT_PARTICLE_CONFIG, ...userConfig };

  return (
    <div className={cn(styles.wrapper, className)} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ParticleField config={config} />
      </Canvas>
    </div>
  );
}
