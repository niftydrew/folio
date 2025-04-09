import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';

export default function LogoCloud() {
  return (
    <section className='bg-background overflow-hidden py-16'>
      <div className='group relative m-auto max-w-7xl'>
        <div className='flex flex-col items-center md:flex-row'>
          <div className='relative md:border-l py-6 md:w-[calc(100%-11rem)]'>
            <InfiniteSlider
              speedOnHover={20}
              speed={40}
              gap={112}
            >
              <div className='flex'>
                <img
                  className='mx-auto h-5 w-fit dark:invert'
                  src='https://html.tailus.io/blocks/customers/nvidia.svg'
                  alt='Nvidia Logo'
                  height='20'
                  width='auto'
                />
              </div>

              <div className='flex'>
                <img
                  className='mx-auto h-4 w-fit dark:invert'
                  src='https://html.tailus.io/blocks/customers/column.svg'
                  alt='Column Logo'
                  height='16'
                  width='auto'
                />
              </div>
              <div className='flex'>
                <img
                  className='mx-auto h-4 w-fit dark:invert'
                  src='https://html.tailus.io/blocks/customers/github.svg'
                  alt='GitHub Logo'
                  height='16'
                  width='auto'
                />
              </div>
              <div className='flex'>
                <img
                  className='mx-auto h-5 w-fit dark:invert'
                  src='https://html.tailus.io/blocks/customers/nike.svg'
                  alt='Nike Logo'
                  height='20'
                  width='auto'
                />
              </div>
              <div className='flex'>
                <img
                  className='mx-auto h-5 w-fit dark:invert'
                  src='https://html.tailus.io/blocks/customers/lemonsqueezy.svg'
                  alt='Lemon Squeezy Logo'
                  height='20'
                  width='auto'
                />
              </div>
              <div className='flex'>
                <img
                  className='mx-auto h-4 w-fit dark:invert'
                  src='https://html.tailus.io/blocks/customers/laravel.svg'
                  alt='Laravel Logo'
                  height='16'
                  width='auto'
                />
              </div>
              <div className='flex'>
                <img
                  className='mx-auto h-7 w-fit dark:invert'
                  src='https://html.tailus.io/blocks/customers/lilly.svg'
                  alt='Lilly Logo'
                  height='28'
                  width='auto'
                />
              </div>

              <div className='flex'>
                <img
                  className='mx-auto h-6 w-fit dark:invert'
                  src='https://html.tailus.io/blocks/customers/openai.svg'
                  alt='OpenAI Logo'
                  height='24'
                  width='auto'
                />
              </div>
            </InfiniteSlider>

            <div className='bg-linear-to-r from-background absolute inset-y-0 left-0 w-20'></div>
            <div className='bg-linear-to-l from-background absolute inset-y-0 right-0 w-20'></div>
          </div>
        </div>
      </div>
    </section>
  );
}
