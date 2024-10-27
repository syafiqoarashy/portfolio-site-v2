import React from 'react';
import Image from 'next/image';

const Hero = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden rounded-b-[48px]">
            <div className="absolute inset-0">
                <Image
                    src="/background-gradient.png"
                    alt="Orange gradient background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="relative h-full w-full flex items-center justify-center">
                <h2 className="absolute text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wider transform -translate-y-24 sm:-translate-y-28 md:-translate-y-32 lg:-translate-y-40 z-10">
                    syafiqo&#39;s
                </h2>

                <div className="absolute transform translate-y-2 sm:translate-y-3 md:translate-y-4 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[330px] lg:h-[330px] z-20">
                    <Image
                        src="/sphere-gradient.png"
                        alt="Orange gradient sphere"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                <h1 className="relative text-white text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-wide transform z-30">
                    Portfolio
                </h1>
            </div>
        </div>
    );
};

export default Hero;
