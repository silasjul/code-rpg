import React from "react";
import { Scene } from "@/hooks/useGameManager";

interface BattleScreenProps {
    onTransition: (nextScene: Scene) => void;
}

export default function BattleScreen({ onTransition }: BattleScreenProps) {
    return <div>BattleScreen</div>;
}
