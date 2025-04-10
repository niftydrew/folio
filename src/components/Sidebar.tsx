"use client";
import { navlinks } from "@/constants/navlinks";
import { Navlink } from "@/types/navlink";
import { Socials } from "@/types/socials";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Heading } from "./Heading";
import { socials } from "@/constants/socials";
import { Button } from "./Button";
import { AnimatePresence, motion } from "framer-motion";
import { IconLayoutSidebarRightCollapse } from "@tabler/icons-react";
import { isMobile } from "@/lib/utils";

export const Sidebar = () => {
  const [open, setOpen] = useState(isMobile() ? false : true);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.2, ease: 'linear' }}
            exit={{ x: -200 }}
            className='px-6 z-[100] py-10 bg-neutral-100 dark:bg-neutral-900 max-w-[14rem] lg:w-fit fixed lg:relative h-screen left-0 flex flex-col justify-between'
          >
            <div className='flex-1 overflow-auto'>
              <SidebarHeader />
              <Navigation setOpen={setOpen} />
            </div>
            <div onClick={() => isMobile() && setOpen(false)}>
              <Button
                href='https://calendly.com/0x-drew/general-meeting'
                text='Schedule a Call'
                target='_blank'
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className='fixed lg:hidden bottom-4 right-4 h-8 w-8 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-full backdrop-blur-sm flex items-center justify-center z-50'
        onClick={() => setOpen(!open)}
      >
        <IconLayoutSidebarRightCollapse className='h-4 w-4 text-secondary' />
      </button>
    </>
  );
};

export const Navigation = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex flex-col space-y-1 my-10 relative z-[100]">
      {navlinks.map((link: Navlink) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => isMobile() && setOpen(false)}
          className={twMerge(
            "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm",
            isActive(link.href) && "bg-white dark:bg-neutral-800 shadow-md text-neutral-900 dark:text-white font-medium"
          )}
        >
          <link.icon
            className={twMerge(
              "h-4 w-4 flex-shrink-0 text-neutral-500 dark:text-neutral-400",
              isActive(link.href) && "hidden"
            )}
          />
          <link.iconfill
            className={twMerge(
              "h-4 w-4 flex-shrink-0 hidden",
              isActive(link.href) && "block text-neutral-900 dark:text-white"
            )}
          />
          <span>{link.label}</span>
        </Link>
      ))}

      <Heading as="p" className="text-sm md:text-sm lg:text-sm pt-10 px-2">
        Socials
      </Heading>
      {socials.map((social: Socials) => (
        <Link
          key={social.href}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={twMerge(
            "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm"
          )}
        >
          <social.icon
            className={twMerge(
              `h-${social.height} w-${social.width} flex-shrink-0`,
              isActive(social.href) && "text-primary"
            )}
          />
          <span>{social.label}</span>
        </Link>
      ))}
    </div>
  );
};

const SidebarHeader = () => {
  return (
    <div className="flex space-x-2">
      <Image
        src="/profile/pfp.png"
        alt="Avatar"
        height="40"
        width="40"
        className="object-cover object-top rounded-full flex-shrink-0"
      />
      <div className="flex text-sm flex-col">
        <p className="font-semibold text-neutral-900 dark:text-white text-base">0xDrew</p>
        <p className="text-neutral-600 dark:text-neutral-400 text-xs">Developer</p>
      </div>
    </div>
  );
};
