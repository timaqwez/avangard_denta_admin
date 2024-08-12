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

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [e.target.name]: e.target.checked });
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setItem({ ...item, [e.target.name]: e.target.value });
    }
    else {
      setItem({ ...item, [e.target.name]: e.target.textContent });
    }
    setErrors({ ...errors, [e.target.name]: '' });
  }

  const handleSave = async (dataName: string) => {
    console.log(item)
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
        }
        setLoading(`none`)
      }
      else {
        setLoading(`none`)
        setIsEditing('none')
      }
    } catch (error) {
      
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
          <>
          <Box>
          <EditField
            props={{
              item: item,
              field: field,
              handleTextFieldChange: handleTextFieldChange,
              handleCheckboxChange: handleCheckboxChange,
              handleDropdownChange: handleDropdownChange,
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
          </Box>
          {!field.noDisplay && operations.update?.fields && index < operations.update?.fields.length - 1 && <Divider variant='fullWidth' sx={{margin: '15px 0'}}></Divider>}
          </>
        ))}

        {operations.submodel && submodelColumns && operations.submodel.create &&
        <Box sx={{marginBottom: '20px'}}>
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
