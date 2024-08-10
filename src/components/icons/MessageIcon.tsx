import { BaseIcon, IconProps } from "./BaseIcon";


export const MessageIcon: React.FC<IconProps> = ( {height, width} ) => {
    return(
        <BaseIcon height={height} width={width}>
            <svg width="128" height="129" viewBox="0 0 128 129" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M115.2 0.0446777H12.8C5.76 0.0446777 0.0639999 5.80468 0.0639999 12.8447L0 128.045L25.6 102.445H115.2C122.24 102.445 128 96.6847 128 89.6447V12.8447C128 5.80468 122.24 0.0446777 115.2 0.0446777ZM44.8 57.6447H32V44.8447H44.8V57.6447ZM70.4 57.6447H57.6V44.8447H70.4V57.6447ZM96 57.6447H83.2V44.8447H96V57.6447Z"/>
            </svg>
        </BaseIcon>
    );
};