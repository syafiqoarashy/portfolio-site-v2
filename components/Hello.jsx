import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HelloSection = () => {
    return (
        <section className="relative w-full bg-black px-4 sm:px-8 md:px-12 lg:px-28 overflow-x-hidden">
            <div className="max-w-6xl mx-auto pt-16 sm:pt-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <h2 className="text-white text-2xl">Hello</h2>
                                <div className="h-0.5 w-12 bg-white/20"></div>
                            </div>

                            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold">
                                My name is{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                                    Syafiqo Arashy.
                                </span>
                            </h1>

                            <p className="text-white/80 text-lg sm:text-xl mt-2">
                                I&#39;m a Game Developer.
                            </p>
                        </div>

                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-full transition-all group"
                        >
                            Let&#39;s talk
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="transform translate-x-0 group-hover:translate-x-1 transition-transform"
                            >
                                <path
                                    d="M1 8H15M15 8L8 1M15 8L8 15"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>
                    </div>

                    <div className="relative -right-6 md:-right-0 lg:-top-24">
                        <div className="relative w-full h-[400px] sm:h-[600px] lg:w-[800px] lg:h-[800px]">
                            <Image
                                src="/isometric-illustration.png"
                                alt="Isometric workspace illustration"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HelloSection;
