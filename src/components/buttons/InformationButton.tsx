import { IconButton } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { useState } from "react";
import { InfoDialog } from "../InfoDialog";

export interface InformationButtonProps{
    title: string,
    info: string,
}

export function InformationButton(props: InformationButtonProps) {
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setIsOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setIsOpenDialog(false);
    };
    return (
        <>
        <IconButton
                disableFocusRipple
                disableTouchRipple
                disableRipple
                sx={{color: 'primary.main'}}
                onClick={handleOpenDialog}
            >
                <InfoIcon style={{width: '40px', height: '40px'}}/>
        </IconButton>
        <InfoDialog
            isOpenDialog={isOpenDialog}
            handleCloseDialog={handleCloseDialog}
            title={props.title}
            info={props.info}
        />
        </>
    )
}
