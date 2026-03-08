export default function FooterSection() {
  return (
    <footer className="py-3 md:py-4 bg-background border-t-4 border-black dark:border-white">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <p className="text-muted-foreground text-sm uppercase tracking-widest">
          © {new Date().getFullYear()} Sreejith Sreejayan. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
