import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box, Chip } from "@mui/material";
import { blue, green, grey, purple } from "@mui/material/colors";
import { useFetchTickets } from "@/app/_hooks/useFetchTickets";
import TicketsNotFound from "./TicketsNotFound";
import { Ticket } from "@/app/_types/tickets";

const styles = {
    dropdown: {
        fontWeight: "bold",
        fontSize: "14px",
        "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
        },
    },
    box: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    menuItem: {},
};

export default function CustomDropdown() {
    const options = ["ALL", "OPEN", "FEEDBACK", "RESOLVED"];
    const { tickets, searchForTicketByStatus } = useFetchTickets();

    const [option, setOption] = React.useState("ALL");
    const [allStatusCount, setAllStatusCount] = React.useState([0, 0, 0, 0]);

    const handleChange = (event: SelectChangeEvent) => {
        setOption(event.target.value);
    };

    if (!tickets) return <TicketsNotFound />;
    const ticketsLength = [tickets.length];

    const getTotalStatusCount = React.useCallback((data: Ticket[]): { [status: string]: number } => {
        const statusCounts: { [status: string]: number } = {};

        for (const ticket of data) {
            const status = ticket.status;
            if (statusCounts[status]) {
                statusCounts[status]++;
            } else {
                statusCounts[status] = 1;
            }
        }

        return statusCounts;
    }, []);

    React.useEffect(() => {
        setAllStatusCount(ticketsLength.concat(Object.values(getTotalStatusCount(tickets))));
    }, []);

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
                <Select value={option} onChange={handleChange} displayEmpty inputProps={{ "aria-label": "Without label" }} sx={styles.dropdown}>
                    {options.map((option, index) => (
                        <MenuItem key={option} value={option} sx={{ minWidth: "200px" }} onClick={() => searchForTicketByStatus(option)}>
                            <Box sx={styles.box}>
                                {option}
                                <Chip
                                    label={allStatusCount[index]}
                                    sx={{
                                        backgroundColor:
                                            option === "FEEDBACK"
                                                ? purple[500]
                                                : option === "OPEN"
                                                ? blue[500]
                                                : option === "ALL"
                                                ? grey[300]
                                                : green[500],
                                    }}
                                />
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
