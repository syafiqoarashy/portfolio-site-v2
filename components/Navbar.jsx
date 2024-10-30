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

    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            // Close mobile menu if open
            if (isMenuOpen) {
                setIsMenuOpen(false);
            }
        }
    };

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
                    {['About', 'Works'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            onClick={(e) => handleScroll(e, `#${item.toLowerCase()}`)}
                            className={`${
                                isDark ? 'text-white hover:text-white/80' : 'text-black hover:text-black/80'
                            } transition-colors relative group`}
                        >
                            {item}
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                    <Link
                        href="https://drive.google.com/file/d/1FN13uSKZ5htZjSJx6tzRiengG_9VwS5b/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${
                            isDark ? 'text-white hover:text-white/80' : 'text-black hover:text-black/80'
                        } transition-colors relative group`}
                    >
                        Resume
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full" />
                    </Link>
                </div>

                {/* Let's Talk button with slide-in icon animation */}
                <a
                    href="#contact"
                    onClick={(e) => handleScroll(e, '#contact')}
                    className={`hidden sm:flex items-center gap-2 px-6 py-2 rounded-full overflow-hidden group ${
                        isDark
                            ? 'bg-white/10 hover:bg-white/20 text-white'
                            : 'bg-black/10 hover:bg-black/20 text-black'
                    } transition-all`}
                >
                    <span>Let&#39;s Talk</span>
                </a>
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
                                {item === 'Resume' ? (
                                    <Link
                                        href="https://drive.google.com/file/d/1FN13uSKZ5htZjSJx6tzRiengG_9VwS5b/view?usp=sharing"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`block py-2 ${isDark ? 'text-white' : 'text-black'}`}
                                        onClick={toggleMenu}
                                    >
                                        {item}
                                    </Link>
                                ) : (
                                    <a
                                        href={`#${item.toLowerCase()}`}
                                        className={`block py-2 ${isDark ? 'text-white' : 'text-black'}`}
                                        onClick={(e) => {
                                            handleScroll(e, `#${item.toLowerCase().replace("'s talk", '')}`);
                                            toggleMenu();
                                        }}
                                    >
                                        {item}
                                    </a>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;