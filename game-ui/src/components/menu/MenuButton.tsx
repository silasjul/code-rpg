import { pixelFont } from "@/app/page";

interface MenuButtonProps {
    children: React.ReactNode;
    canClick?: boolean;
    className?: string;
    onClick?: () => void;
}

export default function MenuButton({
    children,
    canClick,
    className,
    onClick,
}: MenuButtonProps) {
    return (
        <button
            className={`text-[#000000] text-outline text-7xl w-96 hover:ring-2 px-6 py-3 border-2 border-[#241812] hover:ring-yellow-300 rounded-md bg-black/40 hover:bg-black/60 transition transform hover:scale-105 shadow-md backdrop-blur-sm ${
                pixelFont.className
            } ${className} ${canClick && "active:scale-95"}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
