interface Reply {
    author: string;
    message: string;
    "created on": string;
    role: "USER" | "STAFF";
}

interface Ticket {
    title: string;
    description: string;
    status: "feedback" | "open" | "resolved";
    "created on": string;
    replies: Reply[];
}

export type Tickets = Ticket[] | null;
