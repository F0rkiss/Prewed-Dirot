import { useState } from 'react';
import giftIcon from '../../assets/GiftsPic.png';


const GiftsSection = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const NoRek = "1298739";

  const copy = async () => {
    await navigator.clipboard.writeText(NoRek);
    setShowNotification(true);
    setFadeIn(false);
    
    // Trigger fade in
    setTimeout(() => setFadeIn(true), 10);
    
    // Start fade out
    setTimeout(() => {
      setFadeIn(false);
      setTimeout(() => setShowNotification(false), 500);
    }, 2500);
  };

  return (
    <section className="flex items-center justify-center pt-8 pb-12 relative">
      {/* Toast Notification */}
      {showNotification && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-500 ${
          fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          ✓ Copied
        </div>
      )}
      
      <div className="text-center z-10 max-w-md mx-auto pb-10">
        <div className='text-2xl md:text-2xl font-light text-gray-300 mb-3 tracking-wider font-serif'>
            <h1 className='text-3xl md:text-3xl font-light text-gray-300 mb-3 tracking-wider font-serif'>Gifts</h1>
        </div>
        <div className="mb-2 text-sm text-gray-300 tracking-widest">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, </p>
        </div>
          <div className="flex justify-center items-center mb-2 gap-2 text-gray-300 tracking-widest px-6 py-4 rounded-lg items-center">
            
            <img src={giftIcon} alt="Gift Icon" className='max-w-20 md:max-w-40'/>
            <div>
            <p className="flex  text-left">I Made Dirotsaha Pradnyana</p>
            <p className="flex  text-left"><strong>{NoRek}</strong></p>
            </div>
          </div>
          <button className='bg-white/40 p-2 rounded-lg hover:bg-white/60 transition-colors duration-300 text-gray-800' onClick={copy}>
            Copy Account Number
          </button>
      </div>
    </section>
  );
};

export default GiftsSection;
