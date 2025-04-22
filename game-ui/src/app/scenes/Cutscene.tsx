import React from 'react'
import { Scene } from "@/app/hooks/useGameManager";

interface CutSceneProps {
    onTransition: (nextScene: Scene) => void;
}

export default function Cutscene({ onTransition }: CutSceneProps) {

  return (
    <div>Cutscene</div>
  )
}
