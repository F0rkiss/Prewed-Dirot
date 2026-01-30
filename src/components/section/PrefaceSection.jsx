import AnimatedSection from '../ui/AnimatedSection';

const PrefaceSection = () => {
  return (
    <section className="flex items-center justify-center pt-8 pb-12 relative">
      <div className="text-center z-10 max-w-md mx-auto pb-10">
        <AnimatedSection variant="fadeInDown" delay={0.1}>
          <div className='text-2xl md:text-2xl font-light text-gray-300 mb-3 tracking-wider font-serif'>
            <h1>Om Swastiastu</h1>
          </div>
        </AnimatedSection>
        <AnimatedSection variant="fadeIn" delay={0.3} duration={0.8}>
          <div className="mb-2 text-sm text-gray-300 tracking-widest">
            <p>Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa/Tuhan Yang Maha Esa kami bermaksud mengundang Bapak/Ibu/Saudara/i pada Upacara Manusa Yadnya Pawiwahan (Pernikahan) kami.</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default PrefaceSection;
