import { Button, Box, Grid, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import React from "react";
import SupportIcon from "../../../../_assets/icons/support.svg";
import ChatIcon from "../../../../_assets/icons/chat.svg";
import Image from "next/image";
import Link from "next/link";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CustomInput from "@/app/_components/CusomInput";

const styles = {
    mainContainer: {
        width: "70%",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: ".5rem",
    },
    heading: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "2rem",
        borderBottom: "2px solid lightgrey",
        height: "fit-content",
    },
    alignCenterY: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        gap: ".5rem",
    },
    alignCenterXY: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
    },
    needHelp: {
        color: grey[600],
    },
    button: {
        fontWeight: "bold",
        padding: "1rem 1.5rem",
        backgroundColor: blue[500],
        borderRadius: "10px",
    },
    link: {
        textDecoration: "none",
        color: "inherit",
    },
};

export default function SupportRescources() {
    return (
        <Box sx={styles.mainContainer}>
            <Grid container height="100%">
                <Grid item xs={12} sx={styles.heading}>
                    <Typography variant="h5" fontWeight="bold">
                        Support Resources
                    </Typography>
                    <Box sx={styles.alignCenterY}>
                        <Typography sx={styles.needHelp}>Need Help?</Typography>
                        <Button variant="contained" color="primary" sx={{ ...styles.alignCenterY, ...styles.button }}>
                            <Image src={SupportIcon} alt="support" width={25} height={25} />
                            Get Support
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} sx={styles.alignCenterXY} flexDirection="column" height="">
                    <Image src={ChatIcon} alt="support" width={100} height={100} quality={100} />
                    <Typography variant="h4" fontWeight="bold">
                        Support Forums
                    </Typography>
                    <Typography sx={styles.needHelp}>Search the topic you need help with in our support forums.</Typography>
                    <Link href="/support" style={styles.link}>
                        <Button color="primary" sx={{ ...styles.alignCenterY, fontWeight: "bold" }}>
                            Browse Forums <ArrowForwardRoundedIcon />
                        </Button>
                    </Link>
                    <CustomInput category="search" placeholder="Search Support Forum" sx={{ width: "25rem" }} />
                </Grid>
            </Grid>
        </Box>
    );
}
