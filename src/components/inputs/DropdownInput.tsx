import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { getInputEntityProps } from "./Inputs";

function DropdownInput(props: getInputEntityProps) {
    if (props.dropdownData){
        let thisDropdownData = props.dropdownData[props.field.dataName]
        return <>
        <FormControl sx={{ width: '100%' }}>
            <InputLabel error={Boolean(props.error)}>{thisDropdownData.label}</InputLabel>
            <Select name={props.field.dataName} fullWidth label={thisDropdownData.label} onChange={props.handleDropdownChange} error={Boolean(props.error)} >
                { <MenuItem>Нет</MenuItem> }
                {
                    thisDropdownData?.data.map((dropdownItem: any) => (
                    <   MenuItem value={dropdownItem.value} >{dropdownItem.displayName}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
        {Boolean(props.error) && <FormHelperText style={{color: '#d32f2f', marginLeft: '14px'}}>{props.error}</FormHelperText>}</>
    }
}

export default DropdownInput
