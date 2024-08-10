import { BaseIcon, IconProps } from "./BaseIcon";


export const MoreIcon: React.FC<IconProps> = ( {height, width} ) => {
    return(
        <BaseIcon height={height} width={width}>
            <svg width="128" height="32" viewBox="0 0 128 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.72 16.0453C30.72 24.5284 23.8431 31.4053 15.36 31.4053C6.87687 31.4053 0 24.5284 0 16.0453C0 7.56218 6.87687 0.685303 15.36 0.685303C23.8431 0.685303 30.72 7.56218 30.72 16.0453ZM79.36 16.0453C79.36 24.5284 72.4831 31.4053 64 31.4053C55.5169 31.4053 48.64 24.5284 48.64 16.0453C48.64 7.56218 55.5169 0.685303 64 0.685303C72.4831 0.685303 79.36 7.56218 79.36 16.0453ZM128 16.0453C128 24.5284 121.123 31.4053 112.64 31.4053C104.157 31.4053 97.28 24.5284 97.28 16.0453C97.28 7.56218 104.157 0.685303 112.64 0.685303C121.123 0.685303 128 7.56218 128 16.0453Z"/>
            </svg>
        </BaseIcon>
    );
};