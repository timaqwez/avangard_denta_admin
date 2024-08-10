import { IconButton } from "@mui/material";
import { FaFilter } from "react-icons/fa";

interface FilterButtonProps {
    handle: any,
}


export const FilterButton: React.FC<FilterButtonProps> = ({handle}) => {
    return (
        <IconButton size="small" style={{ height: '48px', width: '48px', color: 'black', margin: '5px'}} onClick={handle} disableRipple={true}>
            <FaFilter style={{ height: '50px', width: '50px' }}/>
        </IconButton>
    )
    
}