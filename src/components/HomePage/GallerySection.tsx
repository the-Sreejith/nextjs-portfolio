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

  const leftColumnItems: GalleryItem[] = [
    {
      id: 'dineease-1',
      src: '/images/gallery/dineease-cover.png',
      alt: 'Dine Ease Design',
      title: 'Dine Ease',
      year: '2024'
    },
    {
      id: 'stroq-1',
      src: '/images/gallery/stroq.png',
      alt: 'Stroq App',
      title: 'Stroq',
      year: '2022'
    },
    {
      id: 'travel-buddy-1',
      src: '/images/gallery/sourcer.png',
      alt: 'Sourcer Design',
      title: 'Sourcer',
      year: '2022'
    }
  ];

  const rightColumnItems: GalleryItem[] = [
    {
      id: 'travel-buddy-2',
      src: '/images/gallery/stroq-1.png',
      alt: 'Stroq Mobile',
      title: 'Stroq',
      year: '2022'
    },
    {
      id: 'yahoo-2',
      src: '/images/gallery/yahoo.png',
      alt: 'Yahoo News Redesign',
      title: 'Yahoo News',
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

    gsap.fromTo(
      leftColumn,
      { y: 100 },
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

    gsap.fromTo(
      rightColumn,
      { y: -100 },
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

    gsap.fromTo(
      section,
      { opacity: 0, y: 50 },
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
      className="group relative mb-8 bg-white dark:bg-zinc-900 border-4 border-black dark:border-white shadow-[6px_6px_0_0_#000] dark:shadow-[6px_6px_0_0_#fff] overflow-hidden hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#000] dark:hover:shadow-[10px_10px_0_0_#fff] transition-all duration-200"
    >
      {/* Window Title Bar */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-foreground/5 border-b-4 border-black dark:border-white">
        <div className="flex gap-1">
          <span className="h-2.5 w-2.5 bg-black dark:bg-white" />
          <span className="h-2.5 w-2.5 bg-black/30 dark:bg-white/30" />
        </div>
        <span className="text-xs uppercase tracking-widest text-muted-foreground truncate">
          {item.title} — {item.year}
        </span>
      </div>

      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: index % 3 === 0 ? '3/2' : index % 3 === 1 ? '4/3' : '16/10'
        }}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 md:px-8 lg:px-16 overflow-hidden"
      id="gallery"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[#1173E2] border-4 border-black dark:border-white px-6 py-2 mb-6 shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff]">
            <span className="text-white text-lg uppercase tracking-[0.2em]">Gallery</span>
          </div>
          <h2 className="text-4xl md:text-5xl uppercase tracking-wider text-foreground mb-4">
            Design{" "}
            <span className="text-[#1173E2]">Gallery</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of my recent design work spanning mobile apps, web interfaces, and digital experiences.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div ref={leftColumnRef} className="space-y-8">
            {leftColumnItems.map((item, index) => renderGalleryItem(item, index))}
          </div>
          <div ref={rightColumnRef} className="space-y-8 md:mt-16">
            {rightColumnItems.map((item, index) => renderGalleryItem(item, index))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
