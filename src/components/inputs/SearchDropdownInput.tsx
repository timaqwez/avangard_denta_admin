
import { Autocomplete, TextField } from "@mui/material";
import { getInputEntityProps } from "./Inputs";

function SearchDropdownInput(props: getInputEntityProps) {
    if (props.dropdownData){
        let thisDropdownData = props.dropdownData[props.field.dataName]
        return <Autocomplete
            multiple={props.field.multiple}
            options={thisDropdownData.data.map((option: any) => option)}
            renderInput={
                (params) => <TextField
                    error={Boolean(props.error)}
                    helperText={props.error}
                    {...params} 
                    label={thisDropdownData.label || 'Ошибка'} 
                    onChange={(value) => {
                        props.handleSearchDropdownChange(value, thisDropdownData, props.field.multiple)
                    }}
                />
            }
            disableClearable
            disableCloseOnSelect 
            getOptionLabel={(option: any) => option.displayName}
            onChange={(value) => {
              props.handleSearchDropdownChange(value, thisDropdownData, props.field.multiple)
            }}
        />
    }
}

export default SearchDropdownInput
  