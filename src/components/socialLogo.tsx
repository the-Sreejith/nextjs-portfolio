import { GithubOutlined, LinkedinOutlined, XOutlined, MediumOutlined, BehanceOutlined } from '@ant-design/icons'
import Link from 'next/link'

export default function SocialLogo() {
    return (
        <div className="flex gap-2 items-center">
            <Link
                href="https://behance.net/thesreejith"
                target='_blank'
            >
                <BehanceOutlined className="text-2xl p-2.5 rounded-xl border" />
            </Link>
            <Link
                href="https://github.com/the-sreejith"
                target='_blank'
            >
                <GithubOutlined className="text-2xl p-2.5 rounded-xl border" />
            </Link>
            <Link
                href="https://linkedin.com/in/thesreejith"
                target='_blank'
            >
                <LinkedinOutlined className="text-2xl p-2.5 rounded-xl border" />
            </Link>
            <Link
                href="https://x.com/thesreejith_"
                target='_blank'
            >
                <XOutlined className="text-2xl p-2.5 rounded-xl border" />
            </Link>
            <Link
                href="https://medium.com/@the-sreejith"
                target='_blank'
            >
                <MediumOutlined className="text-2xl p-2.5 rounded-xl border" />
            </Link>
        </div>
    )
}
