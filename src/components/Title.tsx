import React from "react";
import { BackButton } from "./buttons/BackButton";
import { CreateButton } from "./buttons/CreateButton";
import { Box } from "@mui/material";
import { CreateFormProps } from "./CreateForm";

interface TitleProps {
    title: string;
    backPath?: string;
    createProps?: CreateFormProps;
    searchBar?: JSX.Element;
}

export const Title: React.FC<TitleProps> = ({ title, backPath, searchBar, createProps }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                height: backPath ? '90px' : '50px'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    flex: '1 1 auto',
                    minWidth: 0
                }}
            >
                {backPath && (
                    <Box sx={{ marginBottom: {sm: '10px', xs: '5px'} }}>
                        <BackButton backPath={backPath} />
                    </Box>
                )}
                <Box
                    sx={{
                        display: 'block',
                        userSelect: 'none',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        fontSize: { md: '30px', xs: '25px' },
                        fontWeight: '700',
                        minWidth: 0,
                        flexGrow: 1,
                        width: '100%'
                    }}
                >
                    {title}
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    flexShrink: 0, 
                    minWidth: 'auto'
                }}
            >
                {searchBar}
                {createProps && <CreateButton {...createProps} />}
            </Box>
        </Box>
    );
};
