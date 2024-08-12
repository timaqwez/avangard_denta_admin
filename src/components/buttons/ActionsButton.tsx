import React, { useState } from 'react';
import { Box, Divider, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { grey, red } from '@mui/material/colors'
import { MoreButton } from './MoreButton';
import { Handler } from '../../config/handlers';
import { DeleteDialog } from '../DeleteDialog';

interface ActionsButtonProps {
    object: any,
    loading: string,
    handlers: Handler[],
}

export const ActionsButton: React.FC<ActionsButtonProps> = ( {object, handlers} ) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [currentHandler, setCurrentHandler] = useState<Handler | null>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setIsOpenMenu(true)
        setAnchorEl(event.currentTarget)
    }

    const handleCloseMenu = () => {
        setIsOpenMenu(false)
        setAnchorEl(null)
    }

    const handleOpenDialog = (handler: Handler) => {
        setCurrentHandler(handler);
        handleCloseMenu();
        setIsOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setIsOpenDialog(false);
        setCurrentHandler(null);
    };

    const handleConfirm = () => {
        if (currentHandler) {
            currentHandler?.handler(object)
        }
        handleCloseDialog()
    }

    function getActionsMenuItem(object: any, handler: Handler) {
        return (
            <MenuItem sx={{
                width: '100%', 
                color: handler.id === 'delete' ? red[500] : 'primary.main', 
                transition: '0.3s',
                fontWeight: '800',
                padding: '5px 20px', 
                minHeight: '5px'
            }} 
                onClick={() => {
                    if(handler.id === 'delete') {
                        handleOpenDialog(handler);
                    } else {
                        handleCloseMenu();
                        handler.handler(object);
                    }
                }}
            >
                <ListItemIcon sx={{color: handler.id === 'delete' ? red[300] : 'primary.main'}}>
                    {handler.icon}
                </ListItemIcon>
                <ListItemText>
                    <Box sx={{fontWeight: '700', fontSize: '14px'}}>{handler.title}</Box>
                </ListItemText>
            </MenuItem>
        )
    }

    return (
        <div key={`${object.id}-actions-menu-wrapper`}>
            <MoreButton handler={handleOpenMenu}/>
            <Menu
                keepMounted
                open={isOpenMenu}
                anchorEl={anchorEl}
                elevation={0}
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
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
                <Box sx={{display: 'flex', gap: '3px', flexDirection: 'column'}}>
                    {handlers.map((handler, index) => (
                        <React.Fragment key={handler.id}>
                            {index < handlers.length && handler.id === 'delete' && handlers[index-1] && <Divider sx={{color: '#000'}} variant='middle'/>}
                            {handler.id != 'add' && getActionsMenuItem(object, handler)}
                        </React.Fragment>
                    ))}
                </Box>
            </Menu>
            <DeleteDialog 
                isOpenDialog={isOpenDialog} 
                handleCloseDialog={handleCloseDialog} 
                handleConfirm={handleConfirm}            
            />
        </div>
    );
}
