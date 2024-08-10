import { Box, Card, Divider } from "@mui/material";

export interface StatsCardProps {
    statName: string,
    statText: string,
    statForDay: string,
    statForWeek: string,
}

export const StatsCard: React.FC<StatsCardProps> = ({statName, statText, statForDay, statForWeek}) => {
    return <Card sx={{padding: '20px', background: '#F8F9FA', borderRadius: '20px', height: 'fit-content', width: '100%'}} elevation={0}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start' }}>
                <div style={{fontWeight: '700', color: '#8F8F8F'}}>{statName}</div>
                <Box sx={{fontFamily: 'Quicksand, Manrope', fontWeight: '700', fontSize: {xs: '40px', md: '60px'},}}>{statText}</Box>
            </Box>
            <Divider variant='fullWidth' sx={{marginBottom: '10px'}}></Divider>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start', width: '50%'}}>
                    <div style={{fontWeight: '700', color: '#8F8F8F', fontSize: '13px'}}>За 24 часа</div>
                    <div style={{fontFamily: 'Quicksand, Manrope', fontWeight: '700'}}>{statForDay}</div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start', width: '50%'}}>
                    <div  style={{fontWeight: '700', color: '#8F8F8F', fontSize: '13px'}}>За 7 дней</div>
                    <div style={{fontFamily: 'Quicksand, Manrope', fontWeight: '700'}}>{statForWeek}</div>
                </div>
            </div>
        </div>
    </Card>
}