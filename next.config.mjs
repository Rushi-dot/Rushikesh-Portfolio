/** @type {import('next').NextConfig} */
const nextConfig = {
  // ---- Performance --------------------------------------------------------
  reactStrictMode: true,
  poweredByHeader: false,

  // ---- Images -------------------------------------------------------------
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
  },

  // ---- Transpile Three.js ecosystem for App Router compatibility ----------
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],

  // ---- Turbopack (Next.js 16 default bundler) ----------------------------
  turbopack: {},
};

export default nextConfig;
