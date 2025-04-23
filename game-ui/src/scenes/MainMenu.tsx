import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Logo, Background, MenuButton } from "@/components/menu";
import { Scene } from "@/app/page";

interface MainMenuProps {
    onTransition: (nextScene: Scene) => void;
}

export default function MainMenu({ onTransition }: MainMenuProps) {
    const handleStartAdventure = () => {
        onTransition("menu");
    };

    const container = useRef(null);
    const logoRef = useRef(null);
    const buttonsContainerRef = useRef(null);

    // Reveal animation
    useGSAP(() => {
        gsap.timeline({
            delay: 1.5,
            defaults: { ease: "power2", duration: 1.3 },
        })
            .from(
                logoRef.current,
                {
                    scale: 0.9,
                    opacity: 0,
                    ease: "power1",
                },
                0
            )
            .from(
                buttonsContainerRef.current,
                {
                    delay: 0.2,
                    y: 50,
                    opacity: 0,
                },
                0
            );
    }, [container]);

    return (
        <>
            <Background />
            <div
                ref={container}
                className="absolute w-screen h-screen overflow-hidden"
            >
                <div
                    ref={logoRef}
                    className="flex justify-center items-center w-full"
                >
                    <Logo className="w-[40%]" />
                </div>
                <div
                    ref={buttonsContainerRef}
                    className="mt-10 flex flex-col gap-10 justify-center items-center"
                >
                    <MenuButton onClick={handleStartAdventure}>
                        Start Adventure
                    </MenuButton>
                    <MenuButton>Character</MenuButton>
                </div>
            </div>
        </>
    );
}
