import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Button, Typography } from "@mui/material";
import dotenv from "dotenv";
import Image from "next/image";
import Link from "next/link";
import Logo from "./_assets/icons/logo.jpg";

dotenv.config({ path: ".env" });

const styles = {
    heading: {
        textDecoration: "underline",
    },
    button: {
        my: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: ".5rem",
        padding: ".5rem 1rem",
    },
    link: {
        textDecoration: "none",
        color: "inherit",
    },
};

export default function Home() {
    return (
        <>
            <Link style={styles.link} href={process.env.COMPANY_URL as string} target="_blank">
                <Image src={Logo} alt="logo" width={200} height={200} quality={100} />
            </Link>
            <Typography variant="h2">Welcome to Attraxia</Typography>
            <Link style={styles.link} href="/support">
                <Button variant="contained" color="primary" sx={styles.button}>
                    Your Tickets <ArrowForwardRoundedIcon />
                </Button>
            </Link>
        </>
    );
}
