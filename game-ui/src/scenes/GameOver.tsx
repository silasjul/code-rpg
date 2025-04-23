import React from "react";
import { Scene } from "@/app/page";

interface GameOverProps {
    onTransition: (nextScene: Scene) => void;
}

export default function GameOver({ onTransition }: GameOverProps) {
    return <div>GameOver</div>;
}
