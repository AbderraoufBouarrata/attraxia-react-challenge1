import { useFetchTickets } from "@/app/_hooks/useFetchTickets";
import { Box, Pagination } from "@mui/material";
import React from "react";
import TicketsNotFound from "./TicketsNotFound";

type Props = {
    page: number;
    setPage: any;
    itemsPerPage: number;
};

const styles = {
    pagination: {
        "& .MuiPaginationItem-root": {
            borderRadius: "50%",
            backgroundColor: "transparent",
            color: "black",
            "&:hover": {
                color: "black",
            },
        },
        ".css-16vb75k-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected": {
            color: "white",
        },
        "& .MuiPaginationItem-root.Mui-selected": {
            borderRadius: "50%",
            backgroundColor: "black",
            color: "white",
        },

        padding: "1rem 0",
    },
    container: {
        display: "flex",
        width: "70%",
        justifyContent: "start",
        alignItems: "center",
    },
};

export default function CustomTablePagination(props: Props) {
    const { page, setPage, itemsPerPage } = props;
    const { tickets } = useFetchTickets();
    if (!tickets) return <TicketsNotFound />;

    const PER_PAGE = itemsPerPage;

    const count = Math.ceil(tickets.length / PER_PAGE);

    function handleChangePage(event: React.ChangeEvent<unknown>, value: number) {
        setPage(value); // Update the page state to the selected page
    }

    return (
        <Box sx={styles.container}>
            <Pagination
                onChange={handleChangePage}
                page={page}
                count={count}
                shape="rounded"
                hideNextButton
                hidePrevButton
                //@ts-ignore
                sx={styles.pagination}
            />
        </Box>
    );
}
