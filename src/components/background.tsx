"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";

export default function Background() {
    const layers = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === "undefined") return; // Ensure client-side execution

        const images = layers.current
            ? ([...layers.current.children] as HTMLElement[])
            : [];
        let xVal = 0,
            yVal = 0;

        const handleMouseMove = (e: MouseEvent) => {
            xVal = e.clientX - window.innerWidth / 2;
            yVal = e.clientY - window.innerHeight / 2;

            images.forEach((el) => {
                const speed = Number(el.dataset.speed),
                    speedx = speed * 0.5,
                    speedy = speed * 0.5;

                el.style.transform = `
                    translateX(calc(-50% + ${-xVal * speedx}px))
                    translateY(calc(-50% + ${yVal * speedy}px))
                `;
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            ref={layers}
            className={
                "w-screen h-screen overflow-hidden pointer-events-none relative *:duration-[450ms] *:ease-[cubic-bezier(.29,.54,.42,.99)]"
            }
        >
            <Image
                className="absolute min-w-[2224px] top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 "
                data-speed="0.3"
                src="/bg/5ext.png"
                alt="5"
                width={2224}
                height={1168}
                unoptimized
                priority
            />
            <Image
                className="absolute min-w-[2144] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                data-speed="0.22"
                src="/bg/4ext.png"
                alt="4"
                width={2144}
                height={1080}
                unoptimized
            />
            <Image
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                data-speed="0.15"
                src="/bg/3.png"
                alt="3"
                width={1920}
                height={1080}
                unoptimized
            />
            <Image
                className="absolute min-w-[2032px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                data-speed="0.1"
                src="/bg/2ext.png"
                alt="2"
                width={2032}
                height={1080}
                unoptimized
            />
            <Image
                className="absolute min-w-[3302px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-soft-light"
                data-speed="0.015"
                src="/bg/rays.png"
                alt="rays"
                width={3302}
                height={3303}
                unoptimized
            />
            <Image
                className="absolute min-w-[1952px] top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2"
                data-speed="0.03"
                src="/bg/1ext.png"
                alt="1"
                width={1952}
                height={1096}
                unoptimized
            />
            <Image
                className="absolute min-w-[105%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-screen opacity-90"
                data-speed="0.015"
                src="/bg/sun.png"
                alt="sun"
                width={1920}
                height={1080}
                unoptimized
            />
            <Image
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                data-speed="0.1"
                src="/bg/wizard.png"
                alt="wizard"
                width={1920}
                height={1080}
                unoptimized
            />
        </div>
    );
}
