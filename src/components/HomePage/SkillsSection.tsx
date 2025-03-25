import { FileCode2, Zap, Server, Rocket, Figma, Cloud, Code, GithubIcon, Database, PenTool, Video } from "lucide-react"

const skills = [
  { name: "React.js", icon: <FileCode2 className="h-5 w-5" /> },
  { name: "Next.js", icon: <Zap className="h-5 w-5" /> },
  { name: "Node.js", icon: <Server className="h-5 w-5" /> },
  { name: "Flutter", icon: <Rocket className="h-5 w-5" /> },
  { name: "Figma", icon: <Figma className="h-5 w-5" /> },
  { name: "Copywriting", icon: <PenTool className="h-5 w-5" /> },
  { name: "Cost Effective", icon: <Cloud className="h-5 w-5" /> },
  { name: "Optimization", icon: <Zap className="h-5 w-5" /> },
  { name: "Video & Motion", icon: <Video className="h-5 w-5" /> },
  { name: "JavaScript", icon: <FileCode2 className="h-5 w-5" /> },
  { name: "TypeScript", icon: <FileCode2 className="h-5 w-5" /> },
  { name: "Git", icon: <GithubIcon className="h-5 w-5" /> },
]

export default function SkillsSection() {
  return (
    <section className="py-12 md:py-12 overflow-hidden ">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 mb-4">
            <span className="text-sm font-medium">My Skills</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Expertise in{" "}
            <span className="text-[#1173E2]">Modern Technologies</span>
          </h2>
        </div>

        {/* Skills Marquee with fade effect */}
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
      </div>
    </section>
  )
} 