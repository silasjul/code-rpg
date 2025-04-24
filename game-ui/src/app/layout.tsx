import "./globals.css";
import { Jacquard_12, Pixelify_Sans } from "next/font/google";

const pixelifySans = Pixelify_Sans({
    subsets: ["latin"],
});

export const pixelFont = Jacquard_12({
    subsets: ["latin"],
    weight: "400",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${pixelifySans.className} antialiased`}>
                {children}
            </body>
        </html>
    );
}
