import { StaticImageData } from "next/image";
import React from 'react';

export type Product = {
  title: string;
  description: string;
  thumbnail: StaticImageData;
  images: StaticImageData[] | string[];
  href: string;
  githubLink?: string;
  slug?: string;
  stack?: string[];
  content?: React.ReactNode | string;
};
