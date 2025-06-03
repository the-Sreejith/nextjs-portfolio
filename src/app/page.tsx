
import SkillsSection from '@/components/HomePage/SkillsSection'
import ProjectsSection from '@/components/HomePage/ProjectsSection'
import AboutSection from '@/components/HomePage/AboutSection'
import HeroSection from '@/components/HomePage/HeroSection'

export default function Home() {
  return (
    <div>
      <div className="container mx-auto">
        {/* Hero Section */}
        <HeroSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* About Section */}
        <AboutSection />

        {/* Projects Section */}
        <ProjectsSection />
      </div>
    </div>
  )
}