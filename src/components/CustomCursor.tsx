"use client"

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

type CustomCursorProps = {
  hoveredProject: number | null;
};

export default function CustomCursor({ hoveredProject }: CustomCursorProps) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHydrated, setIsHydrated] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateDeviceType = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    updateDeviceType(); // Run on mount
    window.addEventListener("resize", updateDeviceType);

    return () => {
      window.removeEventListener("resize", updateDeviceType);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const style = document.createElement("style");
    style.innerHTML = `
      body { cursor: none; }
      a, button { cursor: none; }
    `;
    document.head.appendChild(style);

    window.addEventListener("mousemove", handleMouseMove);
    setIsHydrated(true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.head.removeChild(style);
    };
  }, [isDesktop]);

  if (!isHydrated || !isDesktop) return null;

  return (
    <>
      {hoveredProject === null ? (
        <div
          className="fixed w-5 h-5 rounded-full bg-white transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 mix-blend-difference transition-transform duration-300"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
          }}
        />
      ) : (
        <div
          className="fixed inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium pointer-events-none z-50 transition-all duration-300"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <span>View Project</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      )}
    </>
  );
}
