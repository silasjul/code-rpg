"use client";

import React from "react";
import { useGameManager } from "@/hooks/useGameManager";
import {
    MainMenu,
    BattleScreen,
    Cutscene,
    GameOver,
    PickupScreen,
} from "@/scenes";

export type Scene = "menu" | "cutscene" | "battle" | "pickup" | "gameover";

export default function Game() {
    const { scene, transition } = useGameManager();

    const sceneMap = {
        menu: <MainMenu onTransition={transition} />,
        cutscene: <Cutscene onTransition={transition} />,
        battle: <BattleScreen onTransition={transition} />,
        pickup: <PickupScreen onTransition={transition} />,
        gameover: <GameOver onTransition={transition} />,
    };

    return sceneMap[scene];
}
