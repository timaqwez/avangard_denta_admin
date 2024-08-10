import { BaseIcon, IconProps } from "./BaseIcon";


export const ArrowIcon: React.FC<IconProps> = ( {height, width} ) => {
    return(
        <BaseIcon height={height} width={width}>
            <svg width="128" height="78" viewBox="0 0 128 78" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M73.4853 73.8004C68.2468 79.0389 59.7532 79.0389 54.5147 73.8004L3.92882 23.2137C-1.30959 17.9756 -1.30959 9.48247 3.92873 4.24405C9.16715 -0.994274 17.6603 -0.994274 22.8987 4.24405L64 45.3455L105.101 4.24405C110.34 -0.994274 118.833 -0.994274 124.071 4.24405C129.31 9.48247 129.31 17.9756 124.071 23.2137L73.4853 73.8004Z"/>
            </svg>
        </BaseIcon>
    );
};