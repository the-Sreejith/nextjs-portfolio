import { GithubOutlined, LinkedinOutlined, MediumOutlined, YoutubeOutlined, InstagramOutlined } from '@ant-design/icons'
import Link from 'next/link'

export default function SocialLogo() {
    return (
        <div className="flex gap-2 items-center justify-center">
            <Link
                href="https://github.com/the-sreejith"
                target='_blank'
            >
                <GithubOutlined className="text-2xl p-2 border-2 border-black dark:border-white hover:bg-[#1173E2] hover:text-white transition-all" />
            </Link>
            <Link
                href="https://linkedin.com/in/thesreejith"
                target='_blank'
            >
                <LinkedinOutlined className="text-2xl p-2 border-2 border-black dark:border-white hover:bg-[#1173E2] hover:text-white transition-all" />
            </Link>
            <Link
                href="https://youtube.com/@buildwithsreejith"
                target='_blank'
            >
                <YoutubeOutlined className="text-2xl p-2 border-2 border-black dark:border-white hover:bg-[#1173E2] hover:text-white transition-all" />
            </Link>
            <Link
                href="https://instagram.com/buildwithsreejith"
                target='_blank'
            >
                <InstagramOutlined className="text-2xl p-2 border-2 border-black dark:border-white hover:bg-[#1173E2] hover:text-white transition-all" />
            </Link>
            <Link
                href="https://medium.com/@the-sreejith"
                target='_blank'
            >
                <MediumOutlined className="text-2xl p-2 border-2 border-black dark:border-white hover:bg-[#1173E2] hover:text-white transition-all" />
            </Link>
        </div>
    )
}
