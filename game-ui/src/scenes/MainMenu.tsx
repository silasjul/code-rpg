import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Logo, Background, MenuButton } from "@/components/menu";
import { useGameManager } from "@/hooks/useGameManager";
import { tr } from "motion/react-client";

export default function MainMenu() {
    // GSAP animation
    const container = useRef(null);
    const logoRef = useRef(null);
    const buttonsContainerRef = useRef(null);
    const [isAnimating, setAnimating] = React.useState(false);

    useGSAP(() => {
        gsap.timeline({
            delay: 1,
            defaults: { ease: "power2", duration: 1.3 },
        })
            .fromTo(
                logoRef.current,
                {
                    scale: 0.9,
                    ease: "power1",
                },
                {
                    scale: 1,
                    opacity: 1,
                    ease: "power1",
                },
                0
            )
            .fromTo(
                buttonsContainerRef.current,
                {
                    delay: 0.2,
                    y: 50,
                },
                {
                    y: 0,
                    opacity: 1,
                    onComplete: () => setAnimating(false),
                },
                0
            );
    }, [logoRef, buttonsContainerRef]);

    // Click handlers
    const { setScene, transition } = useGameManager();
    const handleStartAdventure = () => {
        if (isAnimating) return;
        setAnimating(true);
        transition(container.current, () => {
            setScene("problemloader");
        });
    };

    return (
        <div ref={container}>
            <Background />
            <div className="absolute w-screen h-screen overflow-hidden">
                <div
                    ref={logoRef}
                    className="flex justify-center items-center w-full select-none opacity-0"
                >
                    <Logo className="w-[40%] min-w-[500px]" />
                </div>
                <div
                    ref={buttonsContainerRef}
                    className="mt-10 flex flex-col gap-10 justify-center items-center opacity-0"
                >
                    <MenuButton
                        onClick={handleStartAdventure}
                        canClick={!isAnimating}
                    >
                        Start Adventure
                    </MenuButton>
                    <MenuButton canClick={!isAnimating}>Character</MenuButton>
                </div>
            </div>
        </div>
    );
}
