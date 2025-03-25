"use client"

import { useState, useEffect } from 'react'
import { ArrowRight } from "lucide-react"

type CustomCursorProps = {
  hoveredProject: number | null;
}

export default function CustomCursor({ hoveredProject }: CustomCursorProps) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHydrated, setIsHydrated] = useState(false);

  // Update cursor position on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    // Add custom cursor styles to the document
    const style = document.createElement('style');
    style.innerHTML = `
      body { 
        cursor: none; 
      }
      a, button {
        cursor: none;
      }
    `;
    document.head.appendChild(style);

    window.addEventListener('mousemove', handleMouseMove);
    setIsHydrated(true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.head.removeChild(style);
    };
  }, []);

  if (!isHydrated) return null;

  return (
    <>
      {hoveredProject === null ? (
        // White circle cursor
        <div
          className="fixed w-5 h-5 rounded-full bg-white transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 mix-blend-difference transition-transform duration-300"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
          }}
        />
      ) : (
        // Pill button when hovering over a project
        <div
          className="fixed inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium pointer-events-none z-50 transition-all duration-300"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <span>View Project</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      )}
    </>
  )
} 