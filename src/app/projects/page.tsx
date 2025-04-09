import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Projects | Andrew Akyampong",
  description:
    "Explore projects by Andrew Akyampong, showcasing web development and design expertise using React, Next.js, TypeScript and more.",
  openGraph: {
    title: "Projects | Andrew Akyampong",
    description: "Explore projects by Andrew Akyampong, showcasing web development and design expertise.",
  },
  twitter: {
    title: "Projects | Andrew Akyampong",
    description: "Explore projects by Andrew Akyampong, showcasing web development and design expertise.",
  },
};

export default function Projects() {
  return (
    <Container>
      <Heading className="mb-10">
      
        What I&apos;ve been working on
      </Heading>

      <Products />
    </Container>
  );
}
