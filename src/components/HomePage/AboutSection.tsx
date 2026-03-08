"use client"

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useAnimation } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

const photos = [
  {
    id: 1,
    src: "/images/about/photo1.jpg",
    alt: "Conducting Hackathon",
  },
  {
    id: 2,
    src: "/images/about/photo2.jpg",
    alt: "A little affraid to give a talk",
  },
  {
    id: 3,
    src: "/images/about/photo3.jpg",
    alt: "I love to teach",
  },
  {
    id: 4,
    src: "/images/about/photo4.jpg",
    alt: "Having some work life balance",
  }
]

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <section className="py-24 bg-background max-w-6xl mx-auto">
      <div className="container pt-72 lg:pt-0 mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[#1173E2] border-4 border-black dark:border-white px-6 py-2 mb-6 shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff]">
            <span className="text-white text-lg uppercase tracking-[0.2em]">About</span>
          </div>
          <h2 className="text-4xl md:text-5xl uppercase tracking-wider text-foreground mb-4">
            About{" "}
            <span className="text-[#1173E2]">Who I&apos;m</span>
          </h2>
        </div>

        {/* Photo Grid - Pixel Frames */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: photo.id * 0.15 }}
            >
              <div className="bg-white dark:bg-zinc-900 border-4 border-black dark:border-white shadow-[6px_6px_0_0_#000] dark:shadow-[6px_6px_0_0_#fff] p-3 hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#000] dark:hover:shadow-[10px_10px_0_0_#fff] transition-all duration-200">
                {/* Photo */}
                <div className="relative aspect-[3/4] overflow-hidden border-2 border-black dark:border-white mb-3">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                {/* Caption */}
                <div className="text-center text-sm text-muted-foreground uppercase tracking-wider">
                  {photo.alt}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* About Text */}
        <div ref={ref} className="max-w-5xl mx-auto pt-10">
          <div className="bg-white dark:bg-zinc-900 border-4 border-black dark:border-white shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_#fff] p-8 md:p-12">
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-6">
              {'>'} cat about.txt
            </div>
            <ScrollReveal
              textClassName="text-foreground text-2xl lg:text-4xl xl:text-5xl leading-[3rem] tracking-wide"
              containerClassName="text-justify"
            >
              I build apps that feel simple, thoughtful, and easy to use. My work is about more than just code—I enjoy turning ideas into experiences that people actually love. Whether it&apos;s a small side project or a full product, I like collaborating closely, understanding the problem, and creating something that truly fits.
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
