import { supabase } from '../../lib/supabase.js';
import AnimatedSection from '../ui/AnimatedSection';
import { motion } from 'framer-motion';

const ProfileSection = () => {
  const { data: dirot } = supabase.storage
      .from('Media')
      .getPublicUrl('images/ProfileDirot.jpg');

  const { data: anya } = supabase.storage
      .from('Media')
      .getPublicUrl('images/ProfileAnya.jpg');
  return (
    <section className="flex items-center justify-center pt-8 relative">
      <div className="flex flex-col items-center gap-8 z-10 max-w-md mx-auto pb-10">
        {/* Groom Profile */}
        <AnimatedSection variant="scaleUp" delay={0.1}>
          <div className="text-3xl md:text-3xl font-light text-gray-300 tracking-wider font-serif">
            <motion.img 
              className="max-w-60 rounded-[1vw]" 
              src={dirot.publicUrl} 
              alt="Profile Dirot"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </AnimatedSection>
        <AnimatedSection variant="fadeInUp" delay={0.2}>
          <div className='text-gray-300 mb-3 text-base items-center tracking-wider'>
            <div className='text-center'>
              <h3 className='text-3xl font-serif'>I Made Dirotsaha Pradnyana S.S.</h3>
              <p>Putra kedua dari pasangan</p>
              <p className='font-serif'>Bapak I Gede Simbadi</p>
              <p>& </p>
              <p className='font-serif'>Ibu I Kade Mardaniati </p>
            </div>
          </div>
        </AnimatedSection>
          
        {/* Vertical line divider */}
        <AnimatedSection variant="scaleIn" delay={0.3}>
          <motion.div 
            className="my-6 h-24 w-px bg-white/80"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          ></motion.div>
        </AnimatedSection>

        {/* Bride Profile */}
        <AnimatedSection variant="scaleUp" delay={0.4}>
          <div className="text-3xl md:text-3xl font-light text-gray-300 tracking-wider font-serif">
            <motion.img 
              className="max-w-60 rounded-[1vw]" 
              src={anya.publicUrl} 
              alt="Profile Anya"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </AnimatedSection>
        <AnimatedSection variant="fadeInUp" delay={0.5}>
          <div className='text-gray-300 mb-3 text-base items-center tracking-wider'>
            <div className='text-center'>
              <h1 className='text-3xl font-serif'>I Gusti Ayu Pt Pradnya Dewi S.M</h1>
              <p>Putri pertama dari pasangan</p>
              <p className='font-serif capitalize'>Bapak I gusti ketut sujana putra</p>
              <p>& </p>
              <p className='font-serif capitalize'>Ibu gusti ayu made mastini </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ProfileSection;