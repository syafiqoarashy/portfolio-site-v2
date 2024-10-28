"use client"
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const WorksSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section 
            id="works"
            ref={sectionRef}
            className="w-full bg-black px-4 sm:px-8 lg:px-28 pb-16"
        >
            <div className="max-w-6xl mx-auto">
                <div className="">
                    {/* Animated header */}
                    <motion.div 
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-white text-xl">Works</h2>
                        <motion.div 
                            className="h-0.5 w-0 bg-white/20"
                            animate={isInView ? { width: "3rem" } : { width: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        />
                    </motion.div>

                    <div className="space-y-4">
                        {/* Animated title */}
                        <motion.h1 
                            className="text-white text-xl sm:text-2xl lg:text-4xl font-bold leading-tight"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            Showcasing{' '}
                            <motion.span 
                                className="inline-block px-4 py-0.5 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                diverse skills
                            </motion.span>
                            {' '}and{' '}
                            <motion.span 
                                className="inline-block px-4 py-0.5 mt-1 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                extensive experience
                            </motion.span>
                            <motion.br />
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                gained throughout the years.
                            </motion.span>
                        </motion.h1>

                        {/* Animated description */}
                        <motion.p 
                            className="text-white/60 text-lg sm:text-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            Discover my portfolio by diving through my projects.
                        </motion.p>
                    </div>

                    {/* Animated arrow */}
                    <motion.div 
                        className="pt-8 flex justify-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={isInView ? { 
                            opacity: 1, 
                            y: 0,
                        } : { opacity: 0, y: -20 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <motion.svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-white/60"
                            animate={{
                                y: [0, 10, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }}
                        >
                            <path
                                d="M12 4L12 20M12 20L18 14M12 20L6 14"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </motion.svg>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WorksSection;