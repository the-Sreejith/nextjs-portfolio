const socialLinks = [
  { label: "EMAIL", href: "mailto:buildwithsreejith@gmail.com" },
  { label: "LINKEDIN", href: "https://linkedin.com/in/thesreejith" },
  { label: "X", href: "https://x.com/thesreejith_" },
  { label: "GITHUB", href: "https://github.com/the-sreejith" },
  { label: "YOUTUBE", href: "https://youtube.com/@buildwithsreejith" },
  { label: "INSTAGRAM", href: "https://instagram.com/buildwithsreejith" },
  { label: "MEDIUM", href: "https://medium.com/@the-sreejith" },
  { label: "RESUME", href: "/resume.pdf" },
]

export default function FooterSection() {
  return (
    <footer className="py-3 md:py-4 bg-background border-t-4 border-black dark:border-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-3 md:mb-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label === "EMAIL" ? "_self" : "_blank"}
              rel={link.label === "EMAIL" ? undefined : "noopener noreferrer"}
              className="inline-flex items-center gap-1.5 text-sm uppercase tracking-widest text-muted-foreground hover:text-[#1173E2] transition-colors"
            >
              <span className="text-[#1173E2]">{'>'}</span>
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-muted-foreground text-sm uppercase tracking-widest text-center">
          © {new Date().getFullYear()} Sreejith Sreejayan. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
