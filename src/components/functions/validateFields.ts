import { ColumnType } from '../../config/columns/base';
import { OperationField } from '../../config/operations/base';

export const validateFields = (fields: OperationField[], item: any, setErrors: any) => {
    console.log(fields)
    const newErrors: { [key: string]: string } = {};
    fields.forEach((field: OperationField) => {
      const value = item[field.dataName];
      if (field.required && (value === undefined || value == '' || value === null)) {
        if (field.type == ColumnType.SEARCH_DROPDOWN) {
          newErrors[field.dataName] = 'Необходимо выбрать вариант из списка';
        } else if (field.type == ColumnType.NUMBER && value == 0) {}
        else {
          newErrors[field.dataName] = 'Обязательное поле';
        }
      } 
      if (field.type == ColumnType.NUMBER && value < 0) {
        newErrors[field.dataName] = 'Число не может быть отрицательным';
      }
      if (field.length && value) {
        const { min, max } = field.length;
        if (value.length < min || value.length > max) {
          newErrors[field.dataName] = `Длина: от ${min} до ${max}`;
        }
      }
      if (field.type == ColumnType.PHONE && value) {
        const regExp = new RegExp("^\\+?\\d{10,15}$");
        console.log(regExp);
        let phone = value.match(regExp);
        console.log(phone);
        if (!phone) {
            newErrors[field.dataName] = 'Неверный формат номера телефона';
        }        
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  