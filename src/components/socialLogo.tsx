

import { DribbbleIcon, GithubIcon, LinkedinIcon, XIcon } from 'lucide-react'
import Link from 'next/link'


export default function SocialLogo(){


        return (
            <div className="flex gap-2 items-center">
                <Link
                    href="https://behance.net/thesreejith"
                    target='_blank'
                    className="p-2 bg-zinc-800 rounded-md text-zinc-200 hover:text-white"
                >
                    Be
                </Link>
                <Link
                    href="https://github.com/the-sreejith"
                    target='_blank'
                    className="p-2 bg-zinc-800 rounded-md text-zinc-200 hover:text-white"
                >
                    <GithubIcon className="h-5 w-5" />
                </Link>
                <Link
                    href="https://linkedin.com/in/thesreejith"
                    target='_blank'
                    className="p-2 bg-zinc-800 rounded-md text-zinc-200 hover:text-white"
                >
                    <LinkedinIcon className="h-5 w-5" />
                </Link>
                <Link
                    href="https://dribbble.com/sreejith_sreejayan"
                    target='_blank'
                    className="p-2 bg-zinc-800 rounded-md text-zinc-200 hover:text-white"
                >
                    <DribbbleIcon className="h-5 w-5" />
                </Link>
                <Link
                    href="https://x.com/thesreejith_"
                    target='_blank'
                    className="p-2 bg-zinc-800 rounded-md text-zinc-200 hover:text-white"
                >
                    <XIcon className="h-5 w-5" />
                </Link>
            </div>
        )
    
}