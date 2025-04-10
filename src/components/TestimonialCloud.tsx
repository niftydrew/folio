'use client';

import { testimonials } from '@/constants/testimonials';
import { InfiniteSlider } from './ui/infinite-slider';
import { Heading } from './Heading';

export default function TestimonialCloud() {
  return (
    <section className='bg-background dark:bg-neutral-900 overflow-hidden py-12'>
      <div className='group relative m-auto max-w-7xl'>
        <div className='flex flex-col'>
          <Heading
                  as='h2'
                  className='text-lg md:text-lg lg:text-2xl mt-20 mb-4'
                >
                  Testimonials
                </Heading>
          <div className='relative md:border-l py-6 w-full'>
            <InfiniteSlider
              speedOnHover={15}
              speed={30}
              gap={24}
              className='mx-auto'
              reverse={true} // Scroll left instead of right
            >
              <div className='flex gap-6'>
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className='flex-shrink-0 w-80 bg-neutral-100 dark:bg-neutral-900 border border-transparent dark:border-neutral-800 p-6 rounded-2xl flex flex-col gap-4'
                  >
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-700 flex-shrink-0'>
                        <img 
                          src={`https://i.pravatar.cc/150?u=${testimonial.author}`} 
                          alt={testimonial.author}
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <div>
                        <p className='font-semibold text-sm'>{testimonial.author}</p>
                        <p className='text-xs text-neutral-500 dark:text-neutral-400'>
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className='text-sm text-neutral-700 dark:text-neutral-300'>
                      {testimonial.content}
                    </p>
                  </div>
                ))}
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
