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
    href: "/resume.pdf"
  }
]

export default function ContactSection() {
  return (
    <section className="py-32 bg-background" id="contact">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          className="bg-white dark:bg-zinc-900 border-4 border-black dark:border-white shadow-[12px_12px_0_0_#000] dark:shadow-[12px_12px_0_0_#fff] overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Title Bar */}
          <div className="px-4 py-2.5 bg-[#1173E2] border-b-4 border-black dark:border-white flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 bg-white border-2 border-black" />
              <span className="h-3 w-3 bg-white/50 border-2 border-black" />
            </div>
            <span className="text-white text-sm uppercase tracking-widest">contact.exe</span>
          </div>

          <div className="p-8 md:p-12 text-center">
            {/* Main Heading */}
            <div className="text-muted-foreground text-sm uppercase tracking-widest mb-4">
              {'>'} Want to team up?
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl uppercase tracking-wider text-foreground mb-4">
              Let&apos;s Work Together
            </h2>

            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm uppercase tracking-widest mb-12">
              <span className="w-8 h-0.5 bg-[#1173E2]" />
              <span>Select an option</span>
              <span className="w-8 h-0.5 bg-[#1173E2]" />
            </div>

            {/* Contact Links - Menu Style */}
            <div className="flex flex-col items-center gap-4 max-w-sm mx-auto">
              {contactLinks.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  target={link.label === "EMAIL" ? "_self" : "_blank"}
                  rel={link.label === "EMAIL" ? undefined : "noopener noreferrer"}
                  className="group w-full text-left px-6 py-3 border-4 border-black dark:border-white bg-white dark:bg-zinc-900 shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] hover:bg-[#1173E2] hover:text-white hover:shadow-[6px_6px_0_0_#000] dark:hover:shadow-[6px_6px_0_0_#fff] hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                  }}
                >
                  <span className="text-[#1173E2] group-hover:text-white animate-blink text-lg">{'>'}</span>
                  <span className="text-lg uppercase tracking-[0.2em]">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </div>

            <div className="mt-12 text-muted-foreground text-xs uppercase tracking-widest">
              <span className="animate-blink">_</span> Press any link to continue...
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
