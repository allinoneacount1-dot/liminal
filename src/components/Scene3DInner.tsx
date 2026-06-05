"use client";

import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./Scene3DInner"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(123,47,255,0.1)_0%,transparent_70%)]" />
  ),
});

export default function Scene3DWrapper() {
  return <Scene3D />;
}
