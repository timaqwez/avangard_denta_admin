import { OperationField } from '../../config/operations/base';
import { ColumnType } from '../../config/columns/base';
import PasswordInput from './PasswordInput';
import StringInput from './StringInput';
import BooleanInput from './BooleanInput';
import DropdownInput from './DropdownInput';
import SearchDropdownInput from './SearchDropdownInput';

export interface DropdownData {
  dataName: string,
  label: string,
  data: {
    displayName: string,
    value: any,
  }[],
}

export interface getInputEntityProps {
    item: any, 
    field: OperationField, 
    handleTextFieldChange?: any, 
    handleCheckboxChange?: any,
    handleDropdownChange?: any,
    handleSearchDropdownChange?: any,
    dropdownData?: any,
    error?: string,
    showPassword?: boolean,
    setShowPassword?: any,
}

export function getInputEntity(
    props: getInputEntityProps,
) {
  if(props.field.noDisplay) {
    return
  }
  if (props.field.type == ColumnType.STRING || props.field.type == ColumnType.NUMBER) {
    if (props.field.dataName == 'password') {
      return <PasswordInput {...props} />
    }
    else {
      return <StringInput {...props} />
    }
  } else if (props.field.type == ColumnType.BOOLEAN) {
    return <BooleanInput {...props} />
  } else if (props.field.type == ColumnType.DROPDOWN) {
    return <DropdownInput {...props} />
  } else if (props.field.type == ColumnType.SEARCH_DROPDOWN) {
    return <SearchDropdownInput {...props} />
  }
}
