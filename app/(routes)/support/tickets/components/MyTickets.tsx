"use client";

import React from "react";
import { Button, Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import CustomInput from "@/app/_components/CusomInput";
import CustomTable from "./CusomTable";
import { useFetchTickets } from "@/app/_hooks/useFetchTickets";
import { useDebounce } from "@/app/_hooks/useDebouncer";
import Loading from "@/app/loading";
import CustomMenu from "./CustomDropdown";
import CustomDropdown from "./CustomDropdown";
import TicketsNotFound from "./TicketsNotFound";
import CustomTablePagination from "./CustomTablePagination";

const styles = {
    mainContainer: {
        mt: "4rem",
        width: "70%",
        minHeight: "700px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: ".5rem",
        padding: "2rem",
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
        gap: "1rem",
    },
    alignCenterXY: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
    },
};

export default function MyTickets() {
    const { tickets, searchForTicket } = useFetchTickets();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [searchValue, setSearchValue] = React.useState<string>("");
    if (!tickets) return <TicketsNotFound />;
    const debouncedValue = useDebounce(searchValue, 1000);

    function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        setIsLoading(true);

        setSearchValue(event.target.value);
    }

    React.useEffect(() => {
        searchForTicket(searchValue);
        setIsLoading(false);
    }, [debouncedValue]);

    return (
        <>
            <Box sx={styles.mainContainer}>
                <Grid container height="100%">
                    <Grid item xs={12} sx={styles.heading}>
                        <Typography variant="h5" fontWeight="bold">
                            My Tickets
                        </Typography>
                        <Box sx={styles.alignCenterY}>
                            <CustomDropdown />
                            <CustomInput
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchChange(e)}
                                category="search"
                                placeholder="Search Support Forum"
                                sx={{ width: "15rem" }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sx={styles.alignCenterXY} flexDirection="column" height="100%">
                        {isLoading ? <Loading /> : tickets.length > 0 ? <CustomTable /> : <TicketsNotFound />}
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
