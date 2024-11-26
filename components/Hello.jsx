"use client"
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

const HelloSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section 
            ref={sectionRef}
            className="relative w-full bg-black px-4 sm:px-8 md:px-12 lg:px-28 overflow-x-hidden"
        >
            <div className="max-w-6xl mx-auto pt-16 sm:pt-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
                    <motion.div 
                        className="space-y-6"
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="space-y-2">
                            {/* Animated Hello section */}
                            <motion.div 
                                className="flex items-center gap-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <h2 className="text-white text-2xl">Hello</h2>
                                <motion.div 
                                    className="h-0.5 bg-gradient-to-r from-orange-400 to-orange-600"
                                    animate={isInView ? { width: "3rem" } : { width: 0 }}
                                    transition={{ duration: 1.2, delay: 0.2 }}
                                />
                            </motion.div>

                            {/* Animated name text */}
                            <motion.h1 
                                className="text-white text-4xl sm:text-5xl md:text-6xl font-bold"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                My name is{' '}
                                <motion.span 
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 inline-block"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                >
                                    Syafiqo Arashy.
                                </motion.span>
                            </motion.h1>

                            {/* Animated role text */}
                            <motion.p 
                                className="text-white/80 text-lg sm:text-xl mt-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                I&#39;m a Developer and a Designer.
                            </motion.p>
                        </div>

                        {/* Animated button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 1 }}
                        >
                            <Link
                                href="#contact"
                                className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-full transition-all group"
                            >
                                Let&#39;s talk
                                <motion.svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    className="transform group-hover:translate-x-1 transition-transform"
                                    animate={{
                                        x: [0, 5, 0],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "easeInOut",
                                    }}
                                >
                                    <path
                                        d="M1 8H15M15 8L8 1M15 8L8 15"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </motion.svg>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Animated illustration */}
                    <motion.div 
                        className="relative -right-6 md:-right-0 lg:-top-24"
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <motion.div 
                            className="relative w-full h-[400px] sm:h-[600px] lg:w-[800px] lg:h-[800px]"
                            animate={isInView ? {
                                y: [0, -20, 0],
                            } : {}}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                            }}
                        >
                            <Image
                                src="/isometric-illustration.png"
                                alt="Isometric workspace illustration"
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HelloSection;