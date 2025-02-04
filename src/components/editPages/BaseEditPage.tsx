import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Operations } from '../../config/operations/base';
import { Title } from '../Title';
import { validateFields } from '../functions/validateFields';
import { Box, Divider } from '@mui/material';
import { EditField } from '../EditField';
import { CardTable } from '../tables/CardTable';
import { Column } from '../../config/columns/base';

const API_URL: string = import.meta.env.VITE_API_URL;

interface EditPageProps {
  item: any,
  setItem: any, 
  operations: Operations,
  dropdownData?: Object,
  submodelColumns?: Column[],
  fieldsValues?: any,
  submodelIcon?: JSX.Element,
}

const EditForm: React.FC<EditPageProps> = ({ item, setItem, operations, dropdownData, submodelColumns, fieldsValues, submodelIcon }) => {
  const [loading, setLoading] = useState('none');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isEditing, setIsEditing] = useState<string>('none');
  const navigate = useNavigate();

  const handleSave = async (dataName: string) => {
    if (operations.update){
      if (!validateFields(operations.update?.fields, item, setErrors)) return false;
    }
    setLoading(`submit_${dataName}`)
    const token = Cookies.get('token');
    const newErrors: { [key: string]: string } = {};
    try {
      const response = await axios.post(`${API_URL}${operations.update?.path}`, { token, ...item });
      if (response.data.state != 'successful') {
        if (response.data.error.code === 1003) {
          let error = operations.update?.errors?.find((error) => error.code === 1003)
          if (error){
            newErrors[error.field] = error.message;
            setErrors(newErrors);
          }
        } else if (response.data.error.code === 1008) {
          let error = operations.update?.errors?.find((error) => (error.code === 1008 && error.field === response.data.error.kwargs.variable))
          if (error){
            newErrors[error.field] = error.message;
            setErrors(newErrors);
          }
        }
        setLoading(`none`)
      }
      else {
        setLoading(`none`)
        setIsEditing('none')
      }
    } catch (error) {
      setLoading(`none`)
      setIsEditing('none')
    }
  };

  const handleSubmodelAdd = () => {};

  const handleSubmodelDelete = async (item: any) => {
    const token = Cookies.get('token');
    try {
        setLoading('delete')
        await axios.post(API_URL + operations.submodel?.delete?.path, { token, ...{...item} });
        navigate(0)
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div style={{ display: 'block', maxWidth: 'calc(100dvw - 20px)'}}>
        {operations.update?.fields.map((field, index) => (
          <Box key={`edit-field=${index}`}>
          <EditField
            props={{
              item: item,
              setItem: setItem,
              errors: errors,
              setErrors: setErrors,
              field: field,
              dropdownData: dropdownData,
              error: errors[field.dataName],
              showPassword: showPassword,
              setShowPassword: setShowPassword,
            }}
            save={handleSave}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            loading={loading}
          />
          {!field.noDisplay && operations.update?.fields && index < operations.update?.fields.length - 1 && <Divider variant='fullWidth' sx={{margin: '15px 0'}}></Divider>}
          </Box>
        ))}

        {operations.submodel && submodelColumns && operations.submodel.create &&
        <Box sx={{marginBottom: '20px'}}>
          <Divider sx={{marginBottom: '25px', marginTop: '15px'}}></Divider>
          <Title 
            title={operations.submodel.label}
            createProps={{
              operation: operations.submodel.create,
              dropdownData: dropdownData,
              parentObject: item,
              fieldsValues: fieldsValues,
            }}
          />
          <CardTable
          data={item[operations.submodel.model]} 
          columns={submodelColumns} 
          dataCardProps={
            {
              object: {},
              icon: submodelIcon,
              primaryDataKeys: ['name'],
              secondaryDataKeys: ['name'],
              handlers: [       
                {id: 'delete',title: 'Удалить', handler: handleSubmodelDelete, icon: submodelIcon},
                {id: 'add', title: 'Добавить', handler: handleSubmodelAdd},
              ],
              loading: loading,
              columns: [],
            }
          }            
          />
        </Box>
        }
    </div>
  );
};

export default EditForm;
