import React from "react";
import Image from "next/image";
import { Jacquard_12 } from "next/font/google";
import Background from "../../components/background";

const pixelFont = Jacquard_12({
    subsets: ["latin"],
    weight: "400",
});

interface Props {
    transition: (page: string) => void;
}

const TitleButton = ({
    children,
    onClick,
}: {
    children: React.ReactNode;
    onClick: () => void;
}) => (
    <button
        className={`text-8xl text-black hover:text-white hover:scale-110 duration-200 ${pixelFont.className}`}
        onClick={onClick}
    >
        {children}
    </button>
);

export default function MainMenu({ transition }: Props) {
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
                    <TitleButton onClick={() => transition("map")}>
                        Adventure
                    </TitleButton>
                </div>
            </div>
            <Background />
        </>
    );
}
