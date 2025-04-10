import { ReactNode } from 'react';

export interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
  company?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    content:
      'Andrew delivered an exceptional website that perfectly captured our brand identity. His attention to detail and technical expertise are truly impressive.',
    author: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechNova',
  },
  {
    id: '2',
    content:
      'Working with Andrew was a game changer for our project. He not only understood our requirements but also provided valuable suggestions to enhance the user experience.',
    author: 'Michael Chen',
    role: 'Product Manager',
    company: 'Elemental Labs',
  },
  {
    id: '3',
    content:
      'The web application Andrew built for us has received incredible feedback from our users. His code is clean, well-documented, and extremely maintainable.',
    author: 'Elena Rodriguez',
    role: 'CTO',
    company: 'Quantum Solutions',
  },
  {
    id: '4',
    content:
      'Andrew\'s expertise in modern web technologies helped us transform our outdated platform into a sleek, high-performing application. Highly recommended!',
    author: 'David Kim',
    role: 'Director of Engineering',
    company: 'Nexus Interactive',
  },
  {
    id: '5',
    content:
      'We\'ve worked with many developers, but Andrew stands out for his combination of technical skills and design sensibility. He truly understands the full stack.',
    author: 'Rebecca Taylor',
    role: 'Founder',
    company: 'Creativ Studio',
  },
  {
    id: '6',
    content:
      'Andrew\'s ability to translate our vision into code was remarkable. He delivered on time and provided excellent communication throughout the project.',
    author: 'James Wilson',
    role: 'Marketing Director',
    company: 'Fusion Digital',
  },
];
