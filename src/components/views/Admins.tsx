import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../Loading.tsx';
import { CardTable } from '../tables/CardTable.tsx';
import { AdminIcon } from '../icons/AdminIcon.tsx';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Title } from '../Title.tsx';
import  {adminsOperations}  from '../../config/operations/admins.tsx';
import  {adminsColumns}  from '../../config/columns/admins.ts';
import { Search } from '../Search.tsx';
import { checkPermissions } from '../functions/checkPermissions.ts';


const ApiUrl: string = import.meta.env.VITE_API_URL


export const Admins: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [displayData, setDisplayData] = useState<any[]>([]);
  const [roles, setRoles] = useState<any>()
  const [loading, setLoading] = useState('none');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const operations = adminsOperations
  const columns = adminsColumns

  useEffect(() => {
    const fetchData = async () => {
        setLoading('global')
        const token = Cookies.get('token');
        try {
            if (operations.list) {
            const response = await axios.get(ApiUrl + operations.list.path, { params: { token }});
            if (response.data.state === 'successful') {
                let dataArray = response.data[operations.list.responseKey || 'data'].sort(
                (a: any, b: any) => b.id - a.id
                )
                setData(dataArray);
                setDisplayData(dataArray);
              } else {
                console.error(response.data.message);
            }
          }
        } catch (error) {
            console.error('An error occurred:', error);
        }
        try {
          const response = await axios.get(ApiUrl + '/admin/roles/list/get', { params: { token }});
            if (response.data.state === 'successful') {
                let dataArray = response.data.roles.sort(
                (a: any, b: any) => b.id - a.id
                )
                setRoles(
                  {
                    dataName: 'roles',
                    label: 'Роль',
                    data: dataArray.map((role: any) => ({displayName: role.name, value: role.id})),
                  }
                )
              } else {
                console.error(response.data.message);
            }
        } catch (error) {
          console.error('An error occurred:', error);
        } 
        setLoading('none')
    };
    

    fetchData(); 
  }, [operations.list?.path]);

  const handleEdit = (item: any) => {
    navigate(`/edit/${operations.model}/${item.id}`, { state: {object: item, roles: roles} });
  };

  const handleDelete = async (item: any) => {
    const token = Cookies.get('token');
    try {
        setLoading('delete')
        await axios.post(ApiUrl + operations.delete?.path, { token, ...item });
        setData(data.filter((i) => i.id !== item.id));
        setDisplayData(data.filter((i) => i.id !== item.id))
        setLoading('none') 
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleSearch = async (searchQuery: string) => {
    setLoading('global')
    let searchResult: any[] = []
    data.map( (row) => {
        for(let column of columns.primary) {
          if (String(row[column.dataName]).toLowerCase() == String(searchQuery).toLowerCase()) {
            searchResult.push(row)
            break;
          }
          else if (String(row[column.dataName]).toLowerCase().includes(String(searchQuery).toLowerCase())) {
            searchResult.push(row)
            break;
          }
        }
      }
    );
    setDisplayData(searchResult)
    setLoading('none')
  };
  
  if(!checkPermissions(['accounts', 'roles', 'permissions'])){
    navigate('/no-access')
  }

  if (loading == 'global') return <Loading/>

  return (
    <div key='wrapper'>
      <Title 
          key='title'
          title={operations.label}
          createProps={
            operations.create && 
            {
              operation: operations.create,
              dropdownData: {role_id: roles},
            }
          }
          searchBar={<Search searchQuery={searchQuery} handleSearch={handleSearch} setSearchQuery={setSearchQuery}/>}
        />
      <CardTable
        data={displayData}
        columns={columns.primary}
        dataCardProps={
          {
            handlers: [ 
              {id: 'edit',title: 'Изменить', handler: handleEdit, icon: <EditIcon/>},
              {id: 'delete',title: 'Удалить', handler: handleDelete, icon: <DeleteIcon/>},
            ],
            icon: <AdminIcon height={30} width={30}/>,
            primaryDataKeys: ['username'],
            secondaryDataKeys: ['roles.name'],
            primaryFont: "Quicksand, Manrope",
            object: {},
            loading: loading,
            columns: [],
          }
        }
        pagination
        fullHeight
      />
    </div>
  );
  
};
