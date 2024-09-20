import { Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material"
import { ArrowIcon } from "../icons/ArrowIcon"
import { grey, red } from "@mui/material/colors"
import { useState } from "react";
import { Handler } from "../../config/handlers";
import { AccountIcon } from "../icons/AccountIcon";


export interface AccountButtonProps {
    username?: string,
    handlers: Handler[],
}

export function AccountButton(props: AccountButtonProps) {
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

    return (
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px', userSelect: 'none',
            cursor: 'pointer'}} key='header-account-button'>
            <Box 
                key='header-account-username' 
                sx={{
                    fontWeight: '700', 
                    display: {md: 'flex', xs: 'none'},
                    userSelect: 'none',
                    cursor: 'pointer'
                }} 
                onClick={handleOpen}
            >
                {props.username || 'unknown'}
            </Box>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} key='header-account-button-container'>
                <div key='header-account-icon-container' style={{marginBottom: '0'}}>
                    <IconButton key='header-account-button' sx={{color: 'white', padding: 0}} onClick={handleOpen} disableRipple>
                        <AccountIcon key='header-account-icon' height={30} width={30}/>
                    </IconButton>
                </div>
                <div>
                    <IconButton key='header-account-button' sx={{color: 'white', paddingRight: 0}} onClick={handleOpen} disableRipple>
                        <ArrowIcon key='header-account-button-icon' height={10} width={10}/>
                    </IconButton>
                    <Menu
                        keepMounted
                        open={isOpen}
                        anchorEl={anchorEl}
                        elevation={0}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        slotProps={{
                            paper: {
                                sx: {
                                    borderRadius: '10px',
                                    padding: '5px 0',
                                    border: '1px solid',
                                    borderColor: grey[200],
                                }
                            }
                        }}
                    >
                        {props.handlers.map((handler, index) => (
                            <MenuItem key={`account-button-menu-item-${index}`} sx={{width: '100%', color: handler.id === 'delete' ? red[500] : 'primary.main', transition: '0.3s',fontWeight: '800',padding: '5px 20px', minHeight: '5px'}} onClick={() => handler.handler()}>
                                <ListItemIcon sx={{color: handler.id === 'delete' ? red[300] : 'primary.main'}}>
                                    {handler.icon}
                                </ListItemIcon>
                                <ListItemText><Box sx={{fontWeight: '700', fontSize: '14px'}}>{handler.title}</Box></ListItemText>
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
            </div>
        </Box>
    )
}
