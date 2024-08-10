import { IconButton } from "@mui/material"
import { MoreIcon } from "../icons/MoreIcon"


interface MoreButtonProps {
    handler: any,
}


export const MoreButton: React.FC<MoreButtonProps> = ({handler}) => {
    return (
        <div onClick={handler}>
            <IconButton disableRipple>
                <MoreIcon/>
            </IconButton>
        </div>
    )
    
}