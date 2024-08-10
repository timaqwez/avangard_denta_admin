import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Loading } from '../Loading';
import EditForm from '../editPages/BaseEditPage';
import { AdminIcon } from '../icons/AdminIcon';
import { adminsOperations } from '../../config/operations/admins';
import { adminsColumns } from '../../config/columns/admins';
import { DataCard } from '../DataCard';
import { Title } from '../Title';
import { Box, Divider } from '@mui/material';
import { checkPermissions } from '../functions/checkPermissions';
import { getRoles } from '../functions/getRoles';

const ApiUrl: string = import.meta.env.VITE_API_URL;


export const AdminEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<any>(null);
  const [roles, setRoles] = useState<any>([]);
  const [loading, setLoading] = useState('global');
  const location = useLocation();
  const navigate = useNavigate();
  const operations = adminsOperations;
  const columns = adminsColumns;

  useEffect(() => {
    async function fetchItem() {
      const token = Cookies.get('token');
      let state = location.state
      if (!state) {
        try {
          const response = await axios.get(`${ApiUrl}${operations.get?.path}`, { params: { token: token, id: id } });
          if (response.data.state === 'successful') {
            setItem(response.data[operations.get?.responseKey || 'data']);
          } else {
            navigate('/admins')
          }
          
        } catch (error) {
          console.error('An error occurred:', error);
        }
      }
      else {
        setItem(state.object);
        window.history.replaceState({}, '')
      }
      try {
        const response = await axios.get(ApiUrl + '/admin/roles/list/get', { params: { token }});
          if (response.data.state === 'successful') {
              let dataArray = response.data.roles.sort(
              (a: any, b: any) => b.id - a.id
              )
              setRoles(
                {
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
      setLoading('none');
    };

    fetchItem();
  }, []);

  if(!checkPermissions(['accounts', 'roles', 'permissions'])){
    navigate('/no-access')
  }

  function getAvailableRoles() {
    let allRoles = roles.data
    getRoles(item.roles).map(
        (accountRole) => {
          allRoles = allRoles.filter((role: any) => role.value != accountRole)
        }
    )
    return {
      label: roles.label,
      data: allRoles,
    }
  }

  if (loading == 'global') return <Loading/>;

  return (
    <>
    <Box sx={{marginBottom: {xs: '10px', sm: '20px'}}}>
      <Title 
            key='title'
            title='Редактирование'
            backPath={`/${operations.model}s`}
          />
    </Box>
    <DataCard 
        icon={ <AdminIcon height={30} width={30}/> }
        primaryDataKeys={ ['username'] }
        secondaryDataKeys={ ['roles.name'] }
        primaryFont={ "Quicksand, Manrope" }
        object={ item }
        loading={ loading }
        columns={ adminsColumns.primary }
    />
    <Divider variant='fullWidth' sx={{marginTop: '20px'}}></Divider>
    <Box sx={{
      height: {
        md: 'calc(100dvh - 56px - 10dvh - 200px)',
        sm: 'calc(100dvh - 56px - 10dvh - 138px)',
        xs: 'calc(100dvh - 56px - 10dvh - 170px - 50px)',
      }, 
      overflow: 'auto',
      paddingTop: '15px',
      paddingBottom: '20px'
    }}>
      <EditForm
          operations={operations}
          item={item}
          submodelColumns={columns.submodel}
          dropdownData={{role_id:getAvailableRoles()}}
          fieldsValues={{
            account_id: `id`,
          }}
          setItem={setItem}
          submodelIcon={<AdminIcon width={30} height={30}/>}
      />
    </Box>
    </>
  ); 
};
