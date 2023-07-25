"use client";
import React from "react";
import Image from "next/image";
import { BoxProps, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";

import SearchIcon from "../_assets/icons/search.svg";
import { blue, grey } from "@mui/material/colors";

const CssTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        boxSizing: "border-box",
        backgroundColor: grey[200],

        "& fieldset": {
            border: `none`,
            transition: "border-color 0.3s",
        },
        "&:hover fieldset": {
            borderColor: blue[500],
            transition: "border-color 0.3s",
        },
        "&.Mui-focused fieldset": {
            border: `2px solid ${blue[500]}`,
            backgroundColor: "transparent",
        },
    },
});

type MainInputProps = TextFieldProps &
    BoxProps & {
        category?: "text" | "search" | undefined;
    };

export default function CustomInput(props: MainInputProps) {
    const { category, ...restProps } = props;

    const styles = {
        input: {
            height: "full",
            borderRadius: "2rem",
        },
        inputStyle: {
            sx: {
                color: "black",
                borderRadius: "2rem",
                height: "3rem",
            },
            startAdornment: category === "search" && (
                <InputAdornment position="start">
                    <Image src={SearchIcon} alt="search" style={{}} />
                </InputAdornment>
            ),
        },
    };

    return <CssTextField sx={styles.input} InputProps={styles.inputStyle} {...restProps} />;
}
