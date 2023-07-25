import { Box, CssBaseline } from "@mui/material";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Contexts from "./_contexts";
import AppBar from "./_components/AppBar";
const inter = Inter({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
    title: "Assignment 1",
    description: "This is using nextjs 13 app router 🔥",
};

const styles = {
    layout: {
        maxWidth: "1536px",
        margin: "0 auto",
        minHeight: "100vh",
    },
    children: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2rem",
    },
    body: {
        backgroundColor: "rgba(249, 249, 249, 1)",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <Contexts>
                <body className={inter.className} style={styles.body}>
                    <CssBaseline />
                    <AppBar />
                    <Box sx={styles.layout}>
                        <Box sx={styles.children}>{children}</Box>
                    </Box>
                </body>
            </Contexts>
        </html>
    );
}
