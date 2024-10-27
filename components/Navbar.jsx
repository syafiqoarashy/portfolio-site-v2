"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Logo from "@/components/Logo";
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { isDark } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-6xl">
            <nav className={`px-4 sm:px-10 py-4 ${isDark ? 'bg-white/10' : 'bg-black/10'} backdrop-blur-md rounded-full flex items-center justify-between transition-colors duration-300`}>
                <Link href="/" className={`${isDark ? 'text-white hover:text-white/90' : 'text-black hover:text-black/90'} transition-colors`}>
                    <Logo />
                </Link>

                {/* Hamburger menu for mobile */}
                <motion.button
                    onClick={toggleMenu}
                    className="sm:hidden"
                    whileTap={{ scale: 0.95 }}
                >
                    <svg className={`w-6 h-6 ${isDark ? 'text-white' : 'text-black'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </motion.button>

                {/* Desktop menu */}
                <div className="hidden sm:flex gap-12">
                    <Link
                        href="/about"
                        className={`${isDark ? 'text-white hover:text-white/80' : 'text-black hover:text-black/80'} transition-colors`}
                    >
                        About
                    </Link>
                    <Link
                        href="/works"
                        className={`${isDark ? 'text-white hover:text-white/80' : 'text-black hover:text-black/80'} transition-colors`}
                    >
                        Works
                    </Link>
                    <Link
                        href="/resume"
                        className={`${isDark ? 'text-white hover:text-white/80' : 'text-black hover:text-black/80'} transition-colors`}
                    >
                        Resume
                    </Link>
                </div>

                <Link
                    href="/contact"
                    className={`hidden sm:block px-6 py-2 rounded-full ${
                        isDark
                            ? 'bg-white/10 hover:bg-white/20 text-white'
                            : 'bg-black/10 hover:bg-black/20 text-black'
                    } transition-all`}
                >
                    Let&#39;s Talk
                </Link>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className={`sm:hidden mt-2 p-4 ${isDark ? 'bg-white/10' : 'bg-black/10'} backdrop-blur-md rounded-2xl`}
                    >
                        {['About', 'Works', 'Resume', "Let's Talk"].map((item, index) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <Link
                                    href={item === "Let's Talk" ? "/contact" : `/${item.toLowerCase()}`}
                                    className={`block py-2 ${isDark ? 'text-white' : 'text-black'}`}
                                    onClick={toggleMenu}
                                >
                                    {item}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
