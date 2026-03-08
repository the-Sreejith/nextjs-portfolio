"use client";

import React from "react";
import { cn } from "@/lib/utils";

export default function PixelHeroSprite({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "relative w-[256px] h-[256px] overflow-hidden group cursor-pointer bg-transparent",
                className
            )}
        >
            <div
                className={cn(
                    "absolute inset-0 w-full h-full",
                    "animate-pixel-idle group-hover:animate-pixel-hover"
                )}
                style={{
                    backgroundImage: "url('/spritesheet.png')",
                    backgroundSize: "1536px 1536px",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left top",
                    imageRendering: "pixelated",
                }}
            />
        </div>
    );
}
