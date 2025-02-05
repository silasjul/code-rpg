import React from "react";

interface Props {
    transition: (page: string) => void;
}

export default function Transition({ transition }: Props) {
    return <div className="w-screen h-screen bg-green-500"></div>;
}
