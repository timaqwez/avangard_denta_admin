import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { OperationField, Operation } from '../config/operations/base';
import { Loading } from './Loading';
import { getInputEntity } from './inputs/Inputs';
import { LoadingButton } from '@mui/lab';
import { validateFields } from './functions/validateFields';
import { InformationButton } from './buttons/InformationButton';

const API_URL: string = import.meta.env.VITE_API_URL;

export interface CreateFormProps {
    operation: Operation,
    dropdownData?: any,
    fieldsValues?: any,
    parentObject?: any,
    customHandleSave?: any,
}

export const  CreateForm: React.FC<CreateFormProps> = ({ operation, dropdownData, fieldsValues, parentObject, customHandleSave }) => {
  const [item, setItem] = useState<any>({});
  const [loading, setLoading] = useState('none');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchValues = () => {
      {fieldsValues && Object.entries(fieldsValues).map(
        (value) => {
          if (parentObject) {
            item[`${value[0]}`] = parentObject[`${value[1]}`]
          }
          else {
            item[`${value[0]}`] = value[1]
          }
          
        }
      )}
    };

    fetchValues(); 
  }, []);


  const handleSave = async () => {
    if (!validateFields(operation.fields, item, setErrors)) {
      return
    }
    setLoading('submit');
    const token = Cookies.get('token');
    let newErrors: { [key: string]: string } = {};
    if (customHandleSave) {
      await customHandleSave(item, token, setErrors)
    } else {
      try {
        const response = await axios.post(`${API_URL}${operation.path}`, { token, ...item });
        if (response.data.state === 'successful') {   
          navigate(0);
        } else {
          if (response.data.error.code === 1003) {
            let error = operation.errors?.find((error) => error.code === 1003)
            if (error){
              newErrors[error.field] = error.message;
            }
          } else if (response.data.error.code === 1008) {
            let error = operation.errors?.find((error) => (error.code === 1008 && error.field === response.data.error.kwargs.variable))
            if (error){
              newErrors[error.field] = error.message;
              setErrors(newErrors);
            }
          }
          
        }
        
      } catch (error) {
      }
    }
    setErrors(newErrors);
    setLoading('none')
  };

  if (loading=='global') return <Loading/>;

  return (
    <div style={{ display: 'block', marginTop: '10px' }}>
      <div style={{ flexGrow: 1, overflowX: 'auto' }}>
        {
          operation.fields.map((field: OperationField, index: number) => (
            <div style={{marginBottom: '15px', marginTop: '5px', display: 'flex', flexDirection: 'row'}} key={`form-field-${index}`}>
              {
                getInputEntity(
                  {...{
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
                )
                
              }
              {field.information_text ? <InformationButton info={field.information_text} title={field.label || 'Информация'}/> : undefined}
            </div>
          ))
        }
        <LoadingButton 
        variant="contained" 
        color="primary" 
        disableElevation 
        onClick={handleSave} 
        loading={loading=='submit'}
        sx={{ 
          minWidth: '100px', 
          textTransform: 'none',
          borderRadius: '15px',
          padding: {md: '0 25px', sm: '0'},
          height: '50px',
          fontWeight: '600',
        }}
        >
          Создать
        </LoadingButton>
      </div>
    </div>
  );
};