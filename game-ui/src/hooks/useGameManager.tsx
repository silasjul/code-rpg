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
    LoadingProblem,
} from "@/scenes";

const sceneMap = {
    menu: <MainMenu />,
    cutscene: <Cutscene />,
    battle: <BattleScreen />,
    pickup: <PickupScreen />,
    gameover: <GameOver />,
    loadingproblem: <LoadingProblem />,
};
type Scene = keyof typeof sceneMap;

type GameContextType = {
    scene: Scene;
    setScene: Dispatch<SetStateAction<Scene>>;
    sceneMap: typeof sceneMap;
    transition: (nextScene: Scene, delay?: number) => void;
    playerHP: number;
    setPlayerHP: Dispatch<SetStateAction<number>>;
    inventory: string[];
    setInventory: Dispatch<SetStateAction<string[]>>;
}

const GameContext = createContext<GameContextType | null>(null);

export const GameManagerProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    // Game state
    const [scene, setScene] = useState<Scene>("menu");
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Player state
    const [playerHP, setPlayerHP] = useState(100);
    const [inventory, setInventory] = useState<string[]>([]);

    const transition = (nextScene: Scene, delay = 1000) => {
        setIsTransitioning(true);
        setScene("cutscene");

        setTimeout(() => {
            setScene(nextScene);
            setIsTransitioning(false);
        }, delay);
    };

    return (
        <GameContext.Provider
            value={{
                // Game state
                scene,
                sceneMap,
                setScene,
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
        throw new Error("This hook can only be used within a scene components.");
    }
    return gameContext;
}
