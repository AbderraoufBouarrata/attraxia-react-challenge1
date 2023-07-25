import { useFetchTickets } from "@/app/_hooks/useFetchTickets";
import { Pagination } from "@mui/material";
import React from "react";
import TicketsNotFound from "./TicketsNotFound";

const styles = {
    pagination: {
        "& .MuiPaginationItem-root": {
            borderRadius: "50%",
            backgroundColor: "transparent",
            color: "black",
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
};

export default function CustomTablePagination() {
    // @ts-ignore
    const { tickets, handlePageChange } = useFetchTickets();
    if (!tickets) return <TicketsNotFound />;

    const [page, setPage] = React.useState(1);

    const PER_PAGE = 5;
    const [count, setCount] = React.useState(Math.ceil(tickets.length / PER_PAGE));

    function handleChangePage(event: React.ChangeEvent<unknown>, value: number) {
        setPage(value); // Update the page state to the selected page
        handlePageChange(value); // Call handlePageChange to update displayed tickets
    }

    return (
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
    );
}
