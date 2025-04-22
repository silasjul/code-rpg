import React from "react";
import { Logo, Background, MenuButton } from "@/components/menu";
import { Scene } from "@/app/hooks/useGameManager";

interface MainMenuProps {
    onTransition: (nextScene: Scene) => void;
}

export default function MainMenu({ onTransition }: MainMenuProps) {
    const handleStartAdventure = () => {
        onTransition("cutscene");
    };

    return (
        <>
            <Background />
            <div className="absolute w-screen h-screen">
                <div className="flex justify-center items-center">
                    <Logo className="w-[40%]" />
                </div>
                <div className="mt-10 flex flex-col gap-10 justify-center items-center">
                    <MenuButton onClick={handleStartAdventure}>Start Adventure</MenuButton>
                    <MenuButton>Character</MenuButton>
                </div>
            </div>
        </>
    );
}
