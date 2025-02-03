import { Jacquard_12 } from "next/font/google";
import Background from "@/components/background";
import Image from "next/image";

const pixelFont = Jacquard_12({
    subsets: ['latin'],
    weight: "400",
});

export default function Home() {
    return (
        <>
            <div className="absolute w-screen h-screen flex justify-center items-center z-10 ">
                <Image
                    className="absolute h-[30%] w-auto top-[1%] pointer-events-none"
                    src="/bg/title.png"
                    alt="title"
                    width={964}
                    height={338}
                    unoptimized
                />
                <button
                    className={
                        "text-8xl hover:scale-110 duration-200 " +
                        pixelFont.className
                    }
                >
                    Suck - penis
                </button>
            </div>
            <Background />
        </>
    );
}
