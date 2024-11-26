"use client"
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from "@/contexts/ThemeContext";
import { ChevronLeft, ChevronRight, Wrench, Users, User, X } from 'lucide-react';
import Image from 'next/image';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;
// Project data structure
const projectData = [
    // Hackathons second
    {
        id: 1,
        mediaType: "image",
        media: `${S3_BASE_URL}/portfolio6.jpg`,
        title: "Hackathon: UQUIZZLE",
        description: "Secured 1st place at UQCS Hackathon 2024, competing against 35 other teams. Developed an extension for UQ lecture recordings as the Frontend Engineer and UI Designer, utilizing ReactJS and Craco to enhance the learning experience.",
        toolsUsed: "ReactJS, Craco, JavaScript, HTML, CSS, Git",
        projectType: "Frontend Development",
        myRole: "Frontend Engineer & UI Designer"
    },
    {
        id: 2,
        mediaType: "image",
        media: `${S3_BASE_URL}/portfolio5.jpg`,
        title: "Internship: MoneyFitt SG",
        description: "My first internship experience, I built new features for MoneyFitt's mobile app using Ionic and Angular to improve user experience, and optimized the app's backend with Spring Boot for better mobile service support.",
        toolsUsed: "Angular, Ionic, Spring Boot, Java, Typescript, HTML, CSS, Git",
        projectType: "Mobile Development",
        myRole: "Mobile Developer"
    },
    {
        id: 3,
        mediaType: "image",
        media: `${S3_BASE_URL}/portfolio7.jpg`,
        title: "Internship: Gradient Academy",
        description: "Contributed to frontend development using NextJS with TypeScript, implementing designs and resolving bugs to enhance the user interface and experience of Gradient's web product. Engineered backend solutions using Django, including the development of a new feature with comprehensive technical documentation.",
        toolsUsed: "NextJS, TypeScript, Django, Python, Git",
        projectType: "Software Development",
        myRole: "Software Engineer Intern"
    },
    {
        id: 4,
        mediaType: "image",
        media: `${S3_BASE_URL}/portfolio1.jpg`,
        title: "Hackathon: PEOPL.",
        description: "My team won 1st place in the Youth Empowerment Track at Garuda Hacks 4.0 by creating an innovative youth-centered community discussion app. Focusing on delivering a seamless and visually appealing user experience.",
        toolsUsed: "Typescript, ReactJS, HTML, CSS, Git",
        projectType: "Web Development",
        myRole: "Frontend Developer"
    },
    // Game Development Projects
    {
        id: 5,
        mediaType: "video",
        media: `${S3_BASE_URL}/tti.mp4`,
        title: "Game Development: Total Trash Island",
        description: "Developed a first-person shooter as a team in Unity for the Ubisoft Australia Game Jam 2024. The game was done with the theme 'trash' where the player must eradicate the enemies of the island. I was in charge of developing the enemy AIs of the game using Unity and C#. The enemy wasn't conventional as the enemies were 2D sprites implemented in a 3D environment. Programming these AI behaviors using Unity's pathfinding and animation systems was a fun challenge, and it created a truly unique and wacky gameplay experience.",
        toolsUsed: "Unity, C#",
        projectType: "Game Development",
        myRole: "Unity Programmer"
    },
    {
        id: 6,
        mediaType: "video",
        media: `${S3_BASE_URL}/vr-space.mp4`,
        title: "Game Development: VR Space Shooter",
        description: "Developed a VR shooter game as a personal project to explore the capabilities of Unity's XR toolkit. Implemented realistic weapon mechanics, enemy AI, and immersive level design. This project honed my skills in C# scripting, VR interaction, and spatial audio.",
        toolsUsed: "Unity, C#, Unity XRI Toolkit",
        projectType: "Game Development",
        myRole: "VR Developer"
    },
    {
        id: 7,
        mediaType: "video",
        media: `${S3_BASE_URL}/opengl-mc.mp4`,
        title: "Computer Graphics: Minecraft World Generation",
        description: "Developed a simplified Minecraft-inspired terrain generator using procedural generation techniques. Implemented 2D Perlin noise for natural-looking terrain generation, featuring a dynamic day/night cycle with realistic lighting and shadows. Created an optimized rendering system with view distance management and fog effects. The project includes textured blocks, smooth camera controls, and PCF shadow mapping for realistic shadow rendering.",
        toolsUsed: "C++, OpenGL, GLFW, GLM",
        projectType: "Computer Graphics Development",
        myRole: "Graphics Programmer"
    },
    {
        id: 8,
        mediaType: "video",
        media: `${S3_BASE_URL}/omz.mp4`,
        title: "Game Development: Old Man Zeus",
        description: "Developed a fast-paced VR action game in just 9 days for the VR Jam 2. As the once-mighty Zeus, now retired, you must defend your home from hordes of minotaurs using your legendary lightning powers. Charge your bolts by touching electrical outlets, strike your foes, and activate a celestial alarm to summon help from the Olympians.",
        toolsUsed: "Unity, C#, Unity XRI Toolkit",
        projectType: "Game Development",
        myRole: "Lead Gameplay Programmer"
    },
    {
        id: 9,
        mediaType: "video",
        media: `${S3_BASE_URL}/tps-ue.mp4`,
        title: "Game Development: UE5 Third Person Shooter Prototype",
        description: "Designed and programmed a third-person shooter prototype using Unreal Engine's Blueprint. With this project, I learned and delved into the world of animation and UI design within Unreal. Furthermore, I created AI enemies to enhance the gameplay experience. In essence, this project broadened my horizons in game development. It wasn't a full-fledged game but rather a stepping stone in my journey. It offered insights into animation, UI, and AI that I look forward to further refining as I continue to explore the world of game development.",
        toolsUsed: "Unreal Engine, Blueprint",
        projectType: "Game Development",
        myRole: "Unreal Programmer"
    },
    {
        id: 10,
        mediaType: "video",
        media: `${S3_BASE_URL}/tickets-please.mp4`,
        title: "Game Development: Tickets Please",
        description: "In charge as the lead gameplay programmer, I was responsible for developing player interactions and enemy AIs using Unity and C#. This task was a valuable learning experience, as I had to adapt the AI behavior based on player interactions.",
        toolsUsed: "Unity, C#",
        projectType: "Game Development",
        myRole: "Lead Gameplay Programmer"
    },
    // Web Development and Design Projects
    {
        id: 11,
        mediaType: "image",
        media: `${S3_BASE_URL}/portfolio2.jpg`,
        title: "Web Development: OKK UI 2022",
        description: "As a Web Developer at OKK UI, I developed an intuitive UI using Tailwind CSS and ReactJS, enhancing the website's aesthetic appeal and user experience. I also created wireframes to facilitate collaboration and align with project goals.",
        toolsUsed: "Tailwind CSS, ReactJS, Git",
        projectType: "Web Development",
        myRole: "Web Developer"
    },
    {
        id: 12,
        mediaType: "image",
        media: `${S3_BASE_URL}/portfolio3.jpg`,
        title: "Web Development: ACB-ISBE REVAMPED",
        description: "As part of my college project, I worked with a team to revamp the website and create a mobile app for the ACB-ISBE website. We used Tailwind, JavaScript, Django, and Python to create a visually appealing, responsive, and user-friendly website.",
        toolsUsed: "Tailwind CSS, JavaScript, AJAX, Django, Python, Git",
        projectType: "Full Stack Development",
        myRole: "Full Stack Developer"
    },
    {
        id: 13,
        mediaType: "image",
        media: `${S3_BASE_URL}/portfolio4.jpg`,
        title: "UI/UX Design: STUDENTXCEO INTERNATIONAL SUMMIT 2022",
        description: "I contributed to the design of the StudentXCEO International Summit 2022 website. I made the designs look better and easier to use by creating wireframes and prototypes. I worked with the developers to make sure the designs were implemented correctly. My work helped make the website and app more user-friendly for everyone.",
        toolsUsed: "Figma, Whimsical",
        projectType: "UI/UX Design",
        myRole: "UI/UX Designer"
    }
];

