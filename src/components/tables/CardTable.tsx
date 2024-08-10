import { Box, Paper, TablePagination } from "@mui/material"
import { Column } from "../../config/columns/base";
import { useState } from "react";
import { DataCard, DataCardProps } from "../DataCard";

interface CardTableProps {
    data: any[],
    columns: Column[],
    dataCardProps: DataCardProps,
    pagination?: boolean,
    fullHeight?: boolean,
}

export const CardTable: React.FC<CardTableProps> = (
    {
        data, 
        columns,
        dataCardProps,
        pagination,
        fullHeight,
    }   
) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);

    const handleChangePage = (_: React.MouseEvent | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    
    return <>
        <div 
            style={{ 
                display: 'flex', 
                flexDirection: 'column',
                width: 'auto',
            }}
        >
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', color: '#9e9e9e', margin: '10px 0', flexWrap: 'wrap'}} key={'table-header'}>
                <div key={columns[0].dataName} style={{flex: '1 1 auto', minWidth: '100px'}}>
                    {columns[0].title}
                </div>
            <div key='actions' style={{flex: '0 1 auto', minWidth: '100px', textAlign: 'right'}}>Действия</div>
        </div>
        <Paper key='table-paper' elevation={0} sx={{flexGrow: '1', maxHeight: '100dvh', overflow: 'auto'}}>
            <Box key='table-container' sx={fullHeight? {
                minWidth: '200px',
                maxWidth: {sm: 'calc(100dvw - 60px - 250px)', xs: '100dvw'},
                minHeight: fullHeight ? {
                    sm: 'calc(100dvh - 100px - 10dvh - 85px)',
                    xs: 'calc(100dvh - 10dvh - 100px - 120px)',
                } : 'none',
                maxHeight: fullHeight ? {
                    sm: 'calc(100dvh - 100px - 10dvh - 85px)',
                    xs: 'calc(100dvh - 10dvh - 100px - 120px)',
                } : 'none',
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
            }: {
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
            }}>
                {data.length === 0 ? (
                    <h2 key='empty-list' style={{color: '#9e9e9e'}}>Ничего не найдено</h2>
                ) : (
                    data
                        .filter((_, index) => index >= rowsPerPage * page && index < rowsPerPage * (page + 1))
                        .map((object) => (
                            <div key={`admin-${object.id}`}>
                                <DataCard 
                                    key={`admin-card-${object.id}`}
                                    {...{...dataCardProps, object: object, columns: columns}}
                                />
                            </div>
                        ))
                )}
            </Box>
            {pagination && <TablePagination
                key='table-pagination'
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage='На странице'
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{alignItems: 'start'}}
            />}
        </Paper>
    </div>
    </>
}