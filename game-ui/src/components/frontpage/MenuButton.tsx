import { Jacquard_12 } from "next/font/google";

const pixelFont = Jacquard_12({
    subsets: ["latin"],
    weight: "400",
});

interface MenuButtonProps {
    children: React.ReactNode;
    className?: string;
}

export default function MenuButton({ children, className }: MenuButtonProps) {
    return (
        <button
            className={`text-[#000000] text-outline text-7xl w-[20%] hover:ring-2 px-6 py-3 border-2 border-[#241812] hover:ring-yellow-300 rounded-md bg-black/40 hover:bg-black/60 transition transform hover:scale-105 active:scale-95 shadow-md backdrop-blur-sm ${pixelFont.className} ${className}`}
        >
            {children}
        </button>
    );
}
