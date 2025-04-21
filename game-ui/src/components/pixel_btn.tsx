import { Jacquard_12 } from "next/font/google";

const pixelFont = Jacquard_12({
    subsets: ["latin"],
    weight: "400",
});

interface TitleButtonProps {
    children: React.ReactNode;
}

export default function TitleButton({ children }: TitleButtonProps) {
    return (
        <button
            className={`text-8xl text-black hover:text-white hover:scale-110 duration-200 ${pixelFont.className}`}
        >
            {children}
        </button>
    );
}
