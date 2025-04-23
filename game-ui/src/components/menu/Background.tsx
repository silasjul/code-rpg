"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Background() {
    const layers = useRef<HTMLDivElement>(null);
    let parallaxEnabled = false;

    // Offset images based on mousePos for a cool parallax effect
    useEffect(() => {
        const images = layers.current
            ? ([...layers.current.children] as HTMLElement[])
            : [];
        let xVal = 0,
            yVal = 0;

        const handleMouseMove = (e: MouseEvent) => {
            if (!parallaxEnabled) return;
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

        const enableParallax = () => {
            parallaxEnabled = true;
        };

        window.addEventListener("enableParallax", enableParallax);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("enableParallax", enableParallax);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // Animation
    useGSAP(() => {
        const images = layers.current
            ? ([...layers.current.children] as HTMLElement[])
            : [];

        let duration = 1;

        for (let image of images) {
            if (image.dataset.animate === "false") continue;
            gsap.to(image, {
                top: image.dataset.top ? image.dataset.top : "50%",
                duration: duration,
                ease: "power2.out",
                onComplete: () => {
                    const event = new CustomEvent("enableParallax");
                    window.dispatchEvent(event);
                },
            });
            duration += 0.3; // makes each image animate a bit later
        }
    }, [layers]);

    const parallaxStyle = "absolute left-1/2 -translate-x-1/2 -translate-y-1/2";
    const layerOffset = "top-[170%]"; // epic reveal animation

    return (
        <div
            ref={layers}
            className={
                "absolute w-screen h-screen overflow-hidden pointer-events-none *:duration-[450ms] *:ease-[cubic-bezier(.29,.54,.42,.99)]"
            }
        >
            {/* Layer 1 / Background */}
            <Image
                className={`${parallaxStyle} top-[54%] min-w-[2224px]`} // images that are bigger than the screen gets automatically cropped :/
                data-speed="0.3"
                data-top="46%"
                src="/main-bg/background.png"
                alt="5"
                width={2224}
                height={1168}
                unoptimized
                priority
            />
            {/* Layer 2 */}
            <Image
                className={`${parallaxStyle} ${layerOffset} min-w-[2144px]`}
                data-speed="0.22"
                src="/main-bg/mountains.png"
                alt="4"
                width={2144}
                height={1080}
                unoptimized
            />
            {/* Layer 3 */}
            <Image
                className={`${parallaxStyle} ${layerOffset} min-w-[1920px]`}
                data-speed="0.15"
                src="/main-bg/river.png"
                alt="3"
                width={1920}
                height={1080}
                unoptimized
            />
            {/* Layer 4 */}
            <div
                className={`${parallaxStyle} ${layerOffset} min-w-[2032px]`}
                data-speed="0.1"
            >
                <Image
                    className={`${parallaxStyle} ${layerOffset} min-w-[2032px]`}
                    src="/main-bg/grass.png"
                    alt="2"
                    width={2032}
                    height={1080}
                    unoptimized
                />
                <Image
                    className={`${parallaxStyle} ${layerOffset} min-w-[1920px] z-10`}
                    src="/main-bg/wizard.png"
                    alt="wizard"
                    width={1920}
                    height={1080}
                    unoptimized
                />
            </div>
            {/* Sun rays */}
            <Image
                className={`${parallaxStyle} min-w-[3302px] mix-blend-soft-light z-0`}
                data-speed="0.015"
                data-animate="false"
                src="/main-bg/rays.png"
                alt="rays"
                width={3302}
                height={3303}
                unoptimized
            />
            {/* Layer 5 / Foreground */}
            <Image
                className={`${parallaxStyle} ${layerOffset} min-w-[1952px]`}
                data-speed="0.03"
                data-top="40.5%"
                src="/main-bg/trees.png"
                alt="1"
                width={1952}
                height={1296}
                unoptimized
            />
            {/* Sun lens*/}
            <Image
                className={`${parallaxStyle} min-w-[105%] mix-blend-screen opacity-90`}
                data-speed="0.015"
                data-animate="false"
                src="/main-bg/sun.png"
                alt="sun"
                width={1920}
                height={1080}
                unoptimized
            />
        </div>
    );
}
