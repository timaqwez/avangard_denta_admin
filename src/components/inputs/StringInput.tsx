import { InputAdornment, TextField } from "@mui/material";
import { getInputEntityProps } from "./Inputs";
import { ColumnType } from "../../config/columns/base";

function StringInput(props: getInputEntityProps) {
    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      props.setItem({ ...props.item, [e.target.name]: e.target.value });
      props.setErrors({ ...props.errors, [e.target.name]: '' });
    };

    return <TextField
        key={props.field.dataName}
        name={props.field.dataName}
        label={props.field.label}
        value={props.item[props.field.dataName]}
        onChange={handleTextFieldChange}
        fullWidth
        required={props.field.required}
        error={Boolean(props.error)}
        type={props.field.type == ColumnType.NUMBER ? 'number' : 'text'}
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

export default StringInput
