import PixelHeroSprite from "./PixelHeroSprite"
import SocialLogo from '@/components/socialLogo'

export default function HeroSection() {
  return (
    <section className="min-h-[calc(100svh-5rem)] max-h-[900px] flex items-center">
      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 items-center gap-10">
          {/* Left Column - Image */}
          <div className="bg-white dark:bg-zinc-900 border-4 border-black dark:border-white w-[300px] px-5 py-5 mx-auto md:w-[320px] shadow-[6px_6px_0_0_#000] dark:shadow-[6px_6px_0_0_#fff] transition-transform hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000] dark:hover:shadow-[8px_8px_0_0_#fff]">
            <div className="flex justify-center border-b-4 border-black dark:border-white pb-3 mb-3">
              <PixelHeroSprite />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm font-pixel uppercase tracking-widest">
                <div className="h-2.5 w-2.5 bg-green-500 border-2 border-black dark:border-white" />
                <span>Player 1 Ready</span>
              </div>
              <h3 className="text-foreground text-2xl font-pixel text-center uppercase tracking-wide">Sreejith Sreejayan</h3>
              <SocialLogo />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-6 lg:text-left text-center px-4">
            <div className="space-y-4">
              <h1 className="text-foreground font-pixel uppercase tracking-wider leading-tight">
                <span className="text-xl lg:text-2xl xl:text-3xl text-muted-foreground block mb-1">
                  Hello, I&apos;m
                </span>
                <span className="text-5xl lg:text-6xl xl:text-7xl text-[#1173E2] block">
                  Sreejith Sreejayan
                </span>
              </h1>
              <p className="text-foreground/90 text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                I&apos;m a developer and designer who{" "}
                <span className="text-[#1173E2] font-semibold">builds things with AI</span>
                — from apps and tools to experiments that sit at the intersection of code and creativity.
              </p>
              <p className="text-foreground/90 text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                I focus on{" "}
                <span className="text-[#1173E2] font-semibold">full-stack development</span>
                ,{" "}
                <span className="text-[#1173E2] font-semibold">product design</span>
                , and turning ideas into shipped products. When I&apos;m not coding, I&apos;m probably sketching interfaces or exploring new tools.
              </p>

              {/* Status Badges */}
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  <span className="inline-flex items-center gap-2 border-4 border-black dark:border-white bg-white dark:bg-zinc-900 px-4 py-1.5 text-xs uppercase tracking-widest shadow-[3px_3px_0_0_#000] dark:shadow-[3px_3px_0_0_#fff]">
                    <span className="h-2 w-2 bg-yellow-400 border-2 border-black dark:border-white animate-pulse" />
                    <span className="text-muted-foreground">Learning</span>
                    <span className="text-foreground font-semibold">Deep Learning</span>
                  </span>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  <a href="https://huspeep.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-4 border-black dark:border-white bg-white dark:bg-zinc-900 px-4 py-1.5 text-xs uppercase tracking-widest shadow-[3px_3px_0_0_#000] dark:shadow-[3px_3px_0_0_#fff] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#000] dark:hover:shadow-[5px_5px_0_0_#fff] transition-all">
                    <span className="h-2 w-2 bg-green-500 border-2 border-black dark:border-white animate-pulse" />
                    <span className="text-muted-foreground">Building</span>
                    <span className="text-foreground font-semibold">Huspeep</span>
                  </a>
                  <a href="https://vcsailor.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-4 border-black dark:border-white bg-white dark:bg-zinc-900 px-4 py-1.5 text-xs uppercase tracking-widest shadow-[3px_3px_0_0_#000] dark:shadow-[3px_3px_0_0_#fff] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#000] dark:hover:shadow-[5px_5px_0_0_#fff] transition-all">
                    <span className="h-2 w-2 bg-green-500 border-2 border-black dark:border-white animate-pulse" />
                    <span className="text-muted-foreground">Building</span>
                    <span className="text-foreground font-semibold">VCSailor</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}