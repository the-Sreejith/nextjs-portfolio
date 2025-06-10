"use client"

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useAnimation } from 'framer-motion'
import SplitText from '@/components/SplitText'

const photos = [
  {
    id: 1,
    src: "/images/about/photo1.jpg",
    alt: "Conducting Hackathon",
    rotation: "-3deg"
  },
  {
    id: 2,
    src: "/images/about/photo2.jpg",
    alt: "A little affraid to give a talk",
    rotation: "2deg"
  },
  {
    id: 3,
    src: "/images/about/photo3.jpg",
    alt: "I love to teach",
    rotation: "-2deg"
  },
  {
    id: 4,
    src: "/images/about/photo4.jpg",
    alt: "Having some work life balance",
    rotation: "3deg"
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
    <section className="py-32 bg-background max-w-6xl mx-auto">
      <div className="container pt-72 lg:pt-0 mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* <div className="inline-block bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 mb-4">
            <span className="text-sm font-medium">About Me</span>
          </div> */}
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About {" "}
            <span className="text-[#1173E2]">Who I'm</span>
          </h2>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: photo.id * 0.2 }}
            // style={{ transform: `rotate(${photo.rotation})` }}
            >
              {/* Polaroid Frame */}
              <div className={`bg-white dark:bg-gray-800 p-3 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                             hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-shadow duration-300 ${(photo.id % 2) == 0 ? 'rotate-2' : '-rotate-2'} 
                             dark:shadow-[0_8px_30px_rgb(255,255,255,0.08)]`}>
                {/* Photo Container */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-4">
                  <div className="absolute inset-0 bg-gray-900/20 z-10" />
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transform hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                {/* Caption */}
                <div
                  className="text-center text-sm text-gray-600 dark:text-gray-400 font-handwriting">
                  {photo.alt}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* About Text */}
        <div ref={ref} className="max-w-4xl mx-auto text-center">
          <div className="space-y-6 text-lg md:text-xl text-muted-foreground">
            <SplitText
              className="text-foreground text-2xl lg:text-3xl xl:text-4xl leading-tight"
              text="As a passionate Software Engineer and UX/UI Designer based in Kerala, I bring a unique blend of technical expertise and creative vision to every project." />
          </div>
        </div>
      </div>
    </section>
  )
} 