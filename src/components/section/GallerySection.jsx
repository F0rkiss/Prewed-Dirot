import { useState, useEffect, useRef } from 'react';
import gal1 from '../../assets/gallery/GAL1.jpg';
import gal2 from '../../assets/gallery/GAL2.jpg';
import gal3 from '../../assets/gallery/GAL3.jpg';
import gal5 from '../../assets/gallery/GAL5.jpg';
import gal4 from '../../assets/gallery/GAL4.jpg';
import gal6 from '../../assets/gallery/GAL6.jpg';
import gal7 from '../../assets/gallery/GAL7.jpg';
import gal8 from '../../assets/gallery/GAL8.jpg';
import gal9 from '../../assets/gallery/GAL9.jpg';
import gal10 from '../../assets/gallery/GAL10.jpg';
import gal11 from '../../assets/gallery/GAL11.jpg';
import gal12 from '../../assets/gallery/GAL12.jpg';

const GallerySection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isCarouselMode, setIsCarouselMode] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [viewHistory, setViewHistory] = useState([]);
    const thumbnailRefs = useRef([]);

    // All 12 images
    const allImages = [gal1, gal2, gal3, gal4, gal5, gal6, gal7, gal8, gal9, gal10, gal11, gal12];
    
    // Only first 9 images for initial display
    const displayedImages = allImages.slice(0, 9);
    
    // Remaining images (10th onwards)
    const remainingImages = allImages.slice(0, 12);
    
    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    // Track image view
    const trackImageView = (index, mode, action) => {
        const timestamp = new Date().toISOString();
        const imageNumber = index + 1;
        const trackingData = {
            timestamp,
            imageNumber,
            imageIndex: index,
            action, // 'opened', 'next', 'prev', 'thumbnail', 'swipe', 'keyboard', 'see-more-opened'
        };
        
        setViewHistory(prev => [...prev, trackingData]);
        console.log('Image View Tracked:', trackingData);
        console.log('Total views:', viewHistory.length + 1);
    };

    const openImage = (index) => {
        setCurrentImageIndex(index);
        setIsModalOpen(true);
        trackImageView(index, 'modal', 'opened');
    };

    const openSeeMore = () => {
        setCurrentImageIndex(9); // Start at 10th image (index 9)
        setIsModalOpen(true);
        trackImageView(9, 'modal', 'see-more-opened');
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        
        if (isLeftSwipe) {
            const newIndex = (currentImageIndex + 1) % allImages.length;
            setCurrentImageIndex(newIndex);
            trackImageView(newIndex, 'modal', 'swipe-left');
        }
        if (isRightSwipe) {
            const newIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
            setCurrentImageIndex(newIndex);
            trackImageView(newIndex, 'modal', 'swipe-right');
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!isModalOpen) return;
            
            if (e.key === 'ArrowRight') {
                const newIndex = (currentImageIndex + 1) % allImages.length;
                setCurrentImageIndex(newIndex);
                trackImageView(newIndex, 'modal', 'keyboard-right');
            } else if (e.key === 'ArrowLeft') {
                const newIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
                setCurrentImageIndex(newIndex);
                trackImageView(newIndex, 'modal', 'keyboard-left');
            } else if (e.key === 'Escape') {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isModalOpen, currentImageIndex]);

    // Auto-scroll thumbnail into view when image changes
    useEffect(() => {
        if (isModalOpen && thumbnailRefs.current[currentImageIndex]) {
            thumbnailRefs.current[currentImageIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }, [currentImageIndex, isModalOpen]);

    return (
        <section className="flex items-center justify-center pt-8 pb-12 relative">
        <div className="text-center z-10 max-w-md mx-auto pb-10">
            <div className='text-3xl md:text-3xl font-light text-gray-300 mb-3 tracking-wider font-serif'>
                <h1 className='text-3xl md:text-3xl font-light text-gray-300 mb-3 tracking-wider font-serif'>Moment</h1>
            </div>
            <p className='mb-2 text-sm text-gray-300 tracking-widest justify-center items-center '>I would cross a thousand lifetimes to find you, and I'll gladly spend another thousand loving you.</p>
            <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
                {displayedImages.map((img, index) => (
                <img 
                    key={index}
                    src={img} 
                    alt={`Gallery ${index + 1}`} 
                    className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity" 
                    onClick={() => openImage(index)}
                />
                ))}
            </div>
            <div className="mt-6">
                <button 
                className="bg-white/40 p-2 rounded-lg hover:bg-white/60 transition-colors"
                onClick={openSeeMore}
                >
                    See More
                </button>
            </div>
            
            <div className="mb-2 text-sm text-gray-300 tracking-widest justify-center items-center flex flex-col">
                <div className="my-6 h-px w-24 bg-white/80"></div>
                <p>This is the gallery section where photos will be displayed.</p>
            </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
            <div 
            className="fixed inset-0 bg-black/60 z-50 flex flex-col items-center justify-center p-4"
            onClick={closeModal}
            >
            <div 
                className="flex flex-col items-center w-full max-w-6xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Top bar with counter and close button */}
                <div className="flex items-center justify-between w-full mb-4">
                    <div className="text-white bg-black/50 px-4 py-2 rounded-full">
                        {currentImageIndex + 1} / {allImages.length}
                    </div>
                    <button 
                        className="text-white text-4xl hover:text-gray-300"
                        onClick={closeModal}
                    >
                        ×
                    </button>
                </div>

                {/* Main content with navigation */}
                <div className="flex items-center gap-4 w-full">
                    {/* Previous button */}
                    {/* <button className="text-white text-5xl hover:text-gray-300 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center" onClick={prevImage} >
                        ‹
                    </button> */}

                    {/* Image display */}
                    <div 
                        className="flex flex-col items-center justify-center gap-4 flex-1"
                    >
                        <img 
                            src={allImages[currentImageIndex]} 
                            alt={`Gallery ${currentImageIndex + 1}`}
                            className="max-w-full max-h-[70vh] object-contain rounded-lg select-none"
                            onTouchStart={onTouchStart}
                            onTouchMove={onTouchMove}
                            onTouchEnd={onTouchEnd}
                        />
                        {/* Thumbnail slider */}
                        <div className="flex items-center gap-2 max-w-full overflow-x-auto px-4 pb-2 scroll-smooth">
                            {allImages.map((img, index) => (
                            <img
                                key={index}
                                ref={(el) => (thumbnailRefs.current[index] = el)}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className={`h-16 w-20 object-cover rounded cursor-pointer transition-all ${
                                currentImageIndex === index
                                    ? 'border-4 border-white/60 opacity-100 scale-120'
                                    : 'border-2 border-gray-500 opacity-60 hover:opacity-100'
                                }`}
                                onClick={() => {
                                    setCurrentImageIndex(index);
                                    trackImageView(index, 'modal', 'thumbnail-click');
                                }}
                            />
                            ))}
                        </div>
                    </div>

                    {/* Next button */}
                    {/* <button className="text-white text-5xl hover:text-gray-300 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center" onClick={nextImage} >
                        ›
                    </button> */}
                </div>
            </div>
            </div>
        )}

        </section>
    );
};

export default GallerySection;
