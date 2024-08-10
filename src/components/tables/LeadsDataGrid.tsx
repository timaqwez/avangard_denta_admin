import { Box } from "@mui/material";
import { Title } from "../Title";
import { DataGrid, gridClasses, GridColDef, GridRowId, GridRowSelectionModel } from '@mui/x-data-grid';
import { ruRU } from '@mui/x-data-grid/locales';
import { useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { Search } from "../Search";
import { LoadingButton } from "@mui/lab";


const columns: GridColDef[] = [
    {field: 'name', headerName: 'Имя', width: 200 },
    {field: 'phone', headerName: 'Номер телефона', width: 200, sortable: false},
    {field: 'is_processed', headerName: 'Обработан', width: 100, sortable: false, valueFormatter: (value) => {return value ? 'Да' : 'Нет'}}
]

const ApiUrl: string = import.meta.env.VITE_API_URL

interface PartnersDataGridProps {
    tableHeight: any,
    initialRows: any[],
    // setLeads: (partners: any[]) => void,
    promotion_id: number,  
}


export function LeadsDataGrid(props: PartnersDataGridProps) {
    let data = props.initialRows
    const [displayData, setDisplayData] = useState(props.initialRows);
    const [selectedRow, setSelectedRows] = useState<GridRowId[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState('none');

    function handleRowSelect(rows: GridRowSelectionModel) {
        setSelectedRows([...rows]);
    }

    const handleUpdate = async () => {
        const token = Cookies.get('token');
        setLoading('delete');
        for (const row_id of selectedRow) {
            try {
                await axios.post(ApiUrl + '/admin/leads/update', { token, id: row_id, is_processed: true });
            } catch (error) {
                console.error('An error occurred:', error);
            }
            setDisplayData(data)
        }
        window.location.reload();
    };
    const handleSearch = async (searchQuery: string) => {
        let searchResult: any[] = []
        data.map( (row) => {
            for(let column of columns) {
                if (String(row[column.field]).toLowerCase() == String(searchQuery).toLowerCase()) {
                searchResult.push(row)
                break;
                }
                else if (String(row[column.field]).toLowerCase().includes(String(searchQuery).toLowerCase())) {
                searchResult.push(row)
                break;
                }
            }
            }
        );
        setDisplayData(searchResult)
    };

    return (
        <Box>
            <Title 
                title={'Лиды'} 
                searchBar={<Search searchQuery={searchQuery} handleSearch={handleSearch} setSearchQuery={setSearchQuery}/>}
            />
            <Box>
                <DataGrid
                    rows={displayData}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 100 },
                    },
                    }}
                    pageSizeOptions={[10, 25, 100]}
                    checkboxSelection
                    sx={{border: 'none', 
                    [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
                        outline: 'none',
                    },
                    [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                    {
                        outline: 'none',
                    }, height: props.tableHeight, width: 'auto', overflow: 'auto'
                    }}
                    disableColumnMenu
                    disableRowSelectionOnClick
                    hideFooterSelectedRowCount
                    isRowSelectable={(params) => {return params.row.is_processed ? false : true}}
                    onRowSelectionModelChange={handleRowSelect}
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                />
                <LoadingButton 
                    sx={{
                        display: selectedRow.length != 0 ? 'fixed' : 'none',
                        left: 0,
                        bottom: 45,
                        minWidth: '100px', 
                        textTransform: 'none',
                        borderRadius: '15px',
                        height: '40px',
                        fontWeight: '600',
                    }} 
                    disableElevation
                    variant="contained" 
                    loading={loading == 'delete'}
                    onClick={handleUpdate}
                >
                    Обработан(-ы)
                </LoadingButton>
            </Box>
        </Box>
    )
}