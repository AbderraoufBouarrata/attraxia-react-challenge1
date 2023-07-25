"use client";

import React from "react";
import mockData from "../_data/mockData.json";
import { Tickets } from "../_types/tickets";

type initialStateType = {
    tickets: Tickets;

    searchForTicket: (value: string) => void;
    sortTickets: (sortBy: string) => void;
    sortingDirection: any;
    searchForTicketByStatus: (value: string) => void;
};

const initialState: initialStateType = {
    tickets: null,

    searchForTicket: () => {},
    sortTickets: () => {},
    sortingDirection: null,
    searchForTicketByStatus: () => {},
};

const Context = React.createContext<initialStateType>(initialState);

export default function TicketsProvider({ children }: { children: React.ReactNode }) {
    //@ts-ignore
    const [tickets, setTickets] = React.useState<Tickets>(mockData);
    //@ts-ignore

    const sort = {
        title: false,
        status: false,
        replies: false,
        "created on": false,
    };
    const [sortingDirection, setSortingDirection] = React.useState<any>(sort);
    // some logic to fetch tickets from the server

    function refreshState() {
        // some logic to fetch tickets from the server
        // @ts-ignore
        setTickets(mockData);
    }
    // @ts-ignore
    function sortTicketsByDate() {
        if (!tickets) return;
        refreshState();
        const sortedData = [...tickets];

        sortedData.sort((a, b) => {
            // @ts-ignore
            const dateA = new Date(a["created on"]);
            // @ts-ignore
            const dateB = new Date(b["created on"]);

            if (sortingDirection["created on"]) {
                return dateA.getTime() - dateB.getTime();
            } else {
                return dateB.getTime() - dateA.getTime();
            }
        });

        // @ts-ignore
        setTickets(sortedData);
    }

    function sortTickets(sortBy: string) {
        if (!tickets) return;
        const sortedData = [...tickets];

        // Define a sorting function based on the given 'sortBy' parameter
        let sortingFunction;
        switch (sortBy) {
            case "title":
                sortingFunction = (a: { title: string }, b: { title: any }) => a.title.localeCompare(b.title);

                break;
            case "status":
                sortingFunction = (a: { status: string }, b: { status: any }) => a.status.localeCompare(b.status);

                break;
            case "replies":
                sortingFunction = (a: { replies: string | any[] }, b: { replies: string | any[] }) => a.replies.length - b.replies.length;

                break;
            case "created on":
                sortTicketsByDate();
                setSortingDirection((prevState: { [x: string]: any }) => {
                    const updatedState: any = {};
                    for (const key in prevState) {
                        updatedState[key] = key === sortBy ? !prevState[key] : false;
                    }
                    return { ...updatedState, [sortBy]: !prevState[sortBy] };
                });
                return;
            default:
                sortingFunction = () => 0; // No sorting if invalid sortBy parameter is provided
        }

        // Sort the data using the selected sorting function
        sortedData.sort(sortingFunction);

        // Reverse the data if sortDirection is false
        if (sortingDirection[sortBy] === false) {
            sortedData.reverse();
        }
        setSortingDirection((prevState: { [x: string]: any }) => {
            const updatedState: any = {};
            for (const key in prevState) {
                updatedState[key] = key === sortBy ? !prevState[key] : false;
            }
            return { ...updatedState, [sortBy]: !prevState[sortBy] };
        });

        setTickets(sortedData);
    }

    function searchForTicket(value: string) {
        if (!tickets) return;

        const filtered = mockData.filter((ticket) => ticket.title.toLowerCase().includes(value.toLowerCase()));
        // @ts-ignore
        setTickets(filtered);
    }

    function searchForTicketByStatus(value: string) {
        if (!tickets) return;
        if (value === "ALL") {
            // @ts-ignore
            setTickets(mockData);
            return;
        }
        const filtered = mockData.filter((ticket) => ticket.status.toLowerCase().includes(value.toLowerCase()));
        // @ts-ignore
        setTickets(filtered);
    }
    function handlePageChange(pageNumber: number) {
        // @ts-ignore
        setTickets(mockData.slice((pageNumber - 1) * 5, pageNumber * 5));
    }

    React.useEffect(() => {
        setContextValue((prev) => ({ ...prev, tickets, sortingDirection, sortTickets, searchForTicket, searchForTicketByStatus, handlePageChange }));
    }, [tickets]);

    const [contextValue, setContextValue] = React.useState({
        tickets,
        searchForTicket,
        sortTickets,
        sortingDirection,
        searchForTicketByStatus,
        handlePageChange,
    });
    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export function useFetchTickets() {
    return React.useContext(Context);
}
