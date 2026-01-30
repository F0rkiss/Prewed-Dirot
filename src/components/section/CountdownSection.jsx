import { useState, useEffect } from 'react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../ui/AnimatedSection';

const CountdownSection = ({ weddingDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    hari: 0,
    jam: 0,
    menit: 0,
    detik: 0
  });

  useEffect(() => {
    // Set your wedding date here
    const targetDate = new Date(weddingDate).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const hari = Math.floor(difference / (1000 * 60 * 60 * 24));
        const jam = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const menit = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const detik = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ hari, jam, menit, detik });
      } else {
        clearInterval(timer);
        setTimeLeft({ hari: 0, jam: 0, menit: 0, detik: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <section className="flex items-center justify-center px-2 pt-8 relative">
      <div className="text-center z-10 max-w-md mx-auto pb-10">
        <AnimatedSection variant="fadeInDown" delay={0.1}>
          <div className='text-3xl md:text-3xl font-light text-gray-300 mb-3 tracking-wider font-serif'>
            <h1>Countdown Date</h1>
          </div>
        </AnimatedSection>
        <AnimatedSection variant="scaleUp" delay={0.2}>
          <StaggerContainer className="bg-white/20 flex gap-6 text-2xl md:text-2xl font-light text-gray-300 mb-3 justify-center px-6 py-4 rounded-lg tracking-wider" staggerDelay={0.15}>
            <StaggerItem variant="scaleUp">
              <div className="flex flex-col items-center">
                <span>{timeLeft.hari}</span>
                <p className="text-sm">hari</p>
              </div>
            </StaggerItem>

            <StaggerItem variant="scaleUp">
              <div className="flex flex-col items-center">
                <span>{timeLeft.jam}</span>
                <p className="text-sm">jam</p>
              </div>
            </StaggerItem>

            <StaggerItem variant="scaleUp">
              <div className="flex flex-col items-center">
                <span>{timeLeft.menit}</span>
                <p className="text-sm">menit</p>
              </div>
            </StaggerItem>

            <StaggerItem variant="scaleUp">
              <div className="flex flex-col items-center">
                <span>{timeLeft.detik}</span>
                <p className="text-sm">detik</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CountdownSection;