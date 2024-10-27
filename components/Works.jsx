import React from 'react';

const WorksSection = () => {
    return (
        <section className="w-full bg-black px-4 sm:px-8 lg:px-28 pb-16">
            <div className="max-w-6xl mx-auto">
                <div className="">
                    <div className="flex items-center gap-2">
                        <h2 className="text-white text-xl">Works</h2>
                        <div className="h-0.5 w-12 bg-white/20"></div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-white text-xl sm:text-2xl lg:text-4xl font-bold leading-tight">
                            Showcasing{' '}
                            <span className="inline-block px-4 py-0.5 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg">
                                diverse skills
                            </span>
                            {' '}and{' '}
                            <span className="inline-block px-4 py-0.5 mt-1 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg">
                                extensive experience
                            </span>
                            <br />
                            gained throughout the years.
                        </h1>

                        <p className="text-white/60 text-lg sm:text-xl">
                            Discover my portfolio by diving through my projects.
                        </p>
                    </div>

                    <div className="pt-8 flex justify-center">
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-white/60"
                        >
                            <path
                                d="M12 4L12 20M12 20L18 14M12 20L6 14"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorksSection;
