import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
    backPath?: string;
}


export const BackButton: React.FC<BackButtonProps> = ( { backPath } ) => {
    const navigate = useNavigate();
    const bp = backPath || ''

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '15px',
            color: '#c2c2c2',
            alignItems: 'center',
            cursor: 'pointer',
            height: '20px',
            fill: '#c2c2c2',
            transition: '0.3s',
            "&:hover": {
                color: '#9b9b9b',
                fill: '#9b9b9b',
            }
        }} 
        onClick={() => { navigate(bp); } }
        >
            <svg width="7" height="12" viewBox="0 0 7 12" fill="" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.35526 6.86451C-0.118421 6.38704 -0.118421 5.61288 0.35526 5.13542L4.92946 0.524722C5.40311 0.047262 6.17108 0.047262 6.64475 0.524714C7.11842 1.00217 7.11842 1.77629 6.64475 2.25375L2.92824 5.99996L6.64475 9.74619C7.11842 10.2237 7.11842 10.9977 6.64475 11.4752C6.17108 11.9527 5.40311 11.9527 4.92946 11.4752L0.35526 6.86451Z"/>
            </svg>
            <Box sx={{fontSize: '17px', fontWeight: '600', userSelect: 'none'}}>Назад</Box>
        </Box>
    )
}