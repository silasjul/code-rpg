"use client";

import React from "react";
import { Logo, Background, MenuButton } from "@/components/frontpage";

export default function Home() {
    return (
        <>
            <Background />
            <div className="absolute w-screen h-screen">
                <div className="flex justify-center items-center">
                    <Logo className="w-[40%]" />
                </div>
                <div className="mt-10 flex flex-col gap-10 justify-center items-center">
                    <MenuButton>Start Adventure</MenuButton>
                    <MenuButton>Character</MenuButton>
                </div>
            </div>
        </>
    );
}
