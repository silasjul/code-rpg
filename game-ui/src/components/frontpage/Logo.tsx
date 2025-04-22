import React from "react";
import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
    return (
        <Image
            className={`pointer-events-none ${className}`}
            src="/bg/title.png"
            alt="title"
            width={964}
            height={338}
            unoptimized
        />
    );
}