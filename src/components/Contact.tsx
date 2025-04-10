"use client";
import React, { useState } from "react";
import { Button } from "./Button";
import { useToast } from "@/hooks/use-toast";

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
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const validateForm = () => {
    let isValid = true;
    const updatedFormData = { ...formData };

    // Validate name
    if (!formData.name.value.trim()) {
      updatedFormData.name.error = "Name is required";
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.value.trim()) {
      updatedFormData.email.error = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email.value)) {
      updatedFormData.email.error = "Please enter a valid email address";
      isValid = false;
    }

    // Validate message
    if (!formData.message.value.trim()) {
      updatedFormData.message.error = "Message is required";
      isValid = false;
    }

    setFormData(updatedFormData);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.value,
          email: formData.email.value,
          message: formData.message.value,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Message sent",
          description: "Thank you! Your message has been sent successfully.",
          variant: "success",
        });
        // Reset form after successful submission
        setFormData(defaultFormState);
        setSubmitting(false);
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred. Please try again later.",
        variant: "destructive",
      });
      setSubmitting(false);
    }
  };

  return (
    <form className="form max-w-xl" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <div className="w-full">
          <input
            type="text"
            placeholder="Your Name"
            className={`bg-white dark:bg-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-neutral-700 px-4 py-2.5 rounded-md text-sm text-neutral-700 dark:text-neutral-200 w-full border ${formData.name.error ? "border-red-500" : "border-neutral-200 dark:border-neutral-800"} placeholder:text-neutral-500 dark:placeholder:text-neutral-500 shadow-sm`}
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
            disabled={submitting}
          />
          {formData.name.error && (
            <p className="text-red-500 text-xs mt-1">{formData.name.error}</p>
          )}
        </div>
        
        <div className="w-full">
          <input
            type="email"
            placeholder="Your email address"
            className={`bg-white dark:bg-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-neutral-700 px-4 py-2.5 rounded-md text-sm text-neutral-700 dark:text-neutral-200 w-full border ${formData.email.error ? "border-red-500" : "border-neutral-200 dark:border-neutral-800"} placeholder:text-neutral-500 dark:placeholder:text-neutral-500 shadow-sm`}
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
            disabled={submitting}
          />
          {formData.email.error && (
            <p className="text-red-500 text-xs mt-1">{formData.email.error}</p>
          )}
        </div>
      </div>
      <div className="mt-4">
        <textarea
          placeholder="Your Message"
          rows={8}
          className={`bg-white dark:bg-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-neutral-700 px-4 py-2.5 rounded-md text-sm text-neutral-700 dark:text-neutral-200 w-full border ${formData.message.error ? "border-red-500" : "border-neutral-200 dark:border-neutral-800"} placeholder:text-neutral-500 dark:placeholder:text-neutral-500 shadow-sm`}
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
          disabled={submitting}
        />
        {formData.message.error && (
          <p className="text-red-500 text-xs mt-1">{formData.message.error}</p>
        )}
      </div>
      <Button
        text={submitting ? "Sending..." : "Submit"}
        type="submit"
        className="mt-6"
        disabled={submitting}
      />
    </form>
  );
};
