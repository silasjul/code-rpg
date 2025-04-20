import { Carousel } from "@/components/ui/carousel";
import React, { useState } from "react";

interface Props {
    transition: (page: string) => void;
}

export default function Map({ transition }: Props) {
    const slideData = [
        {
            title: "Mystical Forest",
            button: "Explore",
            src: "./locations/forest.png",
        },
        {
            title: "Dwarven Caves",
            button: "Explore",
            src: "./locations/cave.png",
        },
        {
            title: "Deserted Canyon",
            button: "Explore",
            src: "./locations/desert.png",
        },
        {
            title: "Frostlands",
            button: "Explore",
            src: "./locations/ice.png",
        },
        {
            title: "Inferno",
            button: "Explore",
            src: "./locations/lava.png",
        },
    ];

    const [slide, setSlide] = useState(0);

    return (
        <>
            <button
                className="absolute bg-white z-10"
                onClick={() => transition("menu")}
            >
                Back
            </button>
            <div className="absolute w-screen h-screen left-0 top-0 bg-black">
                <div className="relative overflow-hidden w-screen h-screen py-20">
                    {slideData.map((data, i) => (
                        <img
                            className={`absolute w-screen -translate-y-1/4 top-0 left-0 blur-md transition duration-1000 opacity-${
                                i === slide ? 100 : 0
                            }`}
                            src={data.src}
                            alt="background"
                            key={i}
                            draggable="false"
                        />
                    ))}

                    <Carousel slides={slideData} setSlide={setSlide} />
                </div>
            </div>
        </>
    );
}
