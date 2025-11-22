export interface Testimonial {
  id: string;
  content: string;
  author: string;
  handle: string;
  company?: string;
  src: string;
  href?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    content:
      'Andrew is an exceptional developer who consistently delivers high-quality code. His problem-solving abilities and attention to detail have been invaluable to our team projects. Working alongside him has been both educational and inspiring.',
    author: 'Agg',
    handle: '@aggcult',
    company: 'Metrix Capital',
    src: 'https://pbs.twimg.com/profile_images/1767824749239894016/TyJNdOKl_400x400.jpg',
    href: 'https://twitter.com/aggcult',
  },
  {
    id: '2',
    content:
      'Andrew has been a key contributor to our success at Web3 Accelerators. His exceptional ability to translate complex requirements into elegant solutions while maintaining focus on user experience has been invaluable to our team.',
    author: 'Kelvin',
    handle: '@KEmmra',
    company: 'Web3 Accelerators',
    src: 'https://pbs.twimg.com/profile_images/1982030745691410432/xdpcq0wr_400x400.jpg',
    href: 'https://twitter.com/KEmmra',
  },
  {
    id: '3',
    content:
      'Andrew has a rare talent for combining technical excellence with beautiful design. His solutions are elegant, intuitive, and built with exceptional attention to detail. Working with him elevates the entire project.',
    author: 'Papa Gray',
    handle: '@iampapagray',
    company: 'Translucid',
    src: 'https://pbs.twimg.com/profile_images/1522664324317253632/FIWG2teC_400x400.jpg',
    href: 'https://twitter.com/iampapagray',
  },
  {
    id: '4',
    content:
      'Andrew implemented a custom EIP-1155 multi-token contract that reduced our gas costs by 47% and built an optimistic UI layer with client-side prediction that made our on-chain game feel responsive despite blockchain latency.',
    author: '✨crisis',
    handle: '@crisisdot',
    company: 'Treasure',
    src: 'https://pbs.twimg.com/profile_images/1629278971123695616/-mx2meJM_400x400.jpg',
    href: 'https://twitter.com/crisisdot',
  },
];
