import { Checkbox, FormControlLabel } from "@mui/material";
import { getInputEntityProps } from "./Inputs";

function BooleanInput(props: getInputEntityProps) {
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
}

export default BooleanInput
