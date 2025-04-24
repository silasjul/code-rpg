import React from "react";

interface HintProps {
    className?: string;
    children?: React.ReactNode;
}

export default function Hint({ className, children }: HintProps) {
    return (
        <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#000000] text-7xl w-96 hover:ring-2 px-6 py-3 border-2 border-[#241812] hover:ring-yellow-300 rounded-md bg-black/40 hover:bg-black/60 transition transform hover:scale-105 shadow-md backdrop-blur-sm ${className}`}
        >
            <h1 className={`text-center mb-5 text-7xl text-outline`}>Tip:</h1>
            <p className="text-lg text-white">{children}</p>
        </div>
    );
}
