import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { OperationField, Operation } from '../config/operations/base';
import { Loading } from './Loading';
import { getInputEntity } from './inputs/Inputs';
import { LoadingButton } from '@mui/lab';
import { validateFields } from './functions/validateFields';

const API_URL: string = import.meta.env.VITE_API_URL;

export interface CreateFormProps {
    operation: Operation,
    dropdownData?: any,
    fieldsValues?: any,
    parentObject?: any,
    customHandleSave?: any,
}

export const CreateForm: React.FC<CreateFormProps> = ({ operation, dropdownData, fieldsValues, parentObject, customHandleSave }) => {
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

  const handleSearchDropdownChange = (e: React.ChangeEvent<HTMLInputElement>, dropdownData: any, multiple: boolean | undefined) => {
    if (!multiple) {
      let value = e.target.value ? e.target.value : e.target.textContent
      const dataObject = dropdownData.data.filter((object: {displayName: string, value: any}) => object.displayName == value)
      if (dataObject.length != 0) {
        setItem({ ...item, [dropdownData.dataName]: dataObject[0].value });
      } else {
        setItem({ ...item, [dropdownData.dataName]: null });
      }
    } else {
      let value = e.target.value ? e.target.value : e.target.textContent
      let itemSlot = item[dropdownData.dataName]
      if (value) {
        if (itemSlot) {
          let includedObject = itemSlot.filter((object: {displayName: string, value: any}) => object.displayName == value)
          if (includedObject.length == 0) {
            const dataObject = dropdownData.data.filter((object: {displayName: string, value: any}) => object.displayName == value)
            itemSlot.push(dataObject[0])
            setItem({ ...item, [dropdownData.dataName]: itemSlot });
          } else {
            itemSlot = itemSlot.filter((object: {displayName: string, value: any}) => object.displayName != value)
            setItem({ ...item, [dropdownData.dataName]: itemSlot });
          }
        } else {
          const dataObject = dropdownData.data.filter((object: {displayName: string, value: any}) => object.displayName == value)
          itemSlot = [].concat(dataObject)
          setItem({ ...item, [dropdownData.dataName]: itemSlot });
        }
      } else {
        const dataObject = dropdownData.data.filter((object: {displayName: string, value: any}) => object.displayName == e.currentTarget.parentElement?.innerText)
        itemSlot.splice(itemSlot.indexOf(dataObject), 1)
        setItem({ ...item, [dropdownData.dataName]: itemSlot });
      }
    }
    setErrors({ ...errors, [dropdownData.dataName]: '' });
  }

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
          operation.fields.map((field: OperationField) => (
            <div style={{marginBottom: '15px', marginTop: '5px'}}>
              {
                getInputEntity(
                  {...{
                    item: item, 
                    field: field, 
                    handleTextFieldChange: handleTextFieldChange, 
                    handleCheckboxChange: handleCheckboxChange, 
                    handleDropdownChange: handleDropdownChange,
                    handleSearchDropdownChange: handleSearchDropdownChange,
                    dropdownData: dropdownData,
                    error: errors[field.dataName], 
                    showPassword: showPassword,
                    setShowPassword: setShowPassword,
                  }}
                )
              }
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