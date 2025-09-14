

import ProjectsSection from '@/components/HomePage/ProjectsSection'
import AboutSection from '@/components/HomePage/AboutSection'
import HeroSection from '@/components/HomePage/HeroSection'
import ContactSection from '@/components/HomePage/ContactSection'
import TestimonialsSection from '@/components/HomePage/TestimonialsSection'
import Script from 'next/script'

export default function Home() {
  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Sreejith Sreejayan",
            "url": process.env.NEXT_PUBLIC_SITE_URL,
            "image": `${process.env.NEXT_PUBLIC_SITE_URL}/images/profile-pic.jpg`,
            "sameAs": [
              "https://github.com/the-Sreejith",
              "https://linkedin.com/in/thesreejith",
              "https://medium.com/@the-sreejith",
              "https://x.com/thesreejith_",
              "https://www.behance.net/thesreejith"
            ],
            "jobTitle": "Software Developer",
            "worksFor": {
              "@type": "Organization",
              "name": "Freelance"
            }
          })
        }}
      />
      <div>
        <div className="container mx-auto">
          {/* Hero Section */}
          <HeroSection />

          {/* Projects Section */}
          <ProjectsSection />

          {/* About Section */}
          <AboutSection />

          {/* Testimonials Section */}
          <TestimonialsSection />

          {/* Contact Section */}
          <ContactSection />
        </div>
      </div>
    </>
  )
}