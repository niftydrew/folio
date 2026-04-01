import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { getAllBlogs } from "../../../lib/getAllBlogs";
import { Blogs } from "@/components/Blogs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Akyampong",
  description:
    "Thoughts and insights on web development, design, and technology by Andrew Akyampong. Designer & Developer with 6+ years experience.",
  openGraph: {
    title: "Blog | Akyampong",
    description: "Thoughts and insights on web development, design, and technology by Andrew Akyampong.",
  },
  twitter: {
    title: "Blog | Akyampong",
    description: "Thoughts and insights on web development, design, and technology by Andrew Akyampong.",
  },
};

export default async function Blog() {
  const blogs = await getAllBlogs();

  return (
    <Container>
      <Heading className="mb-4">I write about technology</Heading>
      <Paragraph className="mb-10">
        Articles about web development, design, and technology. I share my
        knowledge and insights on various topics, from front-end development to user experience, crypto, and AI.
      </Paragraph>
      <Blogs blogs={blogs as any} />
    </Container>
  );
}
