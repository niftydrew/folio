import { TablerIconsProps } from "@tabler/icons-react";

export type Navlink = {
  href: string;
  label: string;
  icon?: React.ReactNode | TablerIconsProps | any;
  iconfill?: React.ReactNode | TablerIconsProps | any;
};
