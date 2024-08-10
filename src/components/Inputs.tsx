import { TextField, Checkbox, FormControlLabel, Select, MenuItem, Autocomplete, FormHelperText, FormControl, InputAdornment, IconButton, InputLabel, OutlinedInput } from '@mui/material';
import { OperationField } from '../config/operations/base';
import { ColumnType } from '../config/columns/base';
import { MuiColorInput } from 'mui-color-input';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
    handleColorChange?: any,
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
      const handleClickShowPassword = () => ((props.setShowPassword(!props.showPassword)));
      const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      };
      return <FormControl sx={{ width: '100%' }} variant="outlined">
      <InputLabel htmlFor="outlined" error={Boolean(props.error)}>{props.field.label} {props.field.required ? '*' : ''}</InputLabel>
      <OutlinedInput
        id="outlined"
        autoComplete="disabled"
        key={props.field.dataName}
        name={props.field.dataName}
        value={props.item[props.field.dataName] || null}
        onChange={props.handleTextFieldChange}
        fullWidth
        required={props.field.required}
        type={props.showPassword ? 'text' : 'password'}
        error={Boolean(props.error)}
        margin='none'
        endAdornment={
          <>
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              sx={{
                color: 'primary.main'
              }}
            >
              {props.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
          </>
        }
        label={props.field.label}
      />
      <FormHelperText error >{props.error}</FormHelperText>
    </FormControl>
    }
    else {
      return <TextField
        key={props.field.dataName}
        name={props.field.dataName}
        label={props.field.label}
        value={props.item[props.field.dataName]}
        onChange={props.handleTextFieldChange}
        fullWidth
        required={props.field.required}
        error={Boolean(props.error)}
        type={props.field.type == ColumnType.STRING ? 'text' : 'number'}
        helperText={props.error}
        margin='none'
        multiline={props.field.multiline}
        InputProps={{
          startAdornment: props.field.prefix ? <InputAdornment position="start">{props.field.prefix}</InputAdornment> : undefined,
          endAdornment: props.field.postfix ? <InputAdornment position="end">{props.field.postfix}</InputAdornment> : undefined,
          inputProps: props.field.type == ColumnType.NUMBER ? { min: 0 } : undefined
        }}
      />
    }
  } else if (props.field.type == ColumnType.BOOLEAN) {
    return <FormControlLabel 
      control={
        <Checkbox 
          checked={props.item[props.field.dataName] || false}
          key={props.field.dataName}
          name={props.field.dataName}
          onChange={props.handleCheckboxChange}
        />
      } 
      label={props.field.label}
    />
  } else if (props.field.type == ColumnType.COLOR) {
    return <MuiColorInput format="hex" fullWidth value={props.item[props.field.dataName] || ''} name={props.field.dataName} onChange={props.handleColorChange} />
  } else if (props.field.type == ColumnType.DROPDOWN) {

    if (props.dropdownData){
      let thisDropdownData = props.dropdownData[props.field.dataName]
      return <>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel error={Boolean(props.error)}>{thisDropdownData.label}</InputLabel>
        <Select name={props.field.dataName} fullWidth label={thisDropdownData.label} onChange={props.handleDropdownChange} error={Boolean(props.error)} >
        {<MenuItem>Нет</MenuItem>}
        {thisDropdownData?.data.map((dropdownItem: any) => (
          <MenuItem value={dropdownItem.value} >{dropdownItem.displayName}</MenuItem>
        ))}
        </Select>
      </FormControl>
      {Boolean(props.error) && <FormHelperText style={{color: '#d32f2f', marginLeft: '14px'}}>{props.error}</FormHelperText>}</>
    }
  } else if (props.field.type == ColumnType.SEARCH_DROPDOWN) {
    if (props.dropdownData){
      let thisDropdownData = props.dropdownData[props.field.dataName]
      return <Autocomplete
          multiple={props.field.multiple}
          options={thisDropdownData.data.map((option: any) => option)}
          renderInput={(params) => <TextField
            error={Boolean(props.error)}
            helperText={props.error}
            {...params} 
            label={thisDropdownData.label || 'Ошибка'} 
            onChange={(value) => {
              props.handleSearchDropdownChange(value, thisDropdownData, props.field.multiple)
            }}/>
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
}
