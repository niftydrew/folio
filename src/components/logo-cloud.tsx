import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';

export default function LogoCloud() {
  return (
    <section className='bg-background dark:bg-neutral-900 overflow-hidden py-16'>
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
                  className='mx-auto h-6 w-fit dark:invert'
                  src='/images/logos/web3accelerators.svg'
                  alt='Web3 Accelerators Logo'
                  height='20'
                  width='auto'
                />
              </div>

              <div className='flex'>
                <img
                  className='mx-auto h-6 w-fit dark:invert'
                  src='/images/logos/translucid.svg'
                  alt='Translucid Logo'
                  height='20'
                  width='auto'
                />
              </div>
              <div className='flex'>
                <img
                  className='mx-auto h-6 w-fit dark:invert'
                  src='/images/logos/scia.svg'
                  alt='Scia Logo'
                  height='20'
                  width='auto'
                />
              </div>
              <div className='flex'>
                <img
                  className='mx-auto h-6 w-fit dark:invert'
                  src='/images/logos/substruct.svg'
                  alt='Substruct Logo'
                  height='20'
                  width='auto'
                />
              </div>
              <div className='flex'>
                <img
                  className='mx-auto h-6 w-fit dark:invert'
                  src='/images/logos/buidlme.svg'
                  alt='Buidlme Logo'
                  height='20'
                  width='auto'
                />
              </div>
              <div className='flex'>
                <img
                  className='mx-auto h-6 w-fit dark:invert'
                  src='/images/logos/vested.svg'
                  alt='Vested Logo'
                  height='20'
                  width='auto'
                />
              </div>
              <div className='flex'>
                <img
                  className='mx-auto h-7 w-fit dark:invert'
                  src='/images/logos/vates.svg'
                  alt='Vates Logo'
                  height='20'
                  width='auto'
                />
              </div>
              <div className='flex'>
                <img
                  className='mx-auto h-7 w-fit dark:invert'
                  src='/images/logos/divestify.svg'
                  alt='Divestify Logo'
                  height='20'
                  width='auto'
                />
              </div>
            </InfiniteSlider>

            <div className='bg-gradient-to-r from-background dark:from-neutral-900 absolute inset-y-0 left-0 w-20 z-10'></div>
            <div className='bg-gradient-to-l from-background dark:from-neutral-900 absolute inset-y-0 right-0 w-20 z-10'></div>
          </div>
        </div>
      </div>
    </section>
  );
}
