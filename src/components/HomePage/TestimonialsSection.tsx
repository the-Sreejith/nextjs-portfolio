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
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Words from{" "}
            <span className="text-[#1173E2]">Collaborators</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            What clients and collaborators say about working together
          </p>
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
                    duration: 0.6,
                    delay: index * 0.2
                  }
                }
              }}
            >
              <div className="bg-card border border-border rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 dark:hover:shadow-primary/10 hover:-translate-y-1 flex flex-col">
                {/* Quote */}
                <div className="mb-auto relative">
                  {/* <div className="text-6xl text-primary/10 font-serif absolute -top-4 -left-2">"</div> */}
                  <p className="text-muted-foreground leading-relaxed text-base relative z-10 ">
                    {testimonial.quote}
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 mt-8">
                  {/* <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1173E2] to-[#0EA5E9] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-sm">
                      {testimonial.initials}
                    </span>
                  </div> */}
                  <div className="flex flex-row gap-2">
                    <h4 className="font-semibold text-foreground text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
