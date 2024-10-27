"use client"
import React, {useEffect, useRef} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { useTheme } from "@/contexts/ThemeContext";
import {useScroll} from "framer-motion";

const ContactSection = () => {
    const { setIsDark } = useTheme();
    const contactRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: contactRef,
        offset: ["start end", "end end"]
    });

    // Set isDark based on scroll position
    useEffect(() => {
        const updateTheme = () => {
            const progress = scrollYProgress.get();
            // Only set to false when we're fully in the contact section
            if (progress > 0.9) { // Increased threshold to prevent collision
                setIsDark(false);
            }
        };

        const unsubscribe = scrollYProgress.on('change', updateTheme);
        return () => unsubscribe();
    }, [scrollYProgress, setIsDark]);

    return (
        <div className="relative w-full bg-white overflow-hidden">
            {/* Black border radius at top */}
            <div className="absolute top-0 left-0 right-0 h-[48px] bg-black rounded-b-[48px]" />

            {/* Main Content */}
            <section 
            id="contact"
            ref={contactRef}
                     className="w-full px-4 sm:px-8 lg:px-28 pt-40 pb-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left Content */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-black text-3xl sm:text-4xl font-bold leading-tight">
                                    Let&#39;s shape the{' '}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                                        future
                                    </span>{' '}
                                    together!
                                </h2>
                                <p className="text-black/60 text-lg sm:text-xl">
                                    Whether you have a project proposal or collaboration idea, or simply want to connect and discuss our shared interests, I&#39;m eager to hear from you.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <a
                                    href="mailto:syafiqoarashy@gmail.com"
                                    className="flex items-center gap-2 px-6 py-3 bg-black/10 hover:bg-black/20 rounded-full text-black transition-all w-fit"
                                >
                                    <Mail className="w-5 h-5" />
                                    Send me an email
                                </a>

                                <div className="text-black/60">or</div>

                                <a
                                    href="https://wa.me/61478834525"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-black/5 rounded-full text-black border border-black/20 transition-all w-fit"
                                >
                                    <Phone className="w-5 h-5" />
                                    WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* Right Illustration */}
                        <div className="relative">
                            <div className="relative aspect-square w-full max-w-[700px] mx-auto"> {/* Increased from 500px to 700px */}
                                <Image
                                    src="/contact-illustration.png"
                                    alt="Decorative illustration"
                                    width={700}
                                    height={700}
                                    className="object-contain scale-125" // Added scale-125 for additional size increase
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer with gradient background */}
            <footer className="w-full bg-gradient-to-r from-orange-400 to-orange-600 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-28">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="text-white/80">© Syafiqo Arashy</div>
                        <div className="flex gap-6">
                            <Link
                                href="https://www.linkedin.com/in/syafiqo-arashy-octaviano/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                LinkedIn
                            </Link>
                            <Link
                                href="https://www.instagram.com/syafiqoarashy/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                Instagram
                            </Link>
                            <Link
                                href="mailto:syafiqoarashy@gmail.com"
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                Email
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ContactSection;
