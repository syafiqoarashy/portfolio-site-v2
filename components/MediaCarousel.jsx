"use client"
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTheme } from "@/contexts/ThemeContext";
import { ChevronLeft, ChevronRight, X, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import projectsData from '@/data/projects.json';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

const MediaCarousel = () => {
    const { setIsDark } = useTheme();
    const containerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [modalProject, setModalProject] = useState(null);

    const projectData = useMemo(() =>
        projectsData.map(project => ({
            ...project,
            media: `${S3_BASE_URL}${project.mediaPath}`
        })),
    []);

    const [visibleProjects, setVisibleProjects] = useState(() =>
        projectsData.map(project => ({
            ...project,
            media: `${S3_BASE_URL}${project.mediaPath}`
        }))
    );

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.6]);
    const opacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
    const titleOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);

    useEffect(() => {
        const updateTheme = () => {
            const progress = scrollYProgress.get();
            setIsDark(progress < 0.2);
        };

        const unsubscribe = scrollYProgress.on('change', updateTheme);
        return () => unsubscribe();
    }, [scrollYProgress, setIsDark]);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);

            if (mobile) {
                const imageProjects = projectData.filter(project => project.mediaType === "image");
                setVisibleProjects(imageProjects);
                if (currentIndex >= imageProjects.length) {
                    setCurrentIndex(0);
                }
            } else {
                setVisibleProjects(projectData);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [projectData, currentIndex]);

    const handleInteraction = (index) => {
        if (window.innerWidth <= 768) {
            setIsClicked(!isClicked);
        }
        setHoveredIndex(index);
        setSelectedProject(projectData[index]);
        setShowDetails(true);
    };

    const handleClose = () => {
        setIsClicked(false);
        setHoveredIndex(null);
        setSelectedProject(null);
        setShowDetails(false);
    };

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
        setSelectedProject(projectData[index]);
        setShowDetails(true);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
        setSelectedProject(null);
        setShowDetails(false);
    };

    const nextMedia = () => {
        setCurrentIndex(prev => (prev + 1) % visibleProjects.length);
        setShowDetails(false);
    };
    
    const prevMedia = () => {
        setCurrentIndex(prev => (prev - 1 + visibleProjects.length) % visibleProjects.length);
        setShowDetails(false);
    };

    // Media content component to handle both videos and images
    const MediaContent = ({ project, className = "" }) => {
        if (project.mediaType === "video") {
            return (
                <video
                    className={`w-full h-full object-cover ${className}`}
                    autoPlay={true}
                    muted={true}
                    loop={true}
                    playsInline={true}
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center'
                    }}
                >
                <source 
                    src={project.media} 
                    type="video/mp4"
                />
                Your browser does not support the video tag.
                </video>
            );
        } else if (project.mediaType === "image") {
            return (
                <div className={`relative w-full h-full ${className}`}>
                <Image
                    src={project.media}
                    alt={project.title}
                    fill
                    priority={true}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={85}
                />
            </div>
            );
        }
        return null;
    };

    // Modal component for full project details
    const ProjectModal = ({ project, onClose }) => {
        if (!project) return null;

        return (
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

                    {/* Modal content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900 rounded-2xl sm:rounded-3xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>

                        {/* Media preview */}
                        <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
                            <MediaContent project={project} />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="p-6 sm:p-8 -mt-16 relative">
                            {/* Title */}
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                                {project.title}
                            </h2>

                            {/* Role and type */}
                            <div className="flex flex-wrap items-center gap-2 mb-6">
                                <span className="px-3 py-1 bg-orange-400/20 text-orange-400 rounded-full text-sm font-medium">
                                    {project.myRole}
                                </span>
                                <span className="px-3 py-1 bg-white/10 text-white/70 rounded-full text-sm">
                                    {project.projectType}
                                </span>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-white mb-3">About this project</h3>
                                <p className="text-white/80 leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            {/* Highlights if available */}
                            {project.highlights && project.highlights.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-white mb-3">Key Highlights</h3>
                                    <ul className="space-y-2">
                                        {project.highlights.map((highlight, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-white/80">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Tools */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">Technologies Used</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.toolsUsed.split(', ').map((tool, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1.5 bg-white/10 rounded-full text-white/90 text-sm font-medium"
                                        >
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        );
    };

    // Project details overlay component - slides up from bottom on hover
    const ProjectDetails = ({ project, isVisible, onClose, isMobile, onReadMore }) => {
        return (
            <>
                {/* Gradient overlay that's always visible on hover */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVisible ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"
                />

                {/* Content panel that slides up */}
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: isVisible ? 0 : "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md rounded-t-2xl sm:rounded-t-3xl"
                >
                    {/* Close button for mobile */}
                    {isMobile && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onClose();
                            }}
                            className="absolute right-3 top-3 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <X className="w-4 h-4 text-white" />
                        </button>
                    )}

                    <div className="p-4 sm:p-6 lg:p-8">
                        {/* Title and role */}
                        <div className="mb-3 sm:mb-4">
                            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">
                                {project.title}
                            </h2>
                            <div className="flex items-center gap-2">
                                <span className="text-orange-400 text-sm sm:text-base font-medium">
                                    {project.myRole}
                                </span>
                                <span className="text-white/40">•</span>
                                <span className="text-white/60 text-sm sm:text-base">
                                    {project.projectType}
                                </span>
                            </div>
                        </div>

                        {/* Description - truncated */}
                        <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4 line-clamp-2 sm:line-clamp-2">
                            {project.description}
                        </p>

                        {/* Tools and Read More row */}
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex flex-wrap gap-2 flex-1">
                                {project.toolsUsed.split(', ').slice(0, 3).map((tool, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white/10 rounded-full text-white/90 text-xs sm:text-sm font-medium"
                                    >
                                        {tool}
                                    </span>
                                ))}
                                {project.toolsUsed.split(', ').length > 3 && (
                                    <span className="px-2.5 py-1 bg-white/5 rounded-full text-white/50 text-xs sm:text-sm font-medium">
                                        +{project.toolsUsed.split(', ').length - 3}
                                    </span>
                                )}
                            </div>

                            {/* Read More button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onReadMore(project);
                                }}
                                className="flex items-center gap-1.5 px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-white/90 transition-colors"
                            >
                                Read More
                                <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </>
        );
    };

    return (
        <section
            ref={containerRef}
            className="relative h-[300vh] bg-white w-full rounded-b-[48px] pb-20"
        >
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-x-hidden">
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <motion.div
                        style={{ scale }}
                        className="relative w-full h-full sm:h-auto md:max-w-7xl px-0 sm:px-4 flex flex-col"
                    >
                        <button
                            onClick={prevMedia}
                            className="absolute left-2 sm:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20"
                        >
                            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-black" />
                        </button>

                        <button
                            onClick={nextMedia}
                            className="absolute right-2 sm:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20"
                        >
                            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-black" />
                        </button>

                        <div className="relative w-full flex-1 sm:flex-none">
                            <div className="sm:aspect-video h-full sm:h-auto w-full relative">
                                <motion.div
                                    animate={{ x: `${-currentIndex * 100}%` }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    className="absolute inset-0 flex"
                                >
                                    {visibleProjects.map((project, index) => (
                                        <motion.div
                                            key={index}
                                            className="relative flex-shrink-0 w-full h-full px-0 sm:px-4"
                                            animate={{
                                                scale: currentIndex === index ? 1 : 0.8,
                                                opacity: currentIndex === index ? 1 : 0.5
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div
                                                className="relative sm:aspect-video h-full sm:h-auto w-full rounded-3xl smLrounded-2xl overflow-hidden group cursor-pointer"
                                                onMouseEnter={() => handleMouseEnter(index)}
                                                onMouseLeave={handleMouseLeave}
                                                onClick={() => handleInteraction(index)}
                                            >
                                                <MediaContent
                                                    project={project}
                                                    className="transition-transform duration-300 group-hover:scale-105"
                                                />

                                                {((hoveredIndex === index && currentIndex === index) || (isClicked && currentIndex === index)) && (
                                                    <ProjectDetails
                                                        project={project}
                                                        isVisible={true}
                                                        onClose={handleClose}
                                                        isMobile={isMobile}
                                                        onReadMore={(proj) => setModalProject(proj)}
                                                    />
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                <div className="hidden sm:block">
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 w-1/4 md:w-1/3 aspect-video">
                                        <div className="rounded-xl overflow-hidden opacity-0 sm:opacity-15 scale-75">
                                            <MediaContent
                                                project={visibleProjects[(currentIndex - 1 + visibleProjects.length) % visibleProjects.length]}
                                            />
                                        </div>
                                    </div>
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-1/4 md:w-1/3 aspect-video">
                                        <div className="rounded-xl overflow-hidden opacity-0 sm:opacity-15 scale-75">
                                            <MediaContent
                                                project={visibleProjects[(currentIndex + 1) % visibleProjects.length]}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dots navigation - below the carousel */}
                        <div className="flex justify-center gap-2 sm:gap-3 py-4 sm:mt-6">
                            {visibleProjects.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setCurrentIndex(index);
                                        setShowDetails(false);
                                    }}
                                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all
                                        ${currentIndex === index
                                            ? 'bg-black scale-125'
                                            : 'bg-black/30'}`}
                                />
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        style={{ opacity: titleOpacity }}
                        className="absolute left-1/2 -translate-x-1/2 bottom-8 sm:bottom-12 w-full text-center px-4 sm:px-0"
                    >
                        <h2 className="text-black text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
                            Harnessing the finest of creativity.
                        </h2>
                        <p className="text-black/60 text-sm sm:text-base lg:text-lg">
                            Unleashing boundless imagination.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Project Modal */}
            {modalProject && (
                <ProjectModal
                    project={modalProject}
                    onClose={() => setModalProject(null)}
                />
            )}
        </section>
    );
};

export default MediaCarousel;
