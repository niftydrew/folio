import {
  RiHome2Line,
  RiHome2Fill,
  RiMessage2Line,
  RiMessage2Fill,
  RiCompassLine,
  RiCompassFill,
  RiFileList2Line,
  RiFileList2Fill,
  RiMailLine,
  RiMailFill,
} from 'react-icons/ri';

export const navlinks = [
  {
    href: '/',
    label: 'Home',
    icon: RiHome2Line,
    iconfill: RiHome2Fill,
  },
  {
    href: '/about',
    label: 'About',
    icon: RiMessage2Line,
    iconfill: RiMessage2Fill,
  },
  {
    href: '/projects',
    label: 'Projects',
    icon: RiCompassLine,
    iconfill: RiCompassFill,
  },
  {
    href: '/blog',
    label: 'Articles',
    icon: RiFileList2Line,
    iconfill: RiFileList2Fill,
  },
  {
    href: '/contact',
    label: 'Contact',
    icon: RiMailLine,
    iconfill: RiMailFill,
  },
];
