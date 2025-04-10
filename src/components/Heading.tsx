import React from "react";

import localFont from "next/font/local";
import { twMerge } from "tailwind-merge";

// Font files can be colocated inside of `app`
const Switzer = localFont({
  src: [{ path: "../../fonts/Switzer-Variable.woff2" }],
  display: "swap",
});

export const Heading = ({
  className,
  children,
  as: Tag = "h1",
}: {
  className?: string;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}) => {
  return (
    <Tag
      className={twMerge(
        Switzer.className,
        "text-xl md:text-2xl lg:text-4xl font-semibold text-black dark:text-white",
        className
      )}
    >
      {children}
    </Tag>
  );
};
