"use client"
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from "@/contexts/ThemeContext";
import { ChevronLeft, ChevronRight, Wrench, Users, User, X } from 'lucide-react';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;
// Project data structure
const projectData = [
    {
        id: 1,
        video: `${S3_BASE_URL}/opengl-mc.mp4`,
        title: "Computer Graphics: Minecraft World Generation",
        description: "Developed a simplified Minecraft-inspired terrain generator using procedural generation techniques. Implemented 2D Perlin noise for natural-looking terrain generation, featuring a dynamic day/night cycle with realistic lighting and shadows. Created an optimized rendering system with view distance management and fog effects. The project includes textured blocks, smooth camera controls, and PCF shadow mapping for realistic shadow rendering.",
        toolsUsed: "C++, OpenGL, GLFW, GLM",
        projectType: "Computer Graphics Development",
        myRole: "Graphics Programmer"
    },
    {
        "id": 2,
        "video": `${S3_BASE_URL}/vr-space.mp4`,
        "title": "Game Development: VR Space Shooter",
        "description": "Developed a VR shooter game as a personal project to explore the capabilities of Unity's XR toolkit. Implemented realistic weapon mechanics, enemy AI, and immersive level design. This project honed my skills in C# scripting, VR interaction, and spatial audio.",
        "toolsUsed": "Unity, C#, Unity XRI Toolkit",
        "projectType": "Game Development",
        "myRole": "VR Developer"
    },
    {
        id: 3,
        video: `${S3_BASE_URL}/tti.mp4`,
        title: "Game Development: Total Trash Island",
        description: "Developed a first-person shooter as a team in Unity for the Ubisoft Australia Game Jam 2024. The game was done with the theme 'trash' where the player must eradicate the enemies of the island. I was in charge of developing the enemy AIs of the game using Unity and C#. The enemy wasn't conventional as the enemies were 2D sprites implemented in a 3D environment. Programming these AI behaviors using Unity's pathfinding and animation systems was a fun challenge, and it created a truly unique and wacky gameplay experience.",
        toolsUsed: "Unity, C#",
        projectType: "Game Development",
        myRole: "Unity Programmer",
    },
    {
        "id": 4,
        "video": `${S3_BASE_URL}/omz.mp4`,
        "title": "Game Developemnt: Old Man Zeus",
        "description": "Developed a fast-paced VR action game in just 9 days for the VR Jam 2. As the once-mighty Zeus, now retired, you must defend your home from hordes of minotaurs using your legendary lightning powers. Charge your bolts by touching electrical outlets, strike your foes, and activate a celestial alarm to summon help from the Olympians.",
        "toolsUsed": "Unity, C#, Unity XRI Toolkit",
        "projectType": "Game Development",
        "myRole": "Lead Gameplay Programmer"
    },
    {
        id: 5,
        video: `${S3_BASE_URL}/tickets-please.mp4`,
        title: "Game Development: Tickets Please",
        description: "In charge as the lead gameplay programmer, I was responsible for developing player interactions and enemy AIs using Unity and C#. This task was a valuable learning experience, as I had to adapt the AI behavior based on player interactions.",
        toolsUsed: "Unity, C#",
        projectType: "Game Development",
        myRole: "Lead Gameplay Programmer",
    },
];

