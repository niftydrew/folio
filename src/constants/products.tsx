import web3accelerators from 'public/images/web3accelerators.png';
import web3accelerators2 from 'public/images/web3accelerators2.png';
import holderspicker from 'public/images/holderspicker.png';
import holderspicker2 from 'public/images/holderspicker2.png';
import scia from 'public/images/scia.png';
import scia2 from 'public/images/scia2.png';
import kelvin from 'public/images/kelvin.png';
import kelvin2 from 'public/images/kelvin2.png';
import shonen from 'public/images/shonen.png';
import shonen2 from 'public/images/shonen2.png';
import drew from 'public/images/0xdrew.png';
import drew2 from 'public/images/0xdrew2.png';
import polysimplr from 'public/images/polysimplr-dark.png';
import polysimplr2 from 'public/images/polysimplr-light.png';
import umbra from 'public/images/umbra.png';
import umbra2 from 'public/images/umbra2.png';

export const products = [
  {
    href: 'https://www.polysimplr.com',
    title: 'Polysimplr',
    description:
      'AI-powered platform designed to make prediction markets accessible with simplified interfaces, real-time market intelligence, and smart trading insights.',
    thumbnail: polysimplr,
    images: [polysimplr, polysimplr2],
    stack: [
      'AI',
      'Nextjs',
      'Tailwindcss',
      'Bun',
      'Nestjs',
      'Prediction Markets',
    ],
    slug: 'polysimplr',
    content: (
      <div>
        <p>
          Polysimplr is an innovative AI-powered platform that democratizes
          access to prediction markets, making them simpler and more accessible
          for everyone. The platform combines sophisticated AI-driven insights
          with an intuitive interface to help users trade smarter in prediction
          markets like Polymarket.
        </p>
        <p>
          The design focuses on simplicity without sacrificing functionality,
          providing real-time market intelligence and AI-powered analysis that
          helps users make informed decisions. With features tailored for both
          beginners and experienced traders, Polysimplr bridges the gap between
          complex prediction market mechanics and user-friendly accessibility,
          making it easier to navigate and succeed in the prediction market
          ecosystem.
        </p>
      </div>
    ),
  },
  {
    href: 'https://shonenpump.com',
    title: 'Shonen Pump',
    description:
      'Crypto-powered manga reader platform revolutionizing how fans access and support manga creators while fighting industry exploitation.',
    thumbnail: shonen,
    images: [shonen, shonen2],
    stack: [
      'Web3',
      'Crypto',
      'Nextjs',
      'Tailwindcss',
      'Bun',
      'Platform Design',
    ],
    slug: 'shonen-pump',
    content: (
      <div>
        <p>
          Shonen Pump has evolved from a meme cryptocurrency into a
          comprehensive crypto manga reader platform built on the Solana
          blockchain. The platform enables manga enthusiasts to read their
          favorite series while directly supporting creators through
          cryptocurrency, addressing long-standing issues of fair compensation
          in the manga and anime industry.
        </p>
        <p>
          The platform features an immersive reading experience with
          anime-inspired design aesthetics, integrating Web3 technology to
          create a sustainable ecosystem for manga creators and fans. Users can
          access manga content, participate in the community, and contribute to
          a movement advocating for creator rights and fair compensation. By
          combining blockchain technology with manga distribution, Shonen Pump
          represents a new model for content consumption that prioritizes
          creator welfare.
        </p>
      </div>
    ),
  },
  {
    href: 'https://www.umbrastrategy.xyz',
    title: 'Umbra Strategy',
    description:
      'DeFi treasury strategy platform with perpetual token economics, MetaDAO allocations, and deflationary burn mechanisms on Solana.',
    thumbnail: umbra,
    images: [umbra, umbra2],
    stack: ['Web3', 'DeFi', 'Nextjs', 'Tailwindcss', 'Solana', 'Treasury'],
    slug: 'umbra-strategy',
    content: (
      <div>
        <p>
          Umbra Strategy is an innovative DeFi platform built on Solana that
          implements a self-reinforcing perpetual cycle: Trade → Fund → Reward →
          Burn → Repeat. The platform manages treasury positions and distributes
          MetaDAO allocations to $UMBSTRAT token holders based on their score,
          creating a sustainable ecosystem that rewards long-term holders.
        </p>
        <p>
          What sets Umbra apart is its unique deflationary mechanism where users
          burn 10% of the USD value in $UMBSTRAT tokens to claim their MetaDAO
          allocations, creating continuous buying pressure and scarcity. The
          platform features real-time treasury tracking, transparent position
          management, and a scoring system that determines allocation shares.
          Built with Next.js and integrated with Solana blockchain, it
          exemplifies modern Web3 UX with sophisticated tokenomics.
        </p>
      </div>
    ),
  },
  {
    href: 'https://web3accelerators.com',
    title: 'Web3 Accelerators',
    description:
      'Full suite digital marketing and community growth services engineered to connect you to your ideal audience.',
    thumbnail: web3accelerators,
    images: [web3accelerators, web3accelerators2],
    stack: ['Web design', 'Framer'],
    slug: 'web3accelerators',
    content: (
      <div>
        <p>
          Web3 Accelerators was designed with a focus on creating an immersive,
          intuitive experience for blockchain startups seeking growth services.
          The landing page implements a clean, modern aesthetic with strategic
          use of whitespace to highlight key service offerings and value
          propositions.
        </p>
        <p>
          The design process involved extensive research into the Web3 ecosystem
          to ensure the visual language resonated with the target audience. We
          incorporated subtle animations and interactive elements to enhance
          engagement while maintaining fast load times. The color palette and
          typography were carefully selected to convey innovation and
          trustworthiness - essential qualities for businesses operating in the
          blockchain space.
        </p>
      </div>
    ),
  },
  {
    href: 'https://0xdrew.com',
    title: '0xDrew Portfolio',
    description:
      'Portfolio website for a Web3 marketing professional showcasing services and expertise in blockchain promotion.',
    thumbnail: drew,
    images: [drew, drew2],
    githubLink: 'https://github.com/niftydrew/folio',
    stack: ['Nextjs', 'Tailwindcss'],
    slug: '0xdrew-portfolio',
    content: (
      <div>
        <p>
          The 0xDrew Portfolio website was designed as a modern
          developer-designer dashboard that effectively showcases my projects
          and technical capabilities. The minimalist interface draws inspiration
          from professional development environments while incorporating subtle
          interactive elements that demonstrate my design sensibilities.
        </p>
        <p>
          This responsive portfolio features a dashboard-style layout with
          intuitive navigation and a clean, modern design that emphasizes
          functionality and accessibility.
        </p>
      </div>
    ),
  },

  {
    href: 'https://scia.ai',
    title: 'Scia AI',
    description:
      'Landing page for an AI agent trading platform that automates market analysis and execution',
    thumbnail: scia,
    images: [scia, scia2],
    githubLink: 'https://github.com/niftydrew/scia-landing',
    stack: ['Nextjs', 'Tailwindcss'],
    slug: 'scia',
    content: (
      <div>
        <p>
          SCIA is a cutting-edge AI agent trading platform designed to
          revolutionize market analysis and trade execution. The landing page
          showcases the platform&apos;s ability to analyze market trends,
          execute trades, and optimize investment strategies without human
          intervention.
        </p>
        <p>
          Built with Next.js and styled with Tailwind CSS, the website features
          a modern, professional design that emphasizes the technological
          sophistication of the platform. The interface presents complex AI
          trading concepts in an accessible way, using interactive elements and
          clear information architecture to guide potential users through the
          platform&apos;s capabilities and benefits.
        </p>
      </div>
    ),
  },
  {
    href: 'https://kelvinemmra.com',
    title: 'Kelvin Emmra Portfolio',
    description:
      'Portfolio website for a Web3 marketing professional showcasing services and expertise in blockchain promotion.',
    thumbnail: kelvin,
    images: [kelvin, kelvin2],
    stack: ['Web design', 'Framer'],
    slug: 'kelvin-portfolio',
    content: (
      <div>
        <p>
          The Kelvin Emmra Portfolio website was crafted to showcase the
          professional services and expertise of a Web3 marketing specialist.
          The design emphasizes clarity and professionalism while incorporating
          subtle blockchain-inspired visual elements that reinforce the
          client&apos;s industry focus.
        </p>
        <p>
          This responsive portfolio features a minimalist layout with strategic
          content organization to highlight client testimonials, case studies,
          and service offerings. The user experience was carefully optimized to
          guide potential clients through Kelvin&apos;s expertise and
          achievements in the blockchain space, with particular attention to
          loading performance and mobile responsiveness to ensure accessibility
          across all devices.
        </p>
      </div>
    ),
  },
  {
    href: 'https://holders.web3accelerators.com',
    title: 'Holders Picker',
    description:
      'A tool for selecting random holders from a token&apos;s holders list.',
    thumbnail: holderspicker,
    images: [holderspicker, holderspicker2],
    githubLink: 'https://github.com/niftydrew/token-holders-picker',
    stack: ['Nextjs', 'Web3', 'Solana'],
    slug: 'holders-picker',
    content: (
      <div>
        <p>
          Holders Picker is a specialized web application designed for Solana
          ecosystem participants to analyze token holder distributions and
          conduct fair, verifiable random selections. The tool addresses a
          common challenge in the Web3 space: transparently selecting token
          holders for airdrops, rewards, and community initiatives.
        </p>
        <p>
          Built with Next.js and integrated with Solana&apos;s blockchain,
          Holders Picker allows users to define minimum holdings, among other
          filters. It queries the blockchain to check holders that fit criteria
          and select random number of those holders as defined by the user. The
          application is designed for teams conducting airdrops, giveaways, or
          community rewards on the Solana network.
        </p>
      </div>
    ),
  },
];
