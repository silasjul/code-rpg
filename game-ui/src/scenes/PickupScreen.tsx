import React from "react";
import { Scene } from "@/app/page";

interface PickupScreenProps {
    onTransition: (nextScene: Scene) => void;
}

export default function PickupScreen({ onTransition }: PickupScreenProps) {
    return <div>PickupScreen</div>;
}
