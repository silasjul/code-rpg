import React from 'react'
import { Scene } from "@/app/hooks/useGameManager";

interface PickupScreenProps {
    onTransition: (nextScene: Scene) => void;
}

export default function PickupScreen({ onTransition }: PickupScreenProps) {
  return (
    <div>PickupScreen</div>
  )
}
