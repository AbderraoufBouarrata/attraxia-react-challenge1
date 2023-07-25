import React from "react";
import ThemeContextProvider from "./ThemeContext";
import TicketsProvider from "../_hooks/useFetchTickets";
export default function Contexts({ children }: { children: React.ReactNode }) {
    return (
        <TicketsProvider>
            <ThemeContextProvider>{children}</ThemeContextProvider>
        </TicketsProvider>
    );
}
