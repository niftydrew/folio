import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { getAllBlogs } from "../../../lib/getAllBlogs";
import { Blogs } from "@/components/Blogs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Andrew Akyampong",
  description:
    "Thoughts and insights on web development, design, and technology by Andrew Akyampong. Designer & Developer with 6+ years experience.",
  openGraph: {
    title: "Blog | Andrew Akyampong",
    description: "Thoughts and insights on web development, design, and technology by Andrew Akyampong.",
  },
  twitter: {
    title: "Blog | Andrew Akyampong",
    description: "Thoughts and insights on web development, design, and technology by Andrew Akyampong.",
  },
};

export default async function Blog() {
  const blogs = await getAllBlogs();
  const data = blogs.map(({ component, ...meta }) => meta);

  return (
    <Container>
      <Heading className="pb-4">I write about technology</Heading>
      <Paragraph className="pb-10">
        Ever since <Highlight> I was a kid</Highlight>, I&apos;ve been
        fascinated by technology.
      </Paragraph>
      <Blogs blogs={data} />
    </Container>
  );
}
