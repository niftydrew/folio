import web3accelerators from 'public/images/web3accelerators.png';
import web3accelerators2 from 'public/images/web3accelerators2.png';
import holderspicker from 'public/images/holderspicker.png';
import holderspicker2 from 'public/images/holderspicker2.png';
import sidefolioMoonbeam from 'public/images/sidefolio-moonbeam.png';
import sidefolioMoonbeam2 from 'public/images/sidefolio-moonbeam-2.png';
import sidefolioTailwindMasterKit from 'public/images/sidefolio-tailwindmasterkit.png';
import sidefolioTailwindMasterKit2 from 'public/images/sidefolio-tailwindmasterkit-2.png';

export const products = [
  {
    href: 'https://web3accelerators.com',
    title: 'Web3 Accelerators',
    description:
      'Full suite digital marketing and community growth services engineered to connect you to your ideal audience.',
    thumbnail: web3accelerators,
    images: [web3accelerators, web3accelerators2],
    stack: ['Web design', 'Figma', 'Framer'],
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
    href: 'https://holders.web3accelerators.com',
    title: 'Holders Picker',
    description:
      "A tool for selecting random holders from a token's holders list.",
    thumbnail: holderspicker,
    images: [holderspicker, holderspicker2],
    stack: ['Nextjs', 'Tailwindcss', 'Shadcn UI', 'Web3', 'Solana'],
    slug: 'holderspicker',
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
          Built with Next.js and integrated with Solana's blockchain, Holders
          Picker allows users to define minimum holdings, among other filters.
          It queries the blockchain to check holders that fit criteria and
          select random number of those holders as defined by the user. The
          application is designed for teams conducting airdrops, giveaways, or
          community rewards on the Solana network.
        </p>
      </div>
    ),
  },
  {
    href: 'https://gomoonbeam.com',
    title: 'Moonbeam',
    description:
      'Never write from scratch again with Moonbeam, your AI first writing tool',
    thumbnail: sidefolioMoonbeam,
    images: [sidefolioMoonbeam, sidefolioMoonbeam2],
    stack: ['Nextjs', 'Tailwindcss'],
    slug: 'moonbeam',
    content: (
      <div>
        <p>
          Sit eiusmod ex mollit sit quis ad deserunt. Sint aliqua aliqua ullamco
          dolore nulla amet tempor sunt est ipsum. Dolor laborum eiusmod
          cupidatat consectetur velit ipsum. Deserunt nisi in culpa laboris
          cupidatat elit velit aute mollit nisi. Officia ad exercitation laboris
          non cupidatat duis esse velit ut culpa et.{' '}
        </p>
        <p>
          Exercitation pariatur enim occaecat adipisicing nostrud adipisicing
          Lorem tempor ullamco exercitation quis et dolor sint. Adipisicing sunt
          sit aute fugiat incididunt nostrud consequat proident fugiat id.
          Officia aliquip laborum labore eu culpa dolor reprehenderit eu ex enim
          reprehenderit. Cillum Lorem veniam eu magna exercitation.
          Reprehenderit adipisicing minim et officia enim et veniam Lorem
          excepteur velit adipisicing et Lorem magna.
        </p>{' '}
      </div>
    ),
  },
  {
    href: 'https://tailwindmasterkit.com',
    title: 'Tailwind Master Kit',
    description:
      'A beautiful and comprehensive Tailwind CSS components library for building modern websites and applications.',
    thumbnail: sidefolioTailwindMasterKit,
    images: [sidefolioTailwindMasterKit, sidefolioTailwindMasterKit2],
    stack: ['Nextjs', 'Tailwindcss'],
    slug: 'tailwindmasterkit',
    content: (
      <div>
        <p>
          Sit eiusmod ex mollit sit quis ad deserunt. Sint aliqua aliqua ullamco
          dolore nulla amet tempor sunt est ipsum. Dolor laborum eiusmod
          cupidatat consectetur velit ipsum. Deserunt nisi in culpa laboris
          cupidatat elit velit aute mollit nisi. Officia ad exercitation laboris
          non cupidatat duis esse velit ut culpa et.{' '}
        </p>
        <p>
          Exercitation pariatur enim occaecat adipisicing nostrud adipisicing
          Lorem tempor ullamco exercitation quis et dolor sint. Adipisicing sunt
          sit aute fugiat incididunt nostrud consequat proident fugiat id.
          Officia aliquip laborum labore eu culpa dolor reprehenderit eu ex enim
          reprehenderit. Cillum Lorem veniam eu magna exercitation.
          Reprehenderit adipisicing minim et officia enim et veniam Lorem
          excepteur velit adipisicing et Lorem magna.
        </p>{' '}
      </div>
    ),
  },
];
