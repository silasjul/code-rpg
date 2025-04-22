import { useState } from "react";

export type Scene =
    | "menu"
    | "cutscene"
    | "battle"
    | "pickup"
    | "gameover";

export const useGameManager = () => {
    const [scene, setScene] = useState<Scene>("menu");
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Game state variables
    const [playerHP, setPlayerHP] = useState(100);
    const [inventory, setInventory] = useState<string[]>([]);

    const transition = (nextScene: Scene, delay = 5000) => {
        setIsTransitioning(true);
        setScene("cutscene");

        setTimeout(() => {
            setScene(nextScene);
            setIsTransitioning(false);
        }, delay);
    };

    return {
        scene,
        isTransitioning,
        transition,

        // Game state
        playerHP,
        setPlayerHP,
        inventory,
        setInventory,
    };
};
