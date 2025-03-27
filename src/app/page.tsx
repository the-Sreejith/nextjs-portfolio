import Image from "next/image"
import { Button } from "@/components/ui/button"
import profile from "@/assets/profile-pic.jpg"
import SocialLogo from '@/components/socialLogo'
import SkillsSection from '@/components/HomePage/SkillsSection'
import ProjectsSection from '@/components/HomePage/ProjectsSection'
import AboutSection from '@/components/HomePage/AboutSection'
import GameSection from '@/components/HomePage/GameSection'
// import SplitText from '@/components/SplitText' // Import the SplitText component

export default function Home() {
  return (
    <div>
      <div className="container mx-auto">
        {/* Hero Section */}
        <div className="container max-h-screen px-4 py-10 flex items-center">
          <div className="grid lg:grid-cols-2 items-center">
            {/* Left Column - Image */}
            <div className="bg-card border rounded-lg overflow-hidden w-[350px] px-8 py-10 mx-auto md:w-[400px]">
              <div>
                <Image
                  src='/images/profile-pic.jpg'
                  alt="Profile"
                  width={500}
                  height={500}
                  className="rounded-lg aspect-square object-cover"
                  priority
                />
              </div>
              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <div className="h-2 w-2 bg-green-400 rounded-full font-semibold" />
                  <span>AVAILABLE FOR FREELANCE</span>
                </div>
                <h3 className="text-foreground text-xl font-bold">Sreejith Sreejayan</h3>
                <SocialLogo />
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-12 lg:text-left text-center py-20 px-4 lg:pl-0">
              <h1 className="text-foreground text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Hello, I'm{" "}
                <span className="text-[#1173E2]">Sreejith Sreejayan</span>, Software Engineer and{" "}
                <span className="inline-block">UX / UI Designer</span> Based in Banglore.
              </h1>
              <Button variant="outline" className="h-14 px-8 font-bold text-lg" scrollTo="footer">
                Contact Me
              </Button>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <SkillsSection />

        {/* About Section */}
        <AboutSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Game Section */}
        <GameSection />
      </div>
    </div>
  )
}