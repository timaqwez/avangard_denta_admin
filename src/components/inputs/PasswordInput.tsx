import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { getInputEntityProps } from "./Inputs";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function PasswordInput(props: getInputEntityProps) {
    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      props.setItem({ ...props.item, [e.target.name]: e.target.value });
      props.setErrors({ ...props.errors, [e.target.name]: '' });
    };

    const handleClickShowPassword = () => ((props.setShowPassword(!props.showPassword)));
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    };
      return <FormControl sx={{ width: '100%' }} variant="outlined" key={`form-control-${props.field.dataName}`}>
      <InputLabel key={`input-label-${props.field.dataName}`} htmlFor="outlined" error={Boolean(props.error)}>{props.field.label} {props.field.required ? '*' : ''}</InputLabel>
      <OutlinedInput
        id="outlined"
        autoComplete="disabled"
        key={props.field.dataName}
        name={props.field.dataName}
        value={props.item[props.field.dataName] || null}
        onChange={handleTextFieldChange}
        fullWidth
        required={props.field.required}
        type={props.showPassword ? 'text' : 'password'}
        error={Boolean(props.error)}
        margin='none'
        endAdornment={
          <InputAdornment position="end" key={`input-adornment-${props.field.dataName}`}>
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              key={`icon-button-${props.field.dataName}`}
              edge="end"
              sx={{
                color: 'primary.main'
              }}
            >
              {props.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={props.field.label}
      />
      <FormHelperText error >{props.error}</FormHelperText>
    </FormControl>
}

export default PasswordInput
