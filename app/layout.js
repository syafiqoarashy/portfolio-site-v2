import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {ThemeProvider} from "@/contexts/ThemeContext";

const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-dm-sans',
});

export const metadata = {
    title: "Syafiqo's Portfolio",
    description: "Syafiqo's curated best works.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={`${dmSans.variable} font-sans antialiased`}>
        <ThemeProvider>
            <Navbar />
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}