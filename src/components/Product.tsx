"use client";
import { Product } from "@/types/products";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "./Button";
import { RiGithubFill } from 'react-icons/ri';

export const SingleProduct = ({ product }: { product: Product }) => {
  const [activeImage, setActiveImage] = useState<StaticImageData | string>(
    product.thumbnail
  );
  return (
    <div className="py-10">
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        key={product.slug}
        className="relative"
      >
        <Image
          src={activeImage}
          alt="thumbnail"
          height="1000"
          width="1000"
          className="rounded-t-3xl object-contain"
        />
        <div className="absolute bottom-0 bg-white dark:bg-neutral-900 h-40 w-full [mask-image:linear-gradient(to_bottom,transparent,white)]" />
      </motion.div>
      <div className="flex flex-row justify-center my-8 flex-wrap">
        {product.images.map((image, idx) => (
          <button
            onClick={() => setActiveImage(image)}
            key={`image-thumbnail-${idx}`}
          >
            <Image
              src={image}
              alt="product thumbnail"
              height="1000"
              width="1000"
              className="h-14 w-16 md:h-fit md:w-60 object-contain object-top mr-4 mb-r border rounded-lg border-neutral-100 dark:border-neutral-700"
            />
          </button>
        ))}
      </div>
      <div className="flex lg:flex-row justify-between items-center flex-col mt-20">
        <Heading className="font-semibold mb-2 pb-1"> {product.title}</Heading>
        <div className="flex space-x-2 md:mb-1 mt-2 md:mt-0">
          {product.stack?.map((stack: string) => (
            <span
              key={stack}
              className="text-xs md:text-xs lg:text-xs bg-gray-50 dark:bg-neutral-800 px-2 py-1 rounded-sm text-neutral-600 dark:text-neutral-300"
            >
              {stack}
            </span>
          ))}
        </div>
      </div>
      <div>
        <Paragraph className="max-w-xl mt-4">{product.description}</Paragraph>
      </div>
      <div className="prose prose-sm md:prose-base max-w-none text-neutral-600 dark:text-neutral-300">
        {product?.content}
      </div>

      <div className="flex gap-4 mt-8">
        <Button 
          text="Live Preview"
          href={product.href}
          target="_blank"
        />
        {product.githubLink && (
          <Link
            href={product.githubLink}
            target="_blank"
            className="bg-neutral-800 hover:bg-neutral-700 dark:bg-neutral-700 dark:hover:bg-neutral-600 no-underline group cursor-pointer relative shadow-lg shadow-neutral-300/20 dark:shadow-neutral-900/30 rounded-full p-px text-sm font-medium leading-6 tracking-tight text-white inline-block"
          >
            <span className='absolute inset-0 overflow-hidden rounded-full'>
              <span className='absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(100,100,100,0.6)_0%,rgba(56,189,248,0)_75%)] dark:bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(150,150,150,0.4)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100'></span>
            </span>
            <div className='relative flex items-center z-10 rounded-full bg-transparent py-1.5 px-4 ring-1 ring-white/20 dark:ring-white/10'>
              <RiGithubFill className="mr-2 text-lg" />
              <span>View Code</span>
            </div>
          </Link>
        )}
      </div>

      
    </div>
  );
};
