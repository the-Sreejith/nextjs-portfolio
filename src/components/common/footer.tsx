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
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const resetForm = () => {
        setName('')
        setEmail('')
        setMessage('')
        setError('')
        setSuccess('')
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (!name || !email || !message) {
            setError('Please fill in all fields')
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

    return <section id="footer" className="w-full border-t bg-background">
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">Get in Touch</h2>
                    <p className="text-muted-foreground">
                        Have a question or want to work together? Feel free to reach out!
                    </p>
                </div>
                <div className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Input
                                className="bg-muted"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isLoading}
                            />
                            <Input
                                className="bg-muted"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <Textarea
                            className="min-h-[150px] bg-muted"
                            placeholder="Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            disabled={isLoading}
                        />
                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                            size="lg"
                            disabled={isLoading}
                        >
                            {isLoading ? 'SENDING...' : 'SEND A MESSAGE'}
                        </Button>
                        {error && (
                            <p className="text-destructive text-sm">{error}</p>
                        )}
                        {success && (
                            <p className="text-green-500 text-sm">{success}</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
        <div className="text-center p-2 bg-muted text-muted-foreground text-sm">
            <p>
                &copy; {new Date().getFullYear()} Sreejith. All rights reserved.
            </p>
        </div>
    </section>
}