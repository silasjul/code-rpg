import React from "react";
import { Scene } from "@/hooks/useGameManager";

interface PickupScreenProps {
    onTransition: (nextScene: Scene) => void;
}

export default function PickupScreen({ onTransition }: PickupScreenProps) {
    return <div>PickupScreen</div>;
}
