import weddingPhoto from '../../assets/wedding-photo.jpg';
import BackgroundCarousel from '../carousel/BackgroundCarousel.jsx';

export default function PageLayout({ children }) {
  return (
    <div className="no-scrollbar h-screen overflow-hidden bg-white">
      <div className="md:flex h-full">
        {/* Left side - only shows on desktop */}
        <div className="hidden md:block md:w-1/2 h-full overflow-hidden">
          <img src={weddingPhoto} alt="Wedding Photo" className="w-full h-full object-cover" />

        </div>

        {/* Right side - main content with background carousel */}
        <div className="w-full md:w-1/2 h-full overflow-hidden">
          <BackgroundCarousel>
            {children}
          </BackgroundCarousel>
        </div>
      </div>
    </div>
  );
}
