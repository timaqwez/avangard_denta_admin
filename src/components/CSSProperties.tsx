import { CSSProperties as BaseCSSProperties} from 'react';

export interface CSSProperties extends BaseCSSProperties {
  '--title-height': string;
  '--header-height': string;
}