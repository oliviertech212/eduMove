// app/ClientLayout.tsx
'use client';

import { ParallaxProvider } from "react-scroll-parallax";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ParallaxProvider scrollAxis="vertical">
      {children}
    </ParallaxProvider>
  );
}
