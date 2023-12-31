import * as React from "react";
import Avatar, { AvatarProps } from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            height: "2rem",
            width: "2rem",
            fontSize: "14px",
            bgcolor: stringToColor(name),
        },
        children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
}

type CustomAvatarProps = {
    name: string;
    image?: string;
} & AvatarProps;

export default function CustomAvatar({ name, image }: CustomAvatarProps) {
    return <Avatar src={image} {...stringAvatar(name)} />;
}
