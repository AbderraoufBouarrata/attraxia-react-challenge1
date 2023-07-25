"use client";

import { TableCell, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import CustomChip from "./CustomChip";
import { useFetchTickets } from "@/app/_hooks/useFetchTickets";
import { Box, Stack, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import CustomAvatar from "@/app/_components/CustomAvatar";
import StaffIcon from "@/app/_assets/icons/staff.svg";
import Image from "next/image";
import TicketsNotFound from "./TicketsNotFound";
import React from "react";
import arrow from "@/app/_assets/icons/arrow.svg";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "transparent",
        color: "black",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: "transparent",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export default function CustomTable() {
    const { tickets, sortTickets, sortingDirection } = useFetchTickets();

    const styles = {
        table: {
            boxShadow: "none",
        },
        title: {
            color: blue[600],
            fontWeight: "bold",
            padding: "0",
        },
        headers: {
            fontWeight: "bold",
            cursor: "pointer",
        },
        alignCenterY: {
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: ".5rem",
        },
        staff: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: grey[200],
            borderRadius: "2rem",
            padding: "0.25rem .75rem",
            fontWeight: "bold",
        },
        replyCount: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: grey[200],
            borderRadius: "5px",
            minWidth: "35px",
            minHeight: "30px",
            fontWeight: "bold",
        },
        sortingTitle: {
            transform: sortingDirection.title ? "rotate(-180deg)" : "rotate(0deg)",
            transition: "all .3s ease-in-out",
        },
        sortingStatus: {
            transform: sortingDirection.status ? "rotate(-180deg)" : "rotate(0deg)",
            transition: "all .3s ease-in-out",
        },
        sortingReplies: {
            transform: sortingDirection.replies ? "rotate(-180deg)" : "rotate(0deg)",
            transition: "all .3s ease-in-out",
        },
        sortingCreatedOn: {
            transform: sortingDirection["created on"] ? "rotate(-180deg)" : "rotate(0deg)",
            transition: "all .3s ease-in-out",
        },
    };
    if (!tickets) return <TicketsNotFound />;

    return (
        <TableContainer sx={styles.table} component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell
                            sx={styles.headers}
                            align="left"
                            onClick={() => {
                                sortTickets("title");
                            }}>
                            <Stack sx={styles.alignCenterY} direction="row">
                                TITLE <Image src={arrow} alt="arrow" height={15} width={15} style={styles.sortingTitle} />
                            </Stack>
                        </StyledTableCell>
                        <StyledTableCell
                            sx={styles.headers}
                            align="left"
                            onClick={() => {
                                sortTickets("status");
                            }}>
                            <Stack sx={styles.alignCenterY} direction="row">
                                STATUS <Image src={arrow} alt="arrow" height={15} width={15} style={styles.sortingStatus} />
                            </Stack>
                        </StyledTableCell>
                        <StyledTableCell
                            onClick={() => {
                                sortTickets("created on");
                            }}
                            sx={styles.headers}
                            align="left">
                            <Stack sx={styles.alignCenterY} direction="row">
                                CREATED ON <Image src={arrow} alt="arrow" height={15} width={15} style={styles.sortingCreatedOn} />
                            </Stack>
                        </StyledTableCell>
                        <StyledTableCell
                            sx={styles.headers}
                            align="left"
                            onClick={() => {
                                sortTickets("replies");
                            }}>
                            <Stack sx={styles.alignCenterY} direction="row">
                                REPLIES <Image src={arrow} alt="arrow" height={15} width={15} style={styles.sortingReplies} />
                            </Stack>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tickets.map((ticket, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell component="th" scope="row">
                                <Typography sx={styles.title}>{ticket.title}</Typography>
                                <br />
                                {ticket.description}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                <CustomChip>{ticket.status.toUpperCase()}</CustomChip>
                            </StyledTableCell>
                            <StyledTableCell align="left">{ticket["created on"]}</StyledTableCell>
                            <StyledTableCell align="left">
                                {ticket.replies.length > 0 ? (
                                    <Box sx={styles.alignCenterY}>
                                        <CustomAvatar name={ticket.replies[0].author} />
                                        <Typography sx={styles.title}>{ticket.replies[0].author}</Typography>
                                        {ticket.replies.length > 1 ? <Box sx={styles.replyCount}>+ {ticket.replies.length - 1} </Box> : null}
                                        <Box sx={{ ...styles.alignCenterY, ...styles.staff }}>
                                            <Image src={StaffIcon} alt="staff" height={25} width={25} /> Staff
                                        </Box>
                                    </Box>
                                ) : (
                                    "No reply yet"
                                )}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
