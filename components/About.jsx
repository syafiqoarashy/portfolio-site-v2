"use client"
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { useTheme } from "@/contexts/ThemeContext";
import { motion, useScroll, useInView } from 'framer-motion';

const AboutSection = () => {
    const { setIsDark } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    
    const basicTransition = {
        duration: 0.5,
        ease: "easeOut"
    };

    const desktopTransition = {
        type: "spring",
        stiffness: 70,
        damping: 20
    };

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

    const getAnimationProps = (isDesktop = false) => {
        if (isMobile) {
            return {
                initial: { opacity: 0 },
                animate: isInView ? { opacity: 1 } : { opacity: 0 },
                transition: basicTransition
            };
        }
        return {
            initial: { opacity: 0, y: 20 },
            animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
            transition: desktopTransition
        };
    };

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative w-full min-h-screen bg-black px-4 sm:px-8 lg:px-28 overflow-hidden"
        >
            {/* Background gradient */}
            {!isMobile && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90"
                    animate={{
                        opacity: [0.5, 0.7, 0.5],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />
            )}

            <div className="max-w-7xl mx-auto md:pb-32 lg:pb-40 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8 items-center">
                    {/* Left side - Illustration & Text */}
                    <motion.div 
                        className="relative space-y-6 w-full lg:w-1/2"
                        {...getAnimationProps()}
                    >
                        {/* Image with conditional animations */}
                        <div className="relative w-full max-w-[600px] lg:max-w-[800px] mx-auto mb-12 lg:mb-0">
                            <Image
                                src="/about-illustration.png"
                                alt="Stylized illustration of Fiqo"
                                width={1200}
                                height={1200}
                                className="object-contain relative z-10"
                                priority
                            />
                        </div>

                        <motion.div 
                            className="relative lg:absolute lg:bottom-[-120px] left-0 space-y-2 w-full text-center lg:text-left"
                            {...getAnimationProps()}
                        >
                            <h2 className="text-white text-xl sm:text-2xl">
                                More about <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">me.</span>
                            </h2>
                            <p className="text-white/60 text-base sm:text-lg max-w-[500px] mx-auto lg:mx-0">
                                Uncover, inspire, act, and discover—who am I and what motivates me.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Right side - Content Card */}
                    <motion.div 
                        className="relative w-full lg:w-1/2"
                        {...getAnimationProps()}
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <h2 className="text-white text-xl sm:text-2xl">About</h2>
                            <motion.div 
                                className="h-0.5 bg-gradient-to-r from-orange-400 to-orange-600"
                                initial={{ width: 0 }}
                                animate={isInView ? { width: "3rem" } : { width: 0 }}
                                transition={basicTransition}
                            />
                        </div>

                        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 space-y-6 relative">
                            <div className="space-y-4">
                                <h3 className="text-white text-lg sm:text-xl">
                                    Hi, I&#39;m Fiqo 👋
                                </h3>
                                <h2 className="text-white text-2xl sm:text-3xl font-bold">
                                    Software Engineer with a Passion for Growth, Collaboration, and Impact.
                                </h2>
                            </div>

                            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                                Passionate about XR technology and interactive designs. I&#39;m a Computer Science graduate from University of Indonesia and UX Design graduate from University of Queensland, bringing years of hands-on experience in software development. With expertise in UI/UX, 3D, graphic, game development and interactive design, I thrive on overcoming challenges and bringing visionary ideas to life.
                            </p>

                            <div className="flex items-center gap-2 text-white/60">
                                <MapPin className="w-5 h-5" />
                                <span className="text-base sm:text-lg">Based in Brisbane, Australia</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;