const MediaCarousel = () => {
    const { setIsDark } = useTheme();
    const containerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(2);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isClicked, setIsClicked] = useState(false);

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
        setCurrentIndex(prev => (prev + 1) % projectData.length);
        setShowDetails(false);
    };
    
    const prevMedia = () => {
        setCurrentIndex(prev => (prev - 1 + projectData.length) % projectData.length);
        setShowDetails(false);
    };

    // Media content component to handle both videos and images
    const MediaContent = ({ project, className = "" }) => {
        if (project.mediaType === "video") {
            return (
                <video
                    className={`w-full h-full object-cover ${className}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center'
                    }}
                >
                    <source src={project.media} type="video/mp4" />
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

    // Project details overlay component
    const ProjectDetails = ({ project, isVisible, onClose }) => {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-black/90 overflow-y-auto rounded-xl sm:rounded-2xl"
            >
                <div className="relative flex flex-col h-full">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="absolute right-3 top-3 z-50 p-2 rounded-full bg-black/50 backdrop-blur-sm"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                    
                    <div className="flex-1 p-4 sm:p-6 md:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                            {project.title}
                        </h2>
                        
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

                        <div className="relative w-full">
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
                                                <MediaContent 
                                                    project={project}
                                                    className="transition-transform duration-300 group-hover:scale-95"
                                                />

                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:hidden">
                                                    <h3 className="text-white text-lg font-semibold">{project.title}</h3>
                                                    <p className="text-white/80 text-sm">{project.projectType}</p>
                                                </div>

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

                                <div className="hidden sm:block">
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 w-1/4 md:w-1/3 aspect-video">
                                        <div className="rounded-xl overflow-hidden opacity-0 sm:opacity-15 scale-75">
                                            <MediaContent 
                                                project={projectData[(currentIndex - 1 + projectData.length) % projectData.length]} 
                                            />
                                        </div>
                                    </div>
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-1/4 md:w-1/3 aspect-video">
                                        <div className="rounded-xl overflow-hidden opacity-0 sm:opacity-15 scale-75">
                                            <MediaContent 
                                                project={projectData[(currentIndex + 1) % projectData.length]} 
                                            />
                                        </div>
                                    </div>
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

export default MediaCarousel;