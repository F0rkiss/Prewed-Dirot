import { supabase } from '../../lib/supabase.js';
import AnimatedSection from '../ui/AnimatedSection';

const VideoSection = () => {


  return (
    <section className="flex items-center justify-center pt-8 pb-12 relative">
      <div className="text-center z-10 max-w-md mx-auto pb-10">
        <AnimatedSection variant="fadeInDown" delay={0.1}>
          <div className='text-2xl md:text-2xl font-light text-gray-300 mb-3 tracking-wider font-serif'>
            <h1 className='text-3xl md:text-3xl font-light text-gray-300 mb-3 tracking-wider font-serif'>Our Story</h1>
          </div>
        </AnimatedSection>
        <AnimatedSection variant="scaleUp" delay={0.2}>
          <div className="mb-2 text-sm text-gray-300 tracking-widest">
            <div className="mx-auto w-full max-w-md                                                                                                                                                                                                                                                                                                              overflow-hidden rounded">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/x2nMQRQn3Vk"
                title="Our Story"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default VideoSection;
