"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function page() {
    const router = useRouter();
    React.useEffect(() => {
        router.push("/support/tickets");
    }, []);

    // TODO: Nothing here yet - this is just a placeholder
}
