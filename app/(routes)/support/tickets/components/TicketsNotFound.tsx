import React from "react";
import NotFound from "@/app/_assets/images/no-tickets.svg";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const container = {
    marginTop: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
};

export default function TicketsNotFound() {
    return (
        <Box sx={container}>
            <Image src={NotFound} width={100} height={100} alt="not found" />
            <Typography variant="h6" fontWeight="bold">
                No Ticket Found
            </Typography>
            <Typography variant="body1">Please adjust your search term and try again.</Typography>
        </Box>
    );
}
