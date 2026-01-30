import AnimatedSection from '../ui/AnimatedSection';
import { motion } from 'framer-motion';

const LocationSection = ({ weddingDate }) => {
  const date = new Date(weddingDate);
  const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  
  const dayName = dayNames[date.getDay()];
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return (
    <AnimatedSection variant="fadeIn" delay={0.1}>
      <section className="flex flex-col items-center justify-center pt-8 max-w-md relative bg-white/20 rounded-2xl mx-auto">
        <div className="flex flex-col items-center text-center z-10 max-w-md mx-auto pb-10">
          <AnimatedSection variant="fadeInDown" delay={0.2}>
            <h1 className="text-3xl md:text-3xl font-light text-gray-300 mb-3 tracking-wider font-serif">Pawiwahan</h1>
          </AnimatedSection>
          <AnimatedSection variant="scaleUp" delay={0.3}>
            <div className="flex mb-2 gap-2 text-gray-300 tracking-widest px-6 py-4 rounded-lg items-center">
              <h1 className="text-7xl">{day}</h1>
              <p className="flex text-left">{dayName},<br /> {month} <br /> {year}</p>
            </div>
          </AnimatedSection>
          <AnimatedSection variant="fadeInUp" delay={0.4}>
            <h3 className="text-1xl md:text-1xl font-light text-gray-300 mb-3 tracking-wider font-serif">09.00 - 12.00 WITA</h3>
            <h3 className="text-1xl md:text-1xl font-light text-gray-300 mb-3 tracking-wider font-serif">Wangaya Kaja, Denpasar</h3>
          </AnimatedSection>
          <AnimatedSection variant="fadeIn" delay={0.5}>
            <motion.button 
              className="bg-white/40 hover:bg-white/60 p-2 rounded-lg text-center text-gray-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="https://maps.app.goo.gl/As2YW35oBeBGS2AZ7">Lokasi Acara</a>
            </motion.button>
          </AnimatedSection>
        </div>

        <motion.div 
          className="my-6 h-px w-24 bg-white/80"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        ></motion.div>

        <div className="text-center z-10 max-w-md mx-auto pb-10">
          <AnimatedSection variant="fadeInDown" delay={0.2}>
            <h1 className="text-3xl md:text-3xl font-light text-gray-300 mb-3 tracking-wider font-serif">Resepsi</h1>
          </AnimatedSection>
          <AnimatedSection variant="scaleUp" delay={0.3}>
            <div className="flex mb-2 gap-2 text-gray-300 tracking-widest px-6 py-4 rounded-lg items-center">
              <h1 className="text-7xl">{day}</h1>
              <p className="flex text-left">{dayName},<br /> {month} <br /> {year}</p>
            </div>
          </AnimatedSection>
          <AnimatedSection variant="fadeInUp" delay={0.4}>
            <h3 className="text-1xl md:text-1xl font-light text-gray-300 mb-3 tracking-wider font-serif">09.00 - 12.00 WITA</h3>
            <h3 className="text-1xl md:text-1xl font-light text-gray-300 mb-3 tracking-wider font-serif">Wangaya Kaja, Denpasar</h3>
          </AnimatedSection>
          <AnimatedSection variant="fadeIn" delay={0.5}>
            <motion.button 
              className="bg-white/40 p-2 hover:bg-white/60 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="https://maps.app.goo.gl/As2YW35oBeBGS2AZ7">Lokasi Acara</a>
            </motion.button>
          </AnimatedSection>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default LocationSection;
