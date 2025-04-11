import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { logos } from '@/constants/logos';
import Link from 'next/link';

export default function LogoCloud() {
  return (
    <section className='bg-background dark:bg-neutral-900 overflow-hidden py-16'>
      <div className='group relative m-auto max-w-7xl'>
        <div className='flex flex-col items-center md:flex-row'>
          <div className='relative md:border-l py-6 md:w-[calc(100%-11rem)]'>
            <InfiniteSlider
              speedOnHover={20}
              speed={40}
              gap={32}
            >
              {logos.map((logo) => (
                <div key={logo.alt} className='flex md:px-8'>
                  {logo.href ? (
                    <Link 
                      href={logo.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="transition-opacity hover:opacity-70"
                    >
                      <img
                        className={`mx-auto ${logo.height} w-fit dark:invert`}
                        src={logo.src}
                        alt={logo.alt}
                        height='20'
                        width='auto'
                      />
                    </Link>
                  ) : (
                    <img
                      className={`mx-auto ${logo.height} w-fit dark:invert`}
                      src={logo.src}
                      alt={logo.alt}
                      height='20'
                      width='auto'
                    />
                  )}
                </div>
              ))}
            </InfiniteSlider>

            <div className='bg-gradient-to-r from-background dark:from-neutral-900 absolute inset-y-0 left-0 w-20 z-10'></div>
            <div className='bg-gradient-to-l from-background dark:from-neutral-900 absolute inset-y-0 right-0 w-20 z-10'></div>
          </div>
        </div>
      </div>
    </section>
  );
}
