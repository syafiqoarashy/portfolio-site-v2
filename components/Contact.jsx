"use client"
import React, {useEffect, useRef} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { useTheme } from "@/contexts/ThemeContext";
import { motion, useScroll, useInView } from "framer-motion";

const ContactSection = () => {
    const { setIsDark } = useTheme();
    const contactRef = useRef(null);
    const isInView = useInView(contactRef, { once: true, margin: "-100px" });

    const { scrollYProgress } = useScroll({
        target: contactRef,
        offset: ["start end", "end end"]
    });

    useEffect(() => {
        const updateTheme = () => {
            const progress = scrollYProgress.get();
            if (progress > 0.9) {
                setIsDark(false);
            }
        };

        const unsubscribe = scrollYProgress.on('change', updateTheme);
        return () => unsubscribe();
    }, [scrollYProgress, setIsDark]);

    return (
        <div className="relative w-full bg-white overflow-hidden">
            {/* Animated border radius */}
            <motion.div 
                className="absolute top-0 left-0 right-0 h-[48px] bg-black rounded-b-[48px]"
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
            />

            <section id="contact" ref={contactRef} className="w-full px-4 sm:px-8 lg:px-28 pt-40 pb-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left Content */}
                        <motion.div 
                            className="space-y-8"
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="space-y-4">
                                <motion.h2 
                                    className="text-black text-3xl sm:text-4xl font-bold leading-tight"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    Let&#39;s shape the{' '}
                                    <motion.span 
                                        className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.6, delay: 0.4 }}
                                    >
                                        future
                                    </motion.span>
                                    {' '}together!
                                </motion.h2>
                                <motion.p 
                                    className="text-black/60 text-lg sm:text-xl"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                >
                                    Whether you have a project proposal or collaboration idea, or simply want to connect and discuss our shared interests, I&#39;m eager to hear from you.
                                </motion.p>
                            </div>

                            <div className="space-y-4">
                                <motion.a
                                    href="mailto:syafiqoarashy@gmail.com"
                                    className="flex items-center gap-2 px-6 py-3 bg-black/10 hover:bg-black/20 rounded-full text-black transition-all w-fit"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Mail className="w-5 h-5" />
                                    Send me an email
                                </motion.a>

                                <motion.div 
                                    className="text-black/60"
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                    transition={{ duration: 0.6, delay: 0.7 }}
                                >
                                    or
                                </motion.div>

                                <motion.a
                                    href="https://wa.me/61478834525"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-black/5 rounded-full text-black border border-black/20 transition-all w-fit"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Phone className="w-5 h-5" />
                                    WhatsApp
                                </motion.a>
                            </div>
                        </motion.div>

                        {/* Right Illustration */}
                        <motion.div 
                            className="relative"
                            initial={{ opacity: 0, scale: 0.8, x: 50 }}
                            animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.8, x: 50 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <motion.div 
                                className="relative aspect-square w-full max-w-[700px] mx-auto"
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut",
                                }}
                            >
                                <Image
                                    src="/contact-illustration.png"
                                    alt="Decorative illustration"
                                    width={700}
                                    height={700}
                                    className="object-contain scale-125"
                                    priority
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Animated Footer */}
            <motion.footer 
                className="w-full bg-gradient-to-r from-orange-400 to-orange-600 py-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.9 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-28">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <motion.div 
                            className="text-white/80"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.6, delay: 1 }}
                        >
                            © Syafiqo Arashy
                        </motion.div>
                        <motion.div 
                            className="flex gap-6"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.6, delay: 1.1 }}
                        >
                            {['LinkedIn', 'Instagram', 'Email'].map((item, index) => (
                                <motion.div
                                    key={item}
                                    whileHover={{ scale: 1.1 }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                    transition={{ duration: 0.3, delay: 1.2 + (index * 0.1) }}
                                >
                                    <Link
                                        href={item === 'LinkedIn' 
                                            ? "https://www.linkedin.com/in/syafiqo-arashy-octaviano/"
                                            : item === 'Instagram'
                                            ? "https://www.instagram.com/syafiqoarashy/"
                                            : "mailto:syafiqoarashy@gmail.com"
                                        }
                                        target={item !== 'Email' ? "_blank" : undefined}
                                        rel={item !== 'Email' ? "noopener noreferrer" : undefined}
                                        className="text-white/80 hover:text-white transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.footer>
        </div>
    );
};

export default ContactSection;