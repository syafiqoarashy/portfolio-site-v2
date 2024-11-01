"use client"
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { useTheme } from "@/contexts/ThemeContext";
import { motion, useScroll, useInView, useSpring } from 'framer-motion';

const AboutSection = () => {
    const { setIsDark } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    
    const springConfig = { 
        stiffness: 70, 
        damping: 8     
    };

    const bounceTransition = {
        type: "spring",
        stiffness: 100,  
        damping: 15,    
        mass: 0.8       
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

    const floatingAnimation = {
        y: [-10, 10],
        transition: {
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
        }
    };

    const glowAnimation = {
        boxShadow: [
            "0 0 20px rgba(251, 146, 60, 0)",
            "0 0 40px rgba(251, 146, 60, 0.3)",
            "0 0 20px rgba(251, 146, 60, 0)"
        ],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const textRevealVariants = {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 }
    };

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative w-full min-h-screen bg-black px-4 sm:px-8 lg:px-28 overflow-hidden"
        >
            {/* Background gradient animation */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90"
                animate={{
                    opacity: [0.5, 0.7, 0.5],
                    scale: [1, 1, 1]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
            />

            <div className="max-w-7xl mx-auto md:pb-32 lg:pb-40 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8 items-center">
                    {/* Left side - Illustration & Text */}
                    <motion.div 
                        className="relative space-y-6 w-full lg:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={bounceTransition}
                    >
                        {/* Image container with enhanced floating animation */}
                        <motion.div 
                            className="relative w-full max-w-[600px] lg:max-w-[800px] mx-auto mb-12 lg:mb-0"
                            animate={floatingAnimation}
                        >
                            {/* Glow effect behind image */}
                            <motion.div
                                className="absolute inset-0 rounded-full blur-2xl"
                                animate={glowAnimation}
                            />
                            <Image
                                src="/about-illustration.png"
                                alt="Stylized illustration of Fiqo"
                                width={1200}
                                height={1200}
                                className="object-contain relative z-10"
                                priority
                            />
                        </motion.div>

                        <motion.div 
                            className="relative lg:absolute lg:bottom-[-120px] left-0 space-y-2 w-full text-center lg:text-left"
                            variants={textRevealVariants}
                            initial="initial"
                            animate={isInView ? "animate" : "initial"}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <motion.h2 
                                className="text-white text-xl sm:text-2xl"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                More about <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">me.</span>
                            </motion.h2>
                            <motion.p 
                                className="text-white/60 text-base sm:text-lg max-w-[500px] mx-auto lg:mx-0"
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 1 }}
                            >
                                Uncover, inspire, act, and discover—who am I and what motivates me.
                            </motion.p>
                        </motion.div>
                    </motion.div>

                    {/* Right side - Content Card */}
                    <motion.div 
                        className="relative w-full lg:w-1/2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={bounceTransition}
                    >
                        {/* About Header with enhanced line animation */}
                        <div className="flex items-center gap-2 mb-6">
                            <motion.h2 
                                className="text-white text-xl sm:text-2xl"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                About
                            </motion.h2>
                            <motion.div 
                                className="h-0.5 bg-gradient-to-r from-orange-400 to-orange-600"
                                initial={{ width: 0 }}
                                animate={isInView ? { width: "3rem" } : { width: 0 }}
                                transition={{ duration: 1.2, delay: 0.2 }}
                            />
                        </div>

                        {/* Card with enhanced animations */}
                        <motion.div 
                            className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            {/* Animated gradient border */}
                            <motion.div
                                className="absolute inset-0 rounded-3xl"
                                style={{
                                    background: "linear-gradient(45deg, transparent, rgba(251, 146, 60, 0.1), transparent)",
                                }}
                                animate={{
                                    backgroundPosition: ["200% 50%", "-200% 50%"],
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />

                            <motion.div 
                                className="space-y-4"
                                variants={textRevealVariants}
                                initial="initial"
                                animate={isInView ? "animate" : "initial"}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                <motion.h3 
                                    className="text-white text-lg sm:text-xl"
                                    whileHover={{ scale: 1.05, x: 10 }}
                                    transition={springConfig}
                                >
                                    Hi, I&#39;m Fiqo 👋
                                </motion.h3>
                                <motion.h2 
                                    className="text-white text-2xl sm:text-3xl font-bold"
                                    whileHover={{ scale: 1.02 }}
                                    transition={springConfig}
                                >
                                    Ambitious Student Driven by Growth, Collaboration, and Impact.
                                </motion.h2>
                            </motion.div>

                            <motion.p 
                                className="text-white/80 text-base sm:text-lg leading-relaxed relative z-10"
                                variants={textRevealVariants}
                                initial="initial"
                                animate={isInView ? "animate" : "initial"}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                Passionate about XR technology and interactive designs. I&#39;m a Computer Science student from University of Indonesia and an UX Design student at University of Queensland. With expertise in UI/UX, 3D, graphic, game development and interactive design, I thrive on overcoming challenges and bringing visionary ideas to life.
                            </motion.p>

                            <motion.div 
                                className="flex items-center gap-2 text-white/60"
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                whileHover={{ scale: 1.05, x: 10 }}
                            >
                                <MapPin className="w-5 h-5" />
                                <span className="text-base sm:text-lg">Based in Brisbane, Australia</span>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;