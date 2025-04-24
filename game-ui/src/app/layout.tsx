import "./globals.css";
import { Pixelify_Sans } from "next/font/google";

const pixelifySans = Pixelify_Sans({
    subsets: ["latin"],
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
