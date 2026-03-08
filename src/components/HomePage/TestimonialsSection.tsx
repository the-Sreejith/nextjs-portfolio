"use client"

import { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: "Vysakh C",
    position: "CEO, Hireflex",
    initials: "VC",
    quote: "Sreejith embodies persistence, patience, and perfection. He's not just any developer; his unique ability to align teams and seamlessly manage projects sets him apart."
  },
  {
    id: 2,
    name: "Shinu B",
    position: "Founder, Komkits",
    initials: "SB",
    quote: "It was my great pleasure to work with Sreejith as he comes with commendable professionalism towards work and at the same time his analytical skills to solve any problem has been key success for the projects where he was the contributor."
  },
  {
    id: 3,
    name: "Renjith S",
    position: "Founder Flickwise",
    initials: "R",
    quote: "Sreejith has a thoughtful and methodical approach to development. His ability to understand the problem space and translate it into clean, functional solutions made collaboration smooth and effective"
  }
]

export default function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[#1173E2] border-4 border-black dark:border-white px-6 py-2 mb-6 shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff]">
            <span className="text-white text-lg uppercase tracking-[0.2em]">NPCs</span>
          </div>
          <h2 className="text-4xl md:text-5xl uppercase tracking-wider text-foreground mb-4">
            Words from{" "}
            <span className="text-[#1173E2]">Collaborators</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.4,
                    delay: index * 0.15
                  }
                }
              }}
            >
              <div className="bg-white dark:bg-zinc-900 border-4 border-black dark:border-white shadow-[6px_6px_0_0_#000] dark:shadow-[6px_6px_0_0_#fff] h-full flex flex-col hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#000] dark:hover:shadow-[10px_10px_0_0_#fff] transition-all duration-200">
                {/* Speech indicator */}
                <div className="px-5 py-2 border-b-4 border-black dark:border-white bg-foreground/5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#1173E2] border-2 border-black dark:border-white flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">
                        {testimonial.initials}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="p-5 flex-grow">
                  <p className="text-muted-foreground leading-relaxed text-base">
                    &quot;{testimonial.quote}&quot;
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
