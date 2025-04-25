import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import Hint from "@/components/loadingproblem/hint";
import gsap from "gsap";
import { useGameManager } from "@/hooks/useGameManager";
import { useGSAP } from "@gsap/react";

interface Problem {
    description: string;
    hints: string[];
    starter_code: string;
}

const imagePaths = [
    "/loading/forest.png",
    "/loading/goblincave.png",
    "/loading/mountains.png",
    "/loading/night.png",
    "/loading/night.png",
    "/loading/river.png",
];
let imageTime = 8; // seconds per image

export default function ProblemLoader() {
    const hasFetched = useRef(false); // avoid multiple fetches (strictmode)
    const imageRef = useRef<HTMLImageElement>(null);
    const container = useRef<HTMLDivElement>(null);
    const [problem, setProblem] = useState<Problem | null>(null);
    const [time, setTime] = useState(1);
    const [imageIdx, setImageIdx] = useState(0);
    const { transition } = useGameManager();

    useEffect(() => {
        // Fetch new problem
        const fetchProblem = async () => {
            if (hasFetched.current) return;
            hasFetched.current = true;

            try {
                const response = await axios.get(
                    "http://localhost:8000/problem"
                );
                console.log(response.data);
                setProblem(response.data);
            } catch (error) {
                console.error("Error fetching problem:", error);
            }
        };
        fetchProblem();

        // Image swapping animation
        const interval = setInterval(() => {
            setTime((prevTime) => {
                if ((prevTime + 1) % imageTime === 0) {
                    transition(container.current, () => {
                        // Swap image
                        setImageIdx((prev) => (prev + 1) % imagePaths.length);
                    });
                }

                return prevTime + 1;
            });
        }, 1000);
        return () => clearInterval(interval); // clean up
    }, []);

    // Animation on load
    useGSAP(() => {
        gsap.from(container.current, {
            opacity: 0,
            duration: 1,
            ease: "power",
        });
    }, [container]);

    // Slide animation on images
    const xOffset = 25;
    const yOffset = 10;
    useGSAP(() => {
        gsap.fromTo(
            imageRef.current,
            { x: -xOffset, y: -yOffset, duration: imageTime },
            {
                x: xOffset,
                y: yOffset,
                duration: imageTime,
                yoyo: true,
                repeat: -1,
            }
        );
    }, [imageRef]);

    return (
        <>
            <div
                ref={container}
                className="flex justify-center pointer-events-none select-none"
            >
                <Image
                    ref={imageRef}
                    className="absolute left-[-25px] top-[-10] min-w-[1970px]"
                    width={1920}
                    height={1080}
                    src={imagePaths[imageIdx]}
                    alt="background"
                />
                <Hint className="w-1/5">
                    1. JD Vance cant ski
                    <br />
                    2. JD Vance is a bum
                </Hint>
            </div>
        </>
    );
}
