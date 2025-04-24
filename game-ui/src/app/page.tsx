"use client";

import React from "react";
import { GameManagerProvider, useGameManager } from "@/hooks/useGameManager";

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
