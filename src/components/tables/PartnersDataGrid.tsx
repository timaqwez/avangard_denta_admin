import { Box } from "@mui/material";
import { Title } from "../Title";
import { DataGrid, gridClasses, GridColDef, GridRowId, GridRowSelectionModel } from '@mui/x-data-grid';
import { ruRU } from '@mui/x-data-grid/locales';
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { Search } from "../Search";
import { partnersOperations } from "../../config/operations/partners";
import { Operations } from "../../config/operations/base";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { DeleteDialog } from "../DeleteDialog";


const columns: GridColDef[] = [
    {field: 'fullname', headerName: 'ФИО', width: 200},
    {field: 'code', headerName: 'Код', width: 100, sortable: false},
    {field: 'phone', headerName: 'Номер телефона', width: 200, sortable: false},
    {field: 'referrals', headerName: 'Привлечено', width: 150},
    {field: 'clicks', headerName: 'Переходов', width: 150},
    {field: 'leads', headerName: 'Лидов', width: 150},
    {field: 'email', headerName: 'Эл.почта', width: 200, sortable: false},   
]

const ApiUrl: string = import.meta.env.VITE_API_URL
const operations: Operations = partnersOperations

interface PartnersDataGridProps {
    tableHeight: any,
    initialRows: any[],
    setPartners: (partners: any[]) => void,
    promotion_id: number,
}


export function PartnersDataGrid(props: PartnersDataGridProps) {
    const [data, setData] = useState(props.initialRows);
    const [availablePartners, setAvailablePartners] = useState<{id: number, user_id: number, fullname: string, email: string, phone: string, is_partner: boolean}[]>([]);
    const [displayData, setDisplayData] = useState(props.initialRows);
    const [selectedRow, setSelectedRows] = useState<GridRowId[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [loading, setLoading] = useState('none');
    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchAvailablePartners() {
            const token = Cookies.get('token');
            try {
                const response = await axios.get(ApiUrl + '/admin/clients/partners/list/get', {params: {token: token} })
                let partners = response.data.partners
                setAvailablePartners(partners)
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }

        fetchAvailablePartners()
    }, [])

    function handleRowSelect(rows: GridRowSelectionModel) {
        setSelectedRows([...rows]);
    }
    
    function getAvailablePartners() {
        let partners = availablePartners
        data.map(
            (row) => {
                partners = partners.filter((partner: any) => partner.fullname != row.fullname)
            }
        )
        return partners
    }

    async function handleSave(item: any, token: string, setErrors: any) {
        try {
            const newErrors: { [key: string]: string } = {};
            const selectedPartners = item.client_id;
            item.client_id = null;
            
            for (const partner of selectedPartners) {
                try {
                    const response = await axios.post(`${ApiUrl}${operations.create?.path}`, { token, ...{ ...item, client_id: partner.value } });
                    if (response.data.state !== 'successful') {
                        if (response.data.error.code === 1003) {
                            let error = operations.create?.errors?.find((error) => error.code === 1003);
                            if (error) {
                                newErrors[error.field] = error.message;
                            }
                        }
                    }
                } catch (innerError) {
                    console.error('An error occurred during request:', innerError);
                }
            }
    
            setErrors(newErrors);
        } catch (error) {
            alert(error);
        }
        navigate(0)
    }

    const handleOpenDialog = () => {
        setIsOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setIsOpenDialog(false);
    };

    const handleConfirm = () => {
        handleCloseDialog()
        handleDelete()
    }

    const handleDelete = async () => {
        const token = Cookies.get('token');
        setLoading('delete');
        let partners = props.initialRows
        for (const row_id of selectedRow) {
            try {
                console.log('delete', row_id)
                await axios.post(ApiUrl + operations.delete?.path, { token, id: row_id });
                setData((prevData) => prevData.filter((i) => i.id !== row_id));
                partners = partners.filter((i) => i.id !== row_id)
                setDisplayData((prevDisplayData) => prevDisplayData.filter((i) => i.id !== row_id));
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }
        props.setPartners(partners)
    setLoading('none');
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
            {operations.create && <Title 
                title={'Партнеры'} 
                searchBar={<Search searchQuery={searchQuery} handleSearch={handleSearch} setSearchQuery={setSearchQuery}/>}
                createProps={{
                    operation: operations.create,
                    fieldsValues: {promotion_id: props.promotion_id},
                    dropdownData: {client_id:{
                        dataName: 'client_id',
                        label: 'Партнер',
                        data: getAvailablePartners().map((partner) => (
                            {
                                displayName: `${partner.fullname} (${partner.phone})`,
                                value: partner.id,
                            }
                        ))
                    }},
                    customHandleSave: handleSave,
                }}
            />}
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
                    onClick={handleOpenDialog}
                >
                    Удалить
                </LoadingButton>
            </Box>
            <DeleteDialog 
                isOpenDialog={isOpenDialog} 
                handleCloseDialog={handleCloseDialog} 
                handleConfirm={handleConfirm}            
            />
        </Box>
    )
}