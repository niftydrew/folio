"use client";
import { timeline } from "@/constants/timeline";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import Link from "next/link";
import React from "react";
import {
  IconCircleCheck,
} from "@tabler/icons-react";

export const WorkHistory = () => {
  return (
    <div>
      {timeline.map((item, index) => (
        <div
          className="flex md:flex-row flex-col space-y-10 md:space-y-0 space-x-10 my-20 relative"
          key={`timeline-${index}`}
        >
          <Paragraph className="w-40">{item.date}</Paragraph>
          <div>
            <Heading
              as="h5"
              className="text-lg md:text-lg lg:text-lg text-neutral-900 dark:text-white"
            >
              {item.companyUrl ? (
                <Link 
                  href={item.companyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative after:absolute after:bg-primary after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 hover:text-primary transition-colors"
                >
                  {item.company}
                </Link>
              ) : (
                item.company
              )}
            </Heading>
            <Paragraph className="text-base md:text-base lg:text-base font-semibold">
              {item.title}
            </Paragraph>
            <Paragraph className="text-sm md:text-sm lg:text-sm mb-4">
              {item.description}
            </Paragraph>

            {item.responsibilities.map((responsibility, index) => (
              <Step key={responsibility}>{responsibility}</Step>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const Step = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex space-x-1 items-start my-2">
      <IconCircleCheck className="h-3 w-4 mt-1 text-neutral-300" />
      <Paragraph className="text-sm md:text-sm lg:text-sm">
        {children}
      </Paragraph>
    </div>
  );
};
