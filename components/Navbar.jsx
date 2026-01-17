"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Logo from "@/components/Logo";
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Navbar = () => {
    const { isDark } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isResumeOpen, setIsResumeOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleResume = () => setIsResumeOpen(!isResumeOpen);

    const resumeLinks = [
        {
            title: "UI/UX Design",
            href: "https://drive.google.com/file/d/1JrQP-eFocBPke85bGWmgiCXvD57bJ09Z/view?usp=sharing",
        },
        {
            title: "Software Development",
            href: "https://drive.google.com/file/d/18YiNHAaPTUUZFt81T2Wy8KZ_29_3jd7j/view?usp=sharing",
        },
        {
            title: "Game Development",
            href: "https://drive.google.com/file/d/1FN13uSKZ5htZjSJx6tzRiengG_9VwS5b/view?usp=drive_link",
        },
    ];

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

            if (isMenuOpen) {
                setIsMenuOpen(false);
            }
        }
    };

    // Desktop Resume Dropdown Component
    const ResumeDropdown = ({ isOpen, onToggle }) => (
        <div className="relative hidden sm:block">
            <button
                onClick={onToggle}
                className={`flex items-center gap-1 group ${
                    isDark ? 'text-white hover:text-white/80' : 'text-black hover:text-black/80'
                } transition-colors relative`}
            >
                Resume
                <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                />
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full left-0 mt-2 py-2 rounded-xl ${
                            isDark ? 'bg-white/10' : 'bg-black/10'
                        } backdrop-blur-md min-w-[200px] z-[60]`}
                        onMouseLeave={() => setIsResumeOpen(false)}
                    >
                        {resumeLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`block px-4 py-2 ${
                                    isDark 
                                        ? 'text-white hover:bg-white/10' 
                                        : 'text-black hover:bg-black/10'
                                } transition-colors`}
                            >
                                {link.title}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

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
                    <ResumeDropdown isOpen={isResumeOpen} onToggle={toggleResume} />
                </div>

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
                        {['About', 'Works'].map((item, index) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <a
                                    href={`#${item.toLowerCase()}`}
                                    className={`block py-2 ${isDark ? 'text-white' : 'text-black'}`}
                                    onClick={(e) => {
                                        handleScroll(e, `#${item.toLowerCase()}`);
                                        toggleMenu();
                                    }}
                                >
                                    {item}
                                </a>
                            </motion.div>
                        ))}
                        {/* Resume section in mobile menu */}
                        <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: 0.2 }}
>
    {/* Mobile Resume Button */}
    <button
        onClick={(e) => {
            e.preventDefault();
            setIsResumeOpen(!isResumeOpen);
        }}
        className={`w-full flex items-center justify-between py-2 ${
            isDark ? 'text-white' : 'text-black'
        }`}
    >
        <span>Resume</span>
        <ChevronDown 
            className={`w-4 h-4 transition-transform duration-300 ${
                isResumeOpen ? 'rotate-180' : ''
            }`}
        />
    </button>

    {/* Mobile Resume Links */}
    <AnimatePresence>
        {isResumeOpen && (
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
            >
                {resumeLinks.map((link, index) => (
                    <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block py-2 pl-6 ${
                                isDark ? 'text-white/80' : 'text-black/80'
                            } hover:${
                                isDark ? 'text-white' : 'text-black'
                            } transition-colors`}
                            onClick={() => {
                                setIsResumeOpen(false);
                                toggleMenu();
                            }}
                        >
                            {link.title}
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        )}
    </AnimatePresence>
</motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                        >
                            <a
                                href="#contact"
                                className={`block py-2 ${isDark ? 'text-white' : 'text-black'}`}
                                onClick={(e) => {
                                    handleScroll(e, '#contact');
                                    toggleMenu();
                                }}
                            >
                                Let&apos;s Talk
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;