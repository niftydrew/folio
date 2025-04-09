"use client";
import React, { useState } from "react";
import { Button } from "./Button";

const defaultFormState = {
  name: {
    value: "",
    error: "",
  },
  email: {
    value: "",
    error: "",
  },
  message: {
    value: "",
    error: "",
  },
};
export const Contact = () => {
  const [formData, setFormData] = useState(defaultFormState);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Write your submit logic here
    console.log(formData);
  };
  return (
    <form className="form max-w-xl" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <input
          type="text"
          placeholder="Your Name"
          className="bg-white dark:bg-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-neutral-700 px-4 py-2.5 rounded-md text-sm text-neutral-700 dark:text-neutral-200 w-full border border-neutral-200 dark:border-neutral-800 placeholder:text-neutral-500 dark:placeholder:text-neutral-500 shadow-sm"
          value={formData.name.value}
          onChange={(e) => {
            setFormData({
              ...formData,
              name: {
                value: e.target.value,
                error: "",
              },
            });
          }}
        />
        <input
          type="email"
          placeholder="Your email address"
          className="bg-white dark:bg-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-neutral-700 px-4 py-2.5 rounded-md text-sm text-neutral-700 dark:text-neutral-200 w-full border border-neutral-200 dark:border-neutral-800 placeholder:text-neutral-500 dark:placeholder:text-neutral-500 shadow-sm"
          value={formData.email.value}
          onChange={(e) => {
            setFormData({
              ...formData,
              email: {
                value: e.target.value,
                error: "",
              },
            });
          }}
        />
      </div>
      <div>
        <textarea
          placeholder="Your Message"
          rows={8}
          className="bg-white dark:bg-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-neutral-700 px-4 mt-4 py-2.5 rounded-md text-sm text-neutral-700 dark:text-neutral-200 w-full border border-neutral-200 dark:border-neutral-800 placeholder:text-neutral-500 dark:placeholder:text-neutral-500 shadow-sm"
          value={formData.message.value}
          onChange={(e) => {
            setFormData({
              ...formData,
              message: {
                value: e.target.value,
                error: "",
              },
            });
          }}
        />
      </div>
      <Button
        text="Submit"
        type="submit"
        className="mt-6"
      />
    </form>
  );
};
