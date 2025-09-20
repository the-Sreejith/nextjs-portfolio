'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title?: string;
  year?: string;
}

const GallerySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  // Gallery items - you can modify these based on your actual images
  const leftColumnItems: GalleryItem[] = [
    {
      id: 'dineease-1',
      src: '/images/gallery/dineease-cover.png',
      alt: 'Dine Ease Design',
      title: 'Dine Ease',
      year: '2024'
    },
    {
      id: 'competishun-1',
      src: '/images/projects/dataviz.jpg',
      alt: 'Competishun App',
      title: 'Competishun',
      year: '2024'
    },
    {
      id: 'travel-buddy-1',
      src: '/images/about/photo2.jpg',
      alt: 'Travel Buddy Design',
      title: 'Travel Buddy',
      year: '2021'
    }
  ];

  const rightColumnItems: GalleryItem[] = [
    {
      id: 'travel-buddy-2',
      src: '/images/about/photo3.jpg',
      alt: 'Travel Buddy Mobile',
      title: 'Travel Buddy',
      year: '2021'
    },
    {
      id: 'athlos-2',
      src: '/images/projects/ecotrack.jpg',
      alt: 'Athlos Mobile Design',
      title: 'Athlos',
      year: '2023'
    },
    {
      id: 'dineease-2',
      src: '/images/gallery/dineease-desktop.png',
      alt: 'Dine Ease Interface',
      title: 'Dine Ease',
      year: '2024'
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const leftColumn = leftColumnRef.current;
    const rightColumn = rightColumnRef.current;

    if (!section || !leftColumn || !rightColumn) return;

    // Create parallax effect for left column (moves up)
    gsap.fromTo(
      leftColumn,
      {
        y: 100
      },
      {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      }
    );

    // Create parallax effect for right column (moves down)
    gsap.fromTo(
      rightColumn,
      {
        y: -100
      },
      {
        y: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      }
    );

    // Fade in animation for the entire section
    gsap.fromTo(
      section,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const renderGalleryItem = (item: GalleryItem, index: number) => (
    <div
      key={item.id}
      className="group relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-purple-100 via-blue-50 to-green-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-green-900/20"
      style={{
        aspectRatio: index % 3 === 0 ? '3/2' : index % 3 === 1 ? '4/3' : '16/10'
      }}
    >
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Project info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
          <p className="text-sm opacity-80">{item.year}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 md:px-8 lg:px-16 overflow-hidden"
      id="gallery"
    >
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 mb-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Gallery</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Design{" "}
            <span className="text-[#1173E2]">Gallery</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of my recent design work spanning mobile apps, web interfaces, and digital experiences.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column - moves up on scroll */}
          <div ref={leftColumnRef} className="space-y-8">
            {leftColumnItems.map((item, index) => renderGalleryItem(item, index))}
          </div>

          {/* Right Column - moves down on scroll */}
          <div ref={rightColumnRef} className="space-y-8 md:mt-16">
            {rightColumnItems.map((item, index) => renderGalleryItem(item, index))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
