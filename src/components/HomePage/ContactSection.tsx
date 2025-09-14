"use client"

import { motion } from 'framer-motion'

const contactLinks = [
  {
    id: 1,
    label: "EMAIL",
    href: "mailto:ssjksreejith@gmail.com"
  },
  {
    id: 2,
    label: "LINKEDIN",
    href: "https://linkedin.com/in/thesreejith"
  },
  {
    id: 3,
    label: "X",
    href: "https://x.com/thesreejith_"
  },
  {
    id: 4,
    label: "RESUME",
    href: "/resume.pdf" // Replace with your actual resume link
  }
]

export default function ContactSection() {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center">
          {/* Main Heading */}
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Let's Work Together
          </motion.h2>

          {/* Contact Links */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {contactLinks.map((link, index) => (
              <motion.a
                key={link.id}
                href={link.href}
                target={link.label === "EMAIL" ? "_self" : "_blank"}
                rel={link.label === "EMAIL" ? undefined : "noopener noreferrer"}
                className="group relative text-muted-foreground hover:text-foreground transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut" 
                }}
              >
                {/* Label */}
                <span className="text-lg font-medium tracking-wider uppercase">
                  {link.label}
                </span>
                
                {/* Animated Underline */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-foreground origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out w-full" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
