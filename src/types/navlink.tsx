import { type IconProps } from '@tabler/icons-react';

export type Navlink = {
  href: string;
  label: string;
  icon?: React.ReactNode | IconProps | any;
  iconfill?: React.ReactNode | IconProps | any;
};
