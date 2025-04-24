import React, {
    createContext,
    useState,
    Dispatch,
    SetStateAction,
    useContext,
} from "react";
import {
    MainMenu,
    BattleScreen,
    Cutscene,
    GameOver,
    PickupScreen,
    ProblemLoader,
} from "@/scenes";
import gsap from "gsap";

const sceneMap = {
    menu: <MainMenu />,
    cutscene: <Cutscene />,
    battle: <BattleScreen />,
    pickup: <PickupScreen />,
    gameover: <GameOver />,
    problemloader: <ProblemLoader />,
};
type Scene = keyof typeof sceneMap;

type GameContextType = {
    scene: Scene;
    setScene: Dispatch<SetStateAction<Scene>>;
    sceneMap: typeof sceneMap;
    playerHP: number;
    transition: (
        continerRef: HTMLDivElement | null,
        onFade: () => void
    ) => void;
    setPlayerHP: Dispatch<SetStateAction<number>>;
    inventory: string[];
    setInventory: Dispatch<SetStateAction<string[]>>;
};

const GameContext = createContext<GameContextType | null>(null);

export const GameManagerProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    // Game state
    const [scene, setScene] = useState<Scene>("menu");

    // Player state
    const [playerHP, setPlayerHP] = useState(100);
    const [inventory, setInventory] = useState<string[]>([]);

    // Transition animation
    const transition = (
        continerRef: HTMLDivElement | null,
        onFade: () => void
    ) => {
        gsap.timeline()
            .to(continerRef, {
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
            })
            .call(() => {
                onFade();
            })
            .to(continerRef, {
                opacity: 1,
                duration: 1,
                ease: "power2.inOut",
            });
    };

    return (
        <GameContext.Provider
            value={{
                // Game state
                scene,
                sceneMap,
                setScene,

                // Transition
                transition,

                // Player
                playerHP,
                setPlayerHP,
                inventory,
                setInventory,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGameManager = () => {
    const gameContext = useContext(GameContext);
    if (!gameContext) {
        throw new Error(
            "This hook can only be used within a scene components."
        );
    }
    return gameContext;
};
