import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { getInputEntityProps } from "./Inputs";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function PasswordInput(props: getInputEntityProps) {
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

export default PasswordInput
