import React from "react";
import Chip from "@mui/material/Chip";
import { blue, green, purple } from "@mui/material/colors";

export default function CustomChip({ children }: any) {
    const chipColor = children === "FEEDBACK" ? purple[500] : children === "OPEN" ? blue[500] : green[500];

    const styles = {
        chip: {
            backgroundColor: chipColor,
            color: "white",
        },
    };

    return <Chip label={children} sx={styles.chip} />;
}
