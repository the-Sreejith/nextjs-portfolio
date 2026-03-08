import PixelHeroSprite from "./PixelHeroSprite"
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
          <div className="bg-white dark:bg-zinc-900 border-4 border-black dark:border-white w-[350px] px-8 py-10 mx-auto md:w-[400px] shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_#fff] transition-transform hover:-translate-y-1 hover:shadow-[12px_12px_0_0_#000] dark:hover:shadow-[12px_12px_0_0_#fff]">
            <div className="flex justify-center border-b-4 border-black dark:border-white pb-6 mb-6">
              <PixelHeroSprite />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm font-pixel text-xl uppercase tracking-widest">
                <div className="h-3 w-3 bg-green-500 border-2 border-black dark:border-white" />
                <span>Player 1 Ready</span>
              </div>
              <h3 className="text-foreground text-3xl font-pixel text-center uppercase tracking-wide">Sreejith Sreejayan</h3>
              <SocialLogo />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-12 lg:text-left text-center py-20 px-4 lg:pl-10">
            <h1 className="text-foreground text-5xl lg:text-6xl xl:text-7xl font-pixel uppercase tracking-wider leading-tight">
              Hello, I&apos;m{" "}
              <span className="text-[#1173E2]">Sreejith</span>,<br />
              <span className="inline-block relative">
                I build things with AI
                <div className="absolute -bottom-2 left-0 w-full h-2 bg-[#1173E2] -z-10 skew-x-12"></div>
              </span>
            </h1>
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
            <div key={`skill-1-${index}`} className="flex items-center bg-white dark:bg-zinc-900 border-4 border-black dark:border-white shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] px-5 py-2 mx-3 whitespace-nowrap transition-transform hover:-translate-y-1">
              <div className="text-[#1173E2] mr-3">
                {skill.icon}
              </div>
              <span className="font-pixel text-xl uppercase tracking-wider">{skill.name}</span>
            </div>
          ))}

          {/* Duplicate set for seamless loop */}
          {skills.map((skill, index) => (
            <div key={`skill-2-${index}`} className="flex items-center bg-white dark:bg-zinc-900 border-4 border-black dark:border-white shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] px-5 py-2 mx-3 whitespace-nowrap transition-transform hover:-translate-y-1">
              <div className="text-[#1173E2] mr-3">
                {skill.icon}
              </div>
              <span className="font-pixel text-xl uppercase tracking-wider">{skill.name}</span>
            </div>
          ))}
        </div>

        {/* Second marquee going in reverse direction */}
        <div className="flex whitespace-nowrap animate-marquee-reverse mt-4">
          {/* Offset second row */}
          {[...skills].reverse().map((skill, index) => (
            <div key={`skill-3-${index}`} className="flex items-center bg-white dark:bg-zinc-900 border-4 border-black dark:border-white shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] px-5 py-2 mx-3 whitespace-nowrap transition-transform hover:-translate-y-1">
              <div className="text-[#1173E2] mr-3">
                {skill.icon}
              </div>
              <span className="font-pixel text-xl uppercase tracking-wider">{skill.name}</span>
            </div>
          ))}

          {/* Duplicate set for seamless loop */}
          {[...skills].reverse().map((skill, index) => (
            <div key={`skill-4-${index}`} className="flex items-center bg-white dark:bg-zinc-900 border-4 border-black dark:border-white shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] px-5 py-2 mx-3 whitespace-nowrap transition-transform hover:-translate-y-1">
              <div className="text-[#1173E2] mr-3">
                {skill.icon}
              </div>
              <span className="font-pixel text-xl uppercase tracking-wider">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}