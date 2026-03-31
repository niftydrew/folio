import { type IconProps } from '@tabler/icons-react';

export type Socials = {
  href: string;
  label: string;
  icon?: React.ReactNode | IconProps | any;
  height?: number;
  width?: number;
};
