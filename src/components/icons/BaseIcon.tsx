import { SvgIcon } from "@mui/material";

export interface IconProps {
    height?: number,
    width?: number,
    children?: JSX.Element,
}

export const BaseIcon: React.FC<IconProps> = ( {height, width, children} ) => {
    return(
        <SvgIcon sx={{width: width, height: height}} children={children}/>
    );
};
