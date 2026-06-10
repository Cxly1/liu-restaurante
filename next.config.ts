import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // El optimizador corre en Node y esta PC no valida el cert de Unsplash;
    // el navegador carga las fotos directo sin problema.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
