import { supabase } from '../../lib/supabase.js';
import AnimatedSection from '../ui/AnimatedSection';

const VideoSection = () => {
  // Get the public URL for the video
  const { data } = supabase.storage
    .from('Media')
    .getPublicUrl('videos/sample.mp4');

  return (
    <section className="flex items-center justify-center pt-8 pb-12 relative">
      <div className="text-center z-10 max-w-md mx-auto pb-10">
        <AnimatedSection variant="fadeInDown" delay={0.1}>
          <div className='text-2xl md:text-2xl font-light text-gray-300 mb-3 tracking-wider font-serif'>
            <h1 className='text-3xl md:text-3xl font-light text-gray-300 mb-3 tracking-wider font-serif'>Video Section</h1>
          </div>
        </AnimatedSection>
        <AnimatedSection variant="scaleUp" delay={0.2}>
          <div className="mb-2 text-sm text-gray-300 tracking-widest">
            <video width="640" height="360" controls>
              <source src={data.publicUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default VideoSection;
