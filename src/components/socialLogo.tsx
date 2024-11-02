

import { DribbbleIcon, GithubIcon, LinkedinIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import React, { Component } from 'react'

type Props = {}

type State = {}

export default class socialLogo extends Component<Props, State> {
    state = {}

    render() {
        return (
            <div className="flex gap-2 items-center">
                <Link
                    href="https://behance.net/thesreejith"
                    className="p-2 bg-zinc-800 rounded-md text-zinc-200 hover:text-white"
                >
                    Be
                </Link>
                <Link
                    href="https://github.com/the-sreejith"
                    className="p-2 bg-zinc-800 rounded-md text-zinc-200 hover:text-white"
                >
                    <GithubIcon className="h-5 w-5" />
                </Link>
                <Link
                    href="https://linkedin.com/in/thesreejith"
                    className="p-2 bg-zinc-800 rounded-md text-zinc-200 hover:text-white"
                >
                    <LinkedinIcon className="h-5 w-5" />
                </Link>
                <Link
                    href="https://dribbble.com/sreejith_sreejayan"
                    className="p-2 bg-zinc-800 rounded-md text-zinc-200 hover:text-white"
                >
                    <DribbbleIcon className="h-5 w-5" />
                </Link>
                <Link
                    href="https://x.com/thesreejith_"
                    className="p-2 bg-zinc-800 rounded-md text-zinc-200 hover:text-white"
                >
                    <XIcon className="h-5 w-5" />
                </Link>
            </div>
        )
    }
}