import Image from "next/image"
import { Button } from "@/components/ui/button"
import SocialLogo from '@/components/socialLogo'
import { FileCode2, Zap, Server, Rocket, Figma, Cloud, Code, GithubIcon, Database, Code2 } from "lucide-react"

const skills = [
  { name: "React.js", icon: <FileCode2 className="h-5 w-5" /> },
  { name: "Next.js", icon: <Zap className="h-5 w-5" /> },
  { name: "Node.js", icon: <Server className="h-5 w-5" /> },
  { name: "Flutter", icon: <Rocket className="h-5 w-5" /> },
  { name: "Figma", icon: <Figma className="h-5 w-5" /> },
  { name: "AWS", icon: <Cloud className="h-5 w-5" /> },
  { name: "Supabase", icon: <Zap className="h-5 w-5" /> },
  { name: "Postgres", icon: <Database className="h-5 w-5" /> },
  { name: "Python", icon: <Code2 className="h-5 w-5" /> },
  { name: "JavaScript", icon: <FileCode2 className="h-5 w-5" /> },
  { name: "Firebase", icon: <Cloud className="h-5 w-5" /> },
  { name: "TypeScript", icon: <FileCode2 className="h-5 w-5" /> },
  { name: "Git", icon: <GithubIcon className="h-5 w-5" /> },
]

export default function HeroSection() {
  return (
    <section className="container max-h-screen">
      <div className="px-4 py-12 flex items-center">
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
              <h3 className="text-foreground text-2xl font-bold">Sreejith Sreejayan</h3>
              <SocialLogo />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-12 lg:text-left text-center py-20 px-4 lg:pl-0">
            <h1 className="text-foreground text-4xl lg:text-5xl xl:text-6xl font-bold">
              Hello, I'm{" "}
              <span className="text-[#1173E2]">Sreejith Sreejayan</span>, Software Engineer and{" "}
              <span className="inline-block">UX / UI Designer</span> Based in Bangalore.
            </h1>
            {/* <Button variant="outline" className="h-14 px-8 font-bold text-lg border-primary" scrollTo="footer">
              Contact Me
            </Button> */}
          </div>
        </div>

      </div>
      <div className="relative w-full overflow-hidden">
        {/* Gradient masks for fade effect */}
        <div className="absolute left-0 top-0 h-full w-[100px] z-10 bg-gradient-to-r from-white dark:from-gray-900 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 h-full w-[100px] z-10 bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none"></div>

        {/* Marquee wrapper */}
        <div className="flex whitespace-nowrap animate-marquee">
          {/* First set of skills */}
          {skills.map((skill, index) => (
            <div key={`skill-1-${index}`} className="flex items-center rounded-full bg-white dark:bg-gray-800 shadow-sm px-5 py-2 mx-2 whitespace-nowrap">
              <div className="text-[#1173E2] mr-2">
                {skill.icon}
              </div>
              <span className="text-sm font-medium">{skill.name}</span>
            </div>
          ))}

          {/* Duplicate set for seamless loop */}
          {skills.map((skill, index) => (
            <div key={`skill-2-${index}`} className="flex items-center rounded-full bg-white dark:bg-gray-800 shadow-sm px-5 py-2 mx-2 whitespace-nowrap">
              <div className="text-[#1173E2] mr-2">
                {skill.icon}
              </div>
              <span className="text-sm font-medium">{skill.name}</span>
            </div>
          ))}
        </div>

        {/* Second marquee going in reverse direction */}
        <div className="flex whitespace-nowrap animate-marquee-reverse mt-4">
          {/* Offset second row */}
          {[...skills].reverse().map((skill, index) => (
            <div key={`skill-3-${index}`} className="flex items-center rounded-full bg-white dark:bg-gray-800 shadow-sm px-5 py-2 mx-2 whitespace-nowrap">
              <div className="text-[#1173E2] mr-2">
                {skill.icon}
              </div>
              <span className="text-sm font-medium">{skill.name}</span>
            </div>
          ))}

          {/* Duplicate set for seamless loop */}
          {[...skills].reverse().map((skill, index) => (
            <div key={`skill-4-${index}`} className="flex items-center rounded-full bg-white dark:bg-gray-800 shadow-sm px-5 py-2 mx-2 whitespace-nowrap">
              <div className="text-[#1173E2] mr-2">
                {skill.icon}
              </div>
              <span className="text-sm font-medium">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}