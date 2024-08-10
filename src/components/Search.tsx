import { Box, IconButton, Popover } from "@mui/material";
import { SearchField, SearchFieldProps } from "./SearchField";
import { useState } from "react";
import { SearchIcon } from "./icons/SearchIcon";

export function Search(fieldProps: SearchFieldProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setIsOpen(true)
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setIsOpen(false)
        setAnchorEl(null)
    }

    return <Box>
        <Box sx={{display: {xs: 'none', sm: 'flex'} }}>
            <SearchField {...fieldProps}/>
        </Box>
        <Box sx={{display: {xs: 'flex', sm: 'none'} }}>
            <IconButton onClick={handleOpen}>
                <SearchIcon/>
            </IconButton>
            <Popover 
                keepMounted
                open={isOpen}
                anchorEl={anchorEl}
                elevation={0}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                slotProps={{
                    paper: {sx: {background: 'transparent'}}
                }}
            >
                <SearchField {...fieldProps}/>
            </Popover >
        </Box>
    </Box>
}