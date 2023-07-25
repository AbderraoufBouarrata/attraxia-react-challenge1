import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

const styles = {
    appBar: {
        width: "100%",
        height: "50px",
        color: "white",
        backgroundColor: grey[900],
    },
};

export default function AppBar() {
    return <Box sx={styles.appBar} />;
}
