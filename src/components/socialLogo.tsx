import { DribbbleIcon, GithubIcon, LinkedinIcon, XIcon, BookOpen } from 'lucide-react'
import Link from 'next/link'

export default function SocialLogo(){
    return (
        <div className="flex gap-2 items-center">
            <Link
                href="https://behance.net/thesreejith"
                target='_blank'
                className="p-2 bg-muted rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
            >
                Be
            </Link>
            <Link
                href="https://github.com/the-sreejith"
                target='_blank'
                className="p-2 bg-muted rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
            >
                <GithubIcon className="h-5 w-5" />
            </Link>
            <Link
                href="https://linkedin.com/in/thesreejith"
                target='_blank'
                className="p-2 bg-muted rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
            >
                <LinkedinIcon className="h-5 w-5" />
            </Link>
            <Link
                href="https://x.com/thesreejith_"
                target='_blank'
                className="p-2 bg-muted rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
            >
                <XIcon className="h-5 w-5" />
            </Link>
            <Link
                href="https://medium.com/@the-sreejith"
                target='_blank'
                className="p-2 bg-muted rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
            >
                <BookOpen className="h-5 w-5" />
            </Link>
        </div>
    )
}