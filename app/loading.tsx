import Image from "next/image";
import Animation from "./_assets/animations/loading.svg";
import { Box } from "@mui/material";

const styles = {
    container: {
        marginTop: "300px",
    },
};

export default function loading() {
    return (
        <Box sx={styles.container}>
            <Image src={Animation} width={100} height={100} alt="loadign" />
        </Box>
    );
}
