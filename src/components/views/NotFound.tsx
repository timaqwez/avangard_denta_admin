import { Box, Divider, Typography } from "@mui/material";
import { Title } from "../Title";

export function NotFound() {
    return (
        <Box>
            <Title title={'404'}/>
            <Divider variant='fullWidth' sx={{margin: '10px 0'}}/>
            <Typography sx={{fontFamily: 'Quicksand, Manrope', fontWeight: 700, color: '#8F8F8F'}}>Страница не найдена</Typography>
        </Box>
    )
}