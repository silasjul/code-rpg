"use client";

import React from "react";
import { GameManagerProvider, useGameManager } from "@/hooks/useGameManager";
import { Jacquard_12 } from "next/font/google";

export const pixelFont = Jacquard_12({
    subsets: ["latin"],
    weight: "400",
});

function SceneContent() {
    const { sceneMap, scene } = useGameManager();
    return sceneMap[scene];
}

export default function SceneRenderer() {
    return (
        <GameManagerProvider>
            <SceneContent />
        </GameManagerProvider>
    );
}
