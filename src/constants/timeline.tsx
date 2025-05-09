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
    company: 'Web3Accelerators | Dubai, UAE (Remote)',
    companyUrl: 'https://web3accelerators.com',
    title: 'Chief Technology Officer',
    date: '2024 - Present',
    description: 'Building the future of Web3 marketing',
    responsibilities: [
      'Spearheaded technical strategy for Web3 marketing platforms, enabling brands to effectively reach and engage with blockchain communities',
      'Architected and deployed marketing analytics systems that provide unique insights into decentralized ecosystem engagement and user behavior',
      'Developed technical frameworks for tokenized marketing campaigns that incentivize authentic community growth and brand advocacy',
      'Cultivated strategic partnerships with leading blockchain networks and Web3 infrastructure providers to enhance technical capabilities',
      'Mentored technical teams on emerging Web3 technologies including zero-knowledge proofs, layer-2 solutions, and cross-chain interoperability',
    ],
  },
  {
    company: 'Metrix Capital | Dubai, UAE (Remote)',
    companyUrl: 'https://metrix.capital',
    title: 'Product Lead',
    date: '2021 - 2023',
    description: 'Mentoring and guiding startup founders',
    responsibilities: [
      'Orchestrated end-to-end product development for innovative web3 startups, increasing seed rounds success rate by 45% within 18 months',
      'Developed comprehensive product roadmaps aligned with market trends and business objectives in capital markets',
      'Implemented agile methodologies that reduced development cycles by 30% while maintaining product quality',
      'Conducted extensive market and competitor analysis to identify untapped opportunities and strategic advantages',
      'Collaborated with cross-functional teams to transform complex financial requirements into intuitive user experiences',
    ],
  },
  {
    company: 'Bransel | Kumasi, Ghana',
    title: 'Product Development Lead',
    date: '2019 - 2021',
    description: 'Building enterprise solutions',
    responsibilities: [
      'Directed product strategy and development for digital solutions serving enterprise clients across multiple industries',
      'Established streamlined product development workflows that improved time-to-market by 40%',
      'Led user research initiatives that informed feature prioritization and resulted in 85% user satisfaction scores',
      'Managed cross-functional teams through complete product lifecycle stages from conceptualization to deployment',
      'Designed scalable solutions that addressed client pain points while maintaining technical feasibility',
    ],
  },
  {
    company: 'Upper Manya Kro Rural Bank | Koforidua, Ghana',
    title: 'Digital Product Engineer',
    date: '2018 - 2019',
    description: 'Building digital banking products',
    responsibilities: [
      'Engineered digital banking solutions tailored for rural communities, increasing customer accessibility by 60%',
      'Developed mobile banking features that enhanced financial inclusion for underserved populations',
      'Collaborated with banking professionals to translate regulatory requirements into compliant digital features',
      'Implemented technical improvements that reduced system downtime by 25% and enhanced overall performance',
      'Created documentation and training materials that facilitated successful adoption of new digital banking tools',
    ],
  },
  {
    company: 'UCL Ghana Limited | Accra, Ghana',
    companyUrl: 'https://uclghana.com',
    title: 'Product Design and Development Consultant',
    date: '2018 - 2019',
    description: 'Consulting on product development',
    responsibilities: [
      'Provided consultancy on digital product design for internal logistics and enterprise resource management tools.',
      'Assisted in the development of a new feature that personalizes user interface',
      'Created interactive prototypes and wireframes, helping stakeholders visualize features before development.',
      'Recommended UI/UX changes that improved user satisfaction metrics in client applications.',
      'Conducted user research and provided insights to inform product decisions.',
    ],
  },
];
