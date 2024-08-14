import { Checkbox, FormControlLabel } from "@mui/material";
import { getInputEntityProps } from "./Inputs";

function BooleanInput(props: getInputEntityProps) {
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      props.setItem({ ...props.item, [e.target.name]: e.target.checked });
    };

    return <FormControlLabel 
    control={
      <Checkbox 
        checked={props.item[props.field.dataName] || false}
        key={props.field.dataName}
        name={props.field.dataName}
        onChange={handleCheckboxChange}
      />
    } 
    label={props.field.label}
  />
}

export default BooleanInput
