"use client";

import React from "react";
import Image from "next/image";
import Background from "@/components/background";
import TitleButton from "@/components/pixel_btn";

export default function Home() {
    return (
        <>
            <div className="absolute w-screen h-screen flex justify-center items-center z-10 ">
                <Image
                    className="absolute h-[30%] w-auto top-[1%] pointer-events-none"
                    src="/bg/title.png"
                    alt="title"
                    width={964}
                    height={338}
                    unoptimized
                />
                <div className="flex flex-col gap-5">
                    <TitleButton>Adventure</TitleButton>
                </div>
            </div>
            <Background />
        </>
    );
}
