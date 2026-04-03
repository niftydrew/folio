import web3accelerators from '../../public/images/web3accelerators.png';
import web3accelerators2 from '../../public/images/web3accelerators2.png';
import kelvin from '../../public/images/kelvin.png';
import kelvin2 from '../../public/images/kelvin2.png';
import shonen from '../../public/images/shonen.png';
import shonen2 from '../../public/images/shonen2.png';
import polysimplr from '../../public/images/polysimplr-dark.png';
import polysimplr2 from '../../public/images/polysimplr-light.png';
import kredentic from '../../public/images/kredentic.png';
import kredentic2 from '../../public/images/kredentic2.png';

export const projects = [
  {
    href: 'https://www.kredentic.com',
    title: 'Kredentic',
    description:
      'B2B SaaS that monitors Google Maps 24/7 for fake listings impersonating real businesses. Built for the Ghanaian market, where phone-swap scams on Maps are an active and growing problem.',
    thumbnail: kredentic,
    images: [kredentic, kredentic2],
    stack: [
      'Next.js 15',
      'Python',
      'Supabase',
      'Playwright',
      'RapidFuzz',
      'TypeScript',
    ],
    slug: 'kredentic',
    content: (
      <div>
        <p>
          The scam is straightforward: copy a real business name and address
          onto a Google Maps listing, swap in a fraudulent phone number, and
          wait for customers to call. Kredentic automates the monitoring side of
          that problem. A Python detection engine scans Maps listings across 22
          Ghanaian districts and scores each result for fraud likelihood using
          three signals: phone number mismatches carry 70 points, name
          similarity via RapidFuzz fuzzy matching adds 20, and a missing
          verification badge adds 10. Anything above 80 opens an incident.
        </p>
        <p>
          When a listing triggers, Playwright spins up a headless browser,
          navigates to the Maps page, and captures a full screenshot before
          anything can change. That screenshot goes to Supabase Storage and the
          URL gets sent to the business owner over WhatsApp via Twilio. The
          Next.js dashboard tracks every incident through a defined lifecycle
          from detection to takedown, with Supabase Realtime keeping the UI
          current without polling.
        </p>
      </div>
    ),
  },
  {
    href: 'https://www.polysimplr.com',
    title: 'Polysimplr',
    description:
      'Full-stack web app layered on top of Polymarket that makes prediction markets usable for people outside of crypto. AI chat assistant, live event browsing, and watchlists. 1,184 users, zero paid acquisition.',
    thumbnail: polysimplr,
    images: [polysimplr, polysimplr2],
    stack: [
      'Next.js 15',
      'NestJS',
      'PostgreSQL',
      'Redis',
      'OpenAI',
      'Privy',
      'TypeScript',
      'Docker',
    ],
    slug: 'polysimplr',
    content: (
      <div>
        <p>
          Polymarket has great data but assumes you already know what an
          orderbook is. Polysimplr sits on top of it and removes that
          assumption. Users can browse live events, save a watchlist, and ask
          plain-language questions about any market in a chat panel. The AI
          pulls fresh search results via Tavily before each response so answers
          reflect what happened today, not training data. The platform has 544
          registered users with no paid acquisition.
        </p>
        <p>
          The backend is a modular NestJS API backed by PostgreSQL and Redis.
          The watchlist service batches all event ID lookups into a single Redis
          pipeline call so loading a full watchlist never becomes an N+1
          problem. Auth runs through Privy, which auto-provisions wallets for
          users who do not have one, so no one hits a MetaMask wall just to
          browse markets. AI responses stream to the browser over Server-Sent
          Events with follow-up questions generated via function calling.
        </p>
      </div>
    ),
  },
  {
    href: 'https://shonenpump.online',
    title: 'Shonen Pump',
    description:
      'Manga reader on Solana built around a token burn credit system. Each wallet gets 50 free daily reads. Burning the platform SPL token unlocks more, permanently and deflationary.',
    thumbnail: shonen,
    images: [shonen, shonen2],
    stack: [
      'Next.js 15',
      'Solana',
      'SPL Tokens',
      'Redis',
      'MangaDex',
      'Jupiter',
      'TypeScript',
    ],
    slug: 'shonen-pump',
    content: (
      <div>
        <p>
          Shonen Pump pulls manga from MangaDex and gates access through a
          credit system tied to a Solana SPL token. Every wallet gets 50 free
          credits per day, enough for 5 chapters. When that runs out, readers
          burn tokens to unlock more. Each burn is permanent and reduces
          circulating supply, so platform usage has a direct mechanical effect
          on token economics rather than just being decorative Web3 branding.
        </p>
        <p>
          The token burn amount is priced dynamically against the live USD rate
          from Jupiter, so the cost per chapter stays consistent as the token
          price moves. All Solana RPC calls are proxied server-side to keep the
          Helius API key out of the browser. Once a chapter is unlocked it stays
          unlocked in Redis forever, so readers actually own what they paid for
          rather than losing access if they stop holding tokens.
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
];
