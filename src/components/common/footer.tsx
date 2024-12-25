"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SocialLogo from "@/components/socialLogo";



export default function Footer() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const resetForm = () => {
        setName('')
        setEmail('')
        setMessage('')
        setError('')
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        // Reset messages
        setError('')
        setSuccess('')

        // Validate inputs
        if (!name || name.trim() === '') {
            setError('Please enter your name')
            return
        }
        if (!email || email.trim() === '') {
            setError('Please enter your email')
            return
        }
        if (!message || message.trim() === '') {
            setError('Please enter your message')
            return
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address')
            return
        }

        try {
            setIsLoading(true)
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong')
            }

            // Success
            setSuccess('Message sent successfully!')
            resetForm()

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send message')
        } finally {
            setIsLoading(false)
        }
    }

    return <section id="footer" className="w-full border-t-2 border-zinc-900 bg-zinc-950 ">
        <div className="container mx-auto py-12 px-8 md:py-20 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-2">
                <div className="space-y-8">
                    <div className="space-y-6">
                        <h3 className="text-zinc-400 text-lg uppercase tracking-wider">GET IN TOUCH</h3>
                        <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Let's make your brand brilliant!
                        </h2>
                        <p className="text-zinc-400 text-sm md:text-lg" >
                            If you would like to work with me or just want to get in touch, I&apos;d love to hear from you!
                        </p>
                    </div>
                    <Link
                        href="mailto:ssjksreejith@gmail.com"
                        className="text-[#00BFFF] text-lg md:text-xl font-bold hover:underline inline-block"
                    >
                        SSJKSREEJITH@GMAIL.COM
                    </Link>
                    <SocialLogo />
                </div>
                <div className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Input
                                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-400"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isLoading}
                            />
                            <Input
                                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-400"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <Textarea
                            className="min-h-[150px] bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-400"
                            placeholder="Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            disabled={isLoading}
                        />
                        <Button
                            type="submit"
                            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white border-l-4 border-[#00BFFF]"
                            size="lg"
                            disabled={isLoading}
                        >
                            {isLoading ? 'SENDING...' : 'SEND A MESSAGE'}
                        </Button>

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}
                        {success && (
                            <p className="text-green-500 text-sm">{success}</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
        <div className="text-center  mb-0 p-2 bg-zinc-900 text-zinc-200 text-sm">
            <p>
                &copy; {new Date().getFullYear()} Sreejith. All rights reserved.
            </p>
        </div>

    </section>
}