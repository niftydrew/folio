import React from "react";

import localFont from "next/font/local";
import { twMerge } from "tailwind-merge";

// Font files can be colocated inside of `app`
const switzer = localFont({
  src: [{ path: "../../fonts/Switzer-Variable.woff2" }],
  display: "swap",
});

export const Paragraph = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={twMerge(
        switzer.className,
        "text-base leading-[160%] font-normal text-neutral-600 dark:text-neutral-300",
        className
      )}
    >
      {children}
    </p>
  );
};
