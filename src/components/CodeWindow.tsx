"use client";

import React, { useEffect, Children, useState, useRef } from "react";

// import "prism-theme-night-owl";
import clsx from "clsx";

export const CodeWindow = ({ title, children }: any) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    // Prism.highlightAll();
  }, []);

  let child = Children.only(children);

  const [buttonText, setButtonText] = useState("Copy");
  const childRef = useRef<any>(null);

  const handleClick = (e: any) => {
    if (childRef.current) {
      const textToCopy = childRef.current.innerText;

      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setButtonText("Copied!");
          setTimeout(() => {
            setButtonText("Copy");
          }, 1000);
        })
        .catch((err) => {
          console.error("Error copying text to clipboard:", err);
        });
    }
  };

  return (
    isClient && (
      <div
        className={clsx(
          "bg-neutral-100 dark:bg-neutral-900 rounded-md w-auto overflow-hidden flex flex-col my-10 prose prose-sm ",
          "prose prose-neutral max-w-none dark:prose-invert dark:text-neutral-300",
          // headings
          "prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]",
          // lead
          "prose-lead:text-neutral-500 dark:prose-lead:text-neutral-400",
          // links
          "prose-a:font-semibold dark:prose-a:text-neutral-300",
          // link underline
          "prose-a:no-underline dark:prose-a:text-neutral-300",
          // pre
          "prose-pre:rounded-xl prose-pre:bg-neutral-100 prose-pre:shadow-lg dark:prose-pre:bg-neutral-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-neutral-300/10",
          // hr
          "dark:prose-hr:border-neutral-800"
        )}
      >
        <div className="flex justify-between items-center bg-neutral-200 dark:bg-neutral-800 py-2 px-4">
          <p className="text-neutral-900 dark:text-white text-sm font-medium bg-neutral-300/50 dark:bg-neutral-700/50 px-2 !my-0 shadow-sm">
            {title}
          </p>

          <button
            onClick={handleClick}
            className="bg-neutral-950 dark:bg-neutral-800 group cursor-pointer relative rounded-full p-px text-xs font-semibold leading-6 shadow-lg shadow-neutral-300/20 dark:shadow-neutral-900/30 text-white"
          >
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(100,100,100,0.6)_0%,rgba(56,189,248,0)_75%)] dark:bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(150,150,150,0.4)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            </span>
            <div className="relative z-10 rounded-full bg-transparent py-0.5 px-4 ring-1 ring-white/20 dark:ring-white/10">
              {buttonText}
            </div>
          </button>
        </div>

        <div ref={childRef}>{children}</div>
      </div>
    )
  );
};
