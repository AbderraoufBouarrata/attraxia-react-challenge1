import { useFetchTickets } from "@/app/_hooks/useFetchTickets";
import { Box, Pagination } from "@mui/material";
import React from "react";
import TicketsNotFound from "./TicketsNotFound";

type Props = {
    visibleTickets: any;
    page: number;
    setPage: any;
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
    const { visibleTickets, page, setPage } = props;
    const { tickets, handlePageChange } = useFetchTickets();
    if (!tickets) return <TicketsNotFound />;

    const PER_PAGE = 5;
    const [count, setCount] = React.useState(Math.ceil(tickets.length / PER_PAGE));

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
