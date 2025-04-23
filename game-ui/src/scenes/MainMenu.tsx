import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Logo, Background, MenuButton } from "@/components/menu";
import { useGameManager } from "@/hooks/useGameManager";

export default function MainMenu() {
    const [canClick, setCanClick] = React.useState(false);

    // GSAP animation
    const container = useRef(null);
    const logoRef = useRef(null);
    const buttonsContainerRef = useRef(null);

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
                    onComplete: () => setCanClick(true),
                },
                0
            );
    }, [container]);

    // Click handlers
    const { setScene } = useGameManager();
    const handleStartAdventure = () => {
        if (!canClick) return;
        setScene("loadingproblem");
    };

    return (
        <>
            <Background />
            <div
                ref={container}
                className="absolute w-screen h-screen overflow-hidden"
            >
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
                        canClick={canClick}
                    >
                        Start Adventure
                    </MenuButton>
                    <MenuButton canClick={canClick}>Character</MenuButton>
                </div>
            </div>
        </>
    );
}
