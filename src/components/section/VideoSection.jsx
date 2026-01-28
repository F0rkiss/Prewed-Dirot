import { supabase } from '../../lib/supabase.js';

const VideoSection = () => {
  // Get the public URL for the video
  const { data } = supabase.storage
    .from('Media')
    .getPublicUrl('videos/sample.mp4');

  return (
    <section className="flex items-center justify-center pt-8 pb-12 relative">
      <div className="text-center z-10 max-w-md mx-auto pb-10">
        <div className='text-2xl md:text-2xl font-light text-gray-300 mb-3 tracking-wider font-serif'>
        <h1 className='text-3xl md:text-3xl font-light text-gray-300 mb-3 tracking-wider font-serif'>Video Section</h1>
        </div>
        <div className="mb-2 text-sm text-gray-300 tracking-widest">
        <video width="640" height="360" controls>
            <source src={data.publicUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
