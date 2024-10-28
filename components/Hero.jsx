"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden rounded-b-[48px]">
            {/* Animated gradient background */}
            <motion.div 
                className="absolute inset-0"
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                <Image
                    src="/background-gradient.png"
                    alt="Orange gradient background"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>

            <div className="relative h-full w-full flex items-center justify-center">
                {/* Floating animation for "syafiqo's" */}
                <motion.h2 
                    className="absolute text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wider transform 
                        -translate-y-24 sm:-translate-y-40 md:-translate-y-44 lg:-translate-y-52 z-30" // Reduced mobile translation
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: '-8rem' }} // Reduced initial position for mobile
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    whileInView={{
                        y: ['-8rem', '-9rem', '-8rem'], // Adjusted animation range for mobile
                        transition: {
                            duration: 4,
                            ease: "easeInOut",
                            repeat: Infinity,
                        }
                    }}
                >
                    syafiqo&#39;s
                </motion.h2>

                {/* Rotating sphere with glow effect */}
                <motion.div 
                    className="absolute transform translate-y-2 sm:translate-y-3 md:translate-y-4 z-20"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                    whileInView={{
                        rotate: 360,
                        transition: {
                            duration: 20,
                            ease: "linear",
                            repeat: Infinity,
                        }
                    }}
                >
                    <div className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[330px] lg:h-[330px] relative">
                        <motion.div
                            className="absolute inset-0 bg-orange-400/30 rounded-full blur-xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{
                                duration: 3,
                                ease: "easeInOut",
                                repeat: Infinity,
                            }}
                        />
                        <Image
                            src="/sphere-gradient.png"
                            alt="Orange gradient sphere"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </motion.div>

                {/* Animated "Portfolio" text */}
                <motion.h1 
                    className="relative text-white text-5xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-wide transform z-30"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                    whileInView={{
                        y: [0, 10, 0],
                        transition: {
                            duration: 4,
                            ease: "easeInOut",
                            repeat: Infinity,
                        }
                    }}
                >
                    Portfolio
                </motion.h1>
            </div>

            {/* Fixed Particles component */}
            <Particles />
        </div>
    );
};

// Updated Particles component with client-side calculation
const Particles = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Generate particles only on client side
        const particlesArray = [...Array(20)].map((_, i) => ({
            id: i,
            x: Math.random() * 100, // Use percentages instead of pixel values
            y: Math.random() * 100,
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 2
        }));
        setParticles(particlesArray);
    }, []);

    return (
        <div className="absolute inset-0 z-0">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute w-1 h-1 bg-white/20 rounded-full"
                    initial={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`
                    }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                    }}
                />
            ))}
        </div>
    );
};

export default Hero;