import { InputAdornment, TextField } from "@mui/material";
import { getInputEntityProps } from "./Inputs";
import { ColumnType } from "../../config/columns/base";

function StringInput(props: getInputEntityProps) {
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

export default StringInput
