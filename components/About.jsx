"use client"
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { useTheme } from "@/contexts/ThemeContext";
import { useScroll } from 'framer-motion';

const AboutSection = () => {
    const { setIsDark } = useTheme();
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end end"]
    });

    useEffect(() => {
        const updateTheme = () => {
            const progress = scrollYProgress.get();
            if (progress > 0.1 && progress < 0.9) {
                setIsDark(true);
            }
        };

        const unsubscribe = scrollYProgress.on('change', updateTheme);
        return () => unsubscribe();
    }, [scrollYProgress, setIsDark]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen bg-black px-4 sm:px-8 lg:px-28"
        >
            <div className="max-w-7xl mx-auto md:pb-32 lg:pb-40">
                {/* Changed flex layout to be responsive */}
                <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8 items-center">
                    {/* Left side - Illustration & Text */}
                    <div className="relative space-y-6 w-full lg:w-1/2">
                        {/* Image container */}
                        <div className="relative w-full max-w-[600px] lg:max-w-[800px] mx-auto mb-12 lg:mb-0">
                            <Image
                                src="/about-illustration.png"
                                alt="Stylized illustration of Fiqo"
                                width={1200}
                                height={1200}
                                className="object-contain"
                                priority
                            />
                        </div>

                        {/* Text container - Fixed positioning */}
                        <div className="relative lg:absolute lg:bottom-[-120px] left-0 space-y-2 w-full text-center lg:text-left">
                            <h2 className="text-white text-xl sm:text-2xl">More about <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">me.</span></h2>
                            <p className="text-white/60 text-base sm:text-lg max-w-[500px] mx-auto lg:mx-0">
                                Uncover, inspire, act, and discover—who am I and what motivates me.
                            </p>
                        </div>
                    </div>

                    {/* Right side - Content Card */}
                    <div className="relative w-full lg:w-1/2">
                        {/* About Header */}
                        <div className="flex items-center gap-2 mb-6">
                            <h2 className="text-white text-xl sm:text-2xl">About</h2>
                            <div className="h-0.5 w-12 bg-white/20"></div>
                        </div>

                        {/* Card - Adjusted padding for mobile */}
                        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-white text-lg sm:text-xl">Hi, I&#39;m Fiqo 👋</h3>
                                <h2 className="text-white text-2xl sm:text-3xl font-bold">
                                    Ambitious Student Driven by Growth, Collaboration, and Impact.
                                </h2>
                            </div>

                            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                                Passionate about XR technology and interactive designs. I&#39;m a final-year computer science student at the University of Queensland. With expertise in UI/UX, 3D, graphic, game development and interactive design, I thrive on overcoming challenges and bringing visionary ideas to life.
                            </p>

                            {/* Location */}
                            <div className="flex items-center gap-2 text-white/60">
                                <MapPin className="w-5 h-5" />
                                <span className="text-base sm:text-lg">Based in Brisbane, Australia</span>
                            </div>
                        </div>

                        {/* Decorative Elements - Adjusted for mobile */}
                        <div className="absolute -z-10 right-0 top-0 w-24 sm:w-32 h-24 sm:h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute -z-10 left-10 sm:left-20 bottom-10 sm:bottom-20 w-32 sm:w-40 h-32 sm:h-40 bg-orange-400/10 rounded-full blur-3xl"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;