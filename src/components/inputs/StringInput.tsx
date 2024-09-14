import { InputAdornment, TextField } from "@mui/material";
import { getInputEntityProps } from "./Inputs";
import { ColumnType } from "../../config/columns/base";

function StringInput(props: getInputEntityProps) {
  const formatPhoneNumber = (input: string) => {
    const cleaned = input.replace(/\D/g, "");
    const hasSevenPrefix = input.startsWith('+7') || input.startsWith('7');
    const limited = hasSevenPrefix ? cleaned.substring(1, 11) : cleaned.substring(0, 10);
  
    const match = limited.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
    if (match) {
      let formattedNumber = "+7";
      if (match[1]) formattedNumber += ` (${match[1]}`;
      if (match[2]) formattedNumber += `) ${match[2]}`;
      if (match[3]) formattedNumber += `-${match[3]}`;
      if (match[4]) formattedNumber += `-${match[4]}`;
      return formattedNumber;
    }
    return input;
  };
  

    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      props.setItem({ ...props.item, [e.target.name]: e.target.value });
      props.setErrors({ ...props.errors, [e.target.name]: '' });
    };

    const handleTextFieldPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      props.setItem({ ...props.item, [e.target.name]: formatPhoneNumber(e.target.value) });
      props.setErrors({ ...props.errors, [e.target.name]: '' });
    };

    return <TextField
        key={props.field.dataName}
        name={props.field.dataName}
        label={props.field.label}
        value={ props.item[props.field.dataName] ? props.item[props.field.dataName] : props.field.type == ColumnType.PHONE ? "+7" : undefined}
        onChange={ props.field.type == ColumnType.PHONE ? handleTextFieldPhoneChange : handleTextFieldChange }
        fullWidth
        required={props.field.required}
        placeholder={ props.field.type == ColumnType.PHONE ? "+7 (***) ***-**-**" : undefined}
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
