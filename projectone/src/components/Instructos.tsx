"use client";
import React from "react";
import { WavyBackground } from "./ui/wavy-background";
import { AnimatedTooltip } from "./ui/animated-tooltip";

const instructors = [
  {
    id: 1,
    name: "Arijit Singh",
    designation: "Vocal Coach",
    image: "https://wallpapercave.com/wp/wp7930971.jpg",
  },
  {
    id: 2,
    name: "Sonu Nigam",
    designation: "Guitar Instructor",
    image: "https://wallpapercave.com/wp/wp4101502.jpg",
  },
  {
    id: 3,
    name: "Honey Singh",
    designation: "Piano Teacher",
    image: "https://wallpapercave.com/wp/wp5007966.jpg",
  },
  {
    id: 4,
    name: "KK",
    designation: "Drumming Expert",
    image: "https://wallpapercave.com/wp/wp8047505.jpg",
  },
];

function Instructos() {
  return (
    <div className="relative h-[40rem] overflow-hidden flex items-center justify-center">
      <WavyBackground speed="fast" className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl md:text-4xl lg:text-7xl text-white font-bold text-center mb-8">
          Meet Our Instructors
        </h2>
        <p className="text-base md:text-lg text-white text-center mb-4">
          Discover the talented professionals who will guide your musical
          journey
        </p>
        <div className="flex flex-row items-center justify-center mb-10 w-full">
          <AnimatedTooltip items={instructors} />
        </div>
      </WavyBackground>
    </div>
  );
}

export default Instructos;
