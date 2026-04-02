export interface TimelineItem {
  company: string;
  companyUrl?: string;
  title: string;
  date: string;
  description: string;
  responsibilities: string[];
}

export const timeline: TimelineItem[] = [
  {
    company: 'Kredentic | Accra, Ghana',
    companyUrl: 'https://kredentic.com',
    title: 'Co-Founder & Founding Engineer ',
    date: '2026 - Present',
    description: 'Co-founded Kredentic to fix a real and growing problem across African markets: scammers creating fake Google Business listings for legitimate brands, posting their own phone numbers, collecting prepayments from customers, and disappearing before anything is delivered.',
    responsibilities: [
      'Built a Python-based automated watchtower that continuously scans Google Maps across active districts using SerpApi, identifying brand impersonation attempts as they appear rather than after damage is done',
      'Designed a multi-signal confidence scoring system that cross-references phone numbers, runs fuzzy name matching with RapidFuzz, and checks Google\'s own verification status to flag fraudulent listings with high accuracy and low false positives',
      'Built automated evidence collection using Playwright (headless Chromium) and Supabase Storage, generating timestamped screenshots of suspect listings that businesses can attach directly to Google takedown requests',
      'Wired real-time WhatsApp alerts via Twilio so business owners are notified within minutes of a suspicious listing appearing, instead of finding out from an angry customer call',
      'Shipped the full marketing site in Next.js 15 and TypeScript, and built the business dashboard for managing verified branches, scan history, and incident tracking',
    ],
  },
  {
    company: 'Web3 Accelerators | Dubai, UAE',
    companyUrl: 'https://web3accelerators.com',
    title: 'Senior Full-Stack Engineer',
    date: '2024 - 2026',
    description: 'Web3Accelerators is a Dubai-based digital marketing agency serving Web3 companies. The agency offers a full stack of services including influencer marketing, community growth, social media, SEO, analytics, and web design and development.',
    responsibilities: [
      'Built and maintained client-facing websites and campaign landing pages, covering the full design-to-deployment pipeline for Web3 projects in the portfolio',
      'Developed internal tooling and dashboards to manage and track performance across influencer campaigns, KOL networks, and community growth initiatives',
      'Owned the technical infrastructure for analytics and reporting, turning campaign data into the growth insights the team used to make decisions for clients',
      'Worked closely with the founder and marketing leads to scope and deliver the web and development component of client engagements, from initial brief through to launch',
      'Kept the technical delivery sharp across 74+ partnered projects, making sure client builds shipped on time and met the quality bar a high-profile portfolio demands',
    ],
  },
   {
    company: 'Metrix Capital | Dubai, UAE',
    companyUrl: 'https://metrix.capital',
    title: 'Product Engineer',
    date: '2021 - 2023',
    description: 'Metrix Capital is a crypto-focused investment firm that also worked with early-stage Web3 startups. My role sat at the intersection of product design and engineering, helping founders turn rough ideas into products that could actually get funded.',
    responsibilities: [
      'Worked end-to-end on product development for Web3 startups in the portfolio, taking products from concept through to launched, investor-ready state',
      'Built product roadmaps grounded in capital markets context, making sure features were prioritized around what moved the needle for fundraising and early user growth',
      'Translated complex financial product requirements into clean, intuitive user experiences that non-technical users and investors could navigate without friction',
      'Ran market and competitor analysis to identify gaps and positioning opportunities, feeding those findings directly into product decisions rather than letting them sit in a deck',
      'Worked across design and code, covering everything from wireframes and interaction design to production frontend components',
    ],
  },
  {
    company: 'Bransel | Kumasi, Ghana',
    title: 'Full-Stack Engineer',
    date: '2019 - 2021',
    description: 'Bransel is a software company building digital solutions for enterprise clients across various industries in Ghana. I led product development, working with clients to understand what they needed and then shipping it.',
    responsibilities: [
      'Directed the full product lifecycle for enterprise software engagements, from scoping and design through to deployment and handoff',
      'Set up structured product development workflows that brought more predictability to timelines and reduced the back-and-forth that slows most enterprise projects down',
      'Led user research sessions with clients and their end users, using what we learned to shape what got built and in what order',
      'Managed cross-functional teams through each project stage, keeping designers, developers, and client stakeholders aligned without the usual coordination overhead',
      'Designed solutions that balanced what clients asked for with what was actually feasible and sustainable to maintain long term',
    ],
  },
  {
    company: 'Upper Manya Kro Rural Bank | Koforidua, Ghana',
    title: 'Software Engineer',
    date: '2018 - 2019',
    description: "Upper Manya Kro Rural Bank is a community-focused institution serving rural populations in Ghana's Eastern Region. The work was about making banking work for people who traditional banking systems had largely ignored.",
    responsibilities: [
      'Designed and built digital banking tools tailored to rural communities, reducing dependency on physical branch visits for customers with limited mobility or transport access',
      'Built mobile banking features focused on financial inclusion, making core banking functionality accessible on low-end devices with intermittent connectivity',
      'Worked directly with banking and compliance teams to make sure digital features met regulatory requirements from the start, not as an afterthought',
      'Shipped technical improvements that made the core platform more stable and reliable for both staff and customers',
      'Wrote documentation and built training materials that helped non-technical bank staff adopt the new digital tools with confidence',
    ],
  },
];