const VideoCarousel = () => {
    const { setIsDark } = useTheme();
    const containerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(2);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [loadedVideos, setLoadedVideos] = useState({});

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.6]);
    const opacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
    const titleOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);

    // Video preloading logic
    useEffect(() => {
        const preloadVideos = async () => {
            const videoElements = {};
            projectData.forEach((project) => {
                const video = document.createElement('video');
                video.src = project.video;
                video.preload = 'auto';
                video.muted = true;
                video.playsInline = true;

                // Track loading state
                video.onloadeddata = () => {
                    setLoadedVideos(prev => ({
                        ...prev,
                        [project.id]: true
                    }));
                };

                videoElements[project.id] = video;
            });
        };

        preloadVideos();
    }, []);

    useEffect(() => {
        const updateTheme = () => {
            const progress = scrollYProgress.get();
            setIsDark(progress < 0.2);
        };

        const unsubscribe = scrollYProgress.on('change', updateTheme);
        return () => unsubscribe();
    }, [scrollYProgress, setIsDark]);

    const [isClicked, setIsClicked] = useState(false);

    const handleInteraction = (index) => {
        if (window.innerWidth <= 768) {
            setIsClicked(!isClicked);
        }
        setHoveredIndex(index);
        setSelectedProject(projectData[index]);
        setShowDetails(true);
    };

    // Video component with error handling and loading state
    const VideoElement = ({ project, className }) => {
        const videoRef = useRef(null);
        const [isLoading, setIsLoading] = useState(true);
        const [hasError, setHasError] = useState(false);
        const playAttemptRef = useRef(null);
    
        useEffect(() => {
            let mounted = true;
            
            const setupVideo = async () => {
                if (!videoRef.current) return;
    
                try {
                    // Clear any existing play attempts
                    if (playAttemptRef.current) {
                        clearTimeout(playAttemptRef.current);
                    }
    
                    // Reset video
                    videoRef.current.currentTime = 0;
                    videoRef.current.load();
    
                    // Wait for video to be ready
                    await new Promise((resolve, reject) => {
                        videoRef.current.onloadeddata = resolve;
                        videoRef.current.onerror = reject;
                    });
    
                    if (!mounted) return;
    
                    // Attempt to play with retry logic
                    const attemptPlay = async (retryCount = 0) => {
                        try {
                            await videoRef.current.play();
                            if (mounted) {
                                setIsLoading(false);
                                setHasError(false);
                            }
                        } catch (error) {
                            console.warn('Play attempt failed:', error);
                            if (retryCount < 3 && mounted) {
                                // Retry after a short delay
                                playAttemptRef.current = setTimeout(() => {
                                    attemptPlay(retryCount + 1);
                                }, 1000);
                            } else if (mounted) {
                                setHasError(true);
                                setIsLoading(false);
                            }
                        }
                    };
    
                    await attemptPlay();
    
                } catch (error) {
                    console.error('Video setup failed:', error);
                    if (mounted) {
                        setHasError(true);
                        setIsLoading(false);
                    }
                }
            };
    
            setupVideo();
    
            return () => {
                mounted = false;
                if (playAttemptRef.current) {
                    clearTimeout(playAttemptRef.current);
                }
                if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.src = '';
                    videoRef.current.load();
                }
            };
        }, [project.video]);
    
        return (
            <div className="relative w-full h-full">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="w-8 h-8 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
                    </div>
                )}
                {hasError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <p className="text-red-500">Error loading video</p>
                    </div>
                )}
                <video
                    ref={videoRef}
                    className={className}
                    muted
                    loop
                    playsInline
                    autoPlay={false} // We'll handle play manually
                    preload="auto"
                >
                    <source src={project.video} type="video/mp4" />
                </video>
            </div>
        );
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

    const nextVideo = () => {
        if (currentIndex < projectData.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setShowDetails(false);
        }
    };

    const prevVideo = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setShowDetails(false);
        }
    };

    // Project details overlay component
    const ProjectDetails = ({ project, isVisible, onClose }) => {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-black/90 overflow-y-auto rounded-xl sm:rounded-2xl"
            >
                {/* Mobile-optimized layout */}
                <div className="relative flex flex-col h-full">
                    {/* Close button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="absolute right-3 top-3 z-50 p-2 rounded-full bg-black/50 backdrop-blur-sm"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
    
                    {/* Content Container */}
                    <div className="flex-1 p-4 sm:p-6 md:p-8">
                        {/* Title */}
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                            {project.title}
                        </h2>
    
                        {/* Mobile-optimized info cards */}
                        <div className="space-y-3 mb-6">
                            <div className="bg-white/5 p-3 rounded-lg">
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="bg-orange-400/20 p-1.5 rounded-full">
                                        <Wrench className="w-4 h-4 text-orange-400" />
                                    </div>
                                    <p className="text-white/60 text-sm">Tools Used</p>
                                </div>
                                <p className="text-white ml-10">{project.toolsUsed}</p>
                            </div>
    
                            <div className="bg-white/5 p-3 rounded-lg">
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="bg-orange-400/20 p-1.5 rounded-full">
                                        <Users className="w-4 h-4 text-orange-400" />
                                    </div>
                                    <p className="text-white/60 text-sm">Project Type</p>
                                </div>
                                <p className="text-white ml-10">{project.projectType}</p>
                            </div>
    
                            <div className="bg-white/5 p-3 rounded-lg">
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="bg-orange-400/20 p-1.5 rounded-full">
                                        <User className="w-4 h-4 text-orange-400" />
                                    </div>
                                    <p className="text-white/60 text-sm">My Role</p>
                                </div>
                                <p className="text-white ml-10">{project.myRole}</p>
                            </div>
                        </div>
    
                        {/* Description */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-white">Description</h3>
                            <p className="text-white/80 text-sm leading-relaxed">
                                {project.description}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
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
                            className="relative w-full md:max-w-7xl px-0 sm:px-4"
                        >
                        {/* Navigation buttons - Adjusted for mobile */}
                        <button
                            onClick={prevVideo}
                            className={`absolute left-2 sm:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-md 
                                ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20'}`}
                            disabled={currentIndex === 0}
                        >
                            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-black" />
                        </button>
    
                        <button
                            onClick={nextVideo}
                            className={`absolute right-2 sm:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-md
                                ${currentIndex === projectData.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20'}`}
                            disabled={currentIndex === projectData.length - 1}
                        >
                            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-black" />
                        </button>

                        {/* Videos */}
                        <div className="relative w-full">
                            {/* Container with different aspect ratios for mobile and desktop */}
                            <div className="sm:aspect-video aspect-[9/16] w-full">
                                <motion.div
                                    animate={{ x: `${-currentIndex * 100}%` }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    className="absolute inset-0 flex"
                                >
                                    {projectData.map((project, index) => (
                                        <motion.div
                                            key={index}
                                            className="relative flex-shrink-0 w-full px-2 sm:px-4"
                                            animate={{
                                                scale: currentIndex === index ? 1 : 0.8,
                                                opacity: currentIndex === index ? 1 : 0.5
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div
                                                className="relative sm:aspect-video aspect-[9/16] rounded-lg sm:rounded-2xl overflow-hidden group cursor-pointer h-full"
                                                onMouseEnter={() => handleMouseEnter(index)}
                                                onMouseLeave={handleMouseLeave}
                                                onClick={() => handleInteraction(index)}
                                            >
                                                {/* Video with object-fit adjustments for mobile */}
                                                <VideoElement
                                                    project={project}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-95"
                                                />

                                                {/* Mobile overlay for video info (optional) */}
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:hidden">
                                                    <h3 className="text-white text-lg font-semibold">{project.title}</h3>
                                                    <p className="text-white/80 text-sm">{project.projectType}</p>
                                                </div>

                                                {/* Unified details display */}
                                                {((hoveredIndex === index && currentIndex === index) || (isClicked && currentIndex === index)) && (
                                                    <ProjectDetails
                                                        project={project}
                                                        isVisible={true}
                                                        onClose={handleClose}
                                                    />
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* Side previews - Desktop only */}
                                <div className="hidden sm:block">
                                    {currentIndex > 0 && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 w-1/4 md:w-1/3 aspect-video">
                                            <div className="rounded-xl overflow-hidden opacity-0 sm:opacity-15 scale-75">
                                                <video
                                                    className="w-full h-full object-cover"
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                >
                                                    <source src={projectData[currentIndex - 1].video} type="video/mp4" />
                                                </video>
                                            </div>
                                        </div>
                                    )}

                                    {currentIndex < projectData.length - 1 && (
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-1/4 md:w-1/3 aspect-video">
                                            <div className="rounded-xl overflow-hidden opacity-0 sm:opacity-15 scale-75">
                                                <video
                                                    className="w-full h-full object-cover"
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                >
                                                    <source src={projectData[currentIndex + 1].video} type="video/mp4" />
                                                </video>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3">
                            {projectData.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setCurrentIndex(index);
                                        setShowDetails(false);
                                    }}
                                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all
                                        ${currentIndex === index 
                                            ? 'bg-white scale-125' 
                                            : 'bg-white/30'}`}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Text content - Adjusted for mobile */}
                    <motion.div
                        style={{ opacity: titleOpacity }}
                        className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-full text-center px-4 sm:px-0"
                    >
                        <h2 className="text-black text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
                            Harnessing the finest of creativity.
                        </h2>
                        <p className="text-black/60 text-base sm:text-lg lg:text-xl">
                            Unleashing boundless imagination.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default VideoCarousel;