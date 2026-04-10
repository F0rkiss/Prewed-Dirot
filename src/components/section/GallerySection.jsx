import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase.js';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../ui/AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';

const GallerySection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isCarouselMode, setIsCarouselMode] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [viewHistory, setViewHistory] = useState([]);
    const [allImages, setAllImages] = useState([]);
    const thumbnailRefs = useRef([]);

    // console.log('GallerySection component mounted, allImages:', allImages);

    useEffect(() => {
    async function fetchImages() {
        const { data, error } = await supabase.storage
            .from('Media')
            .list('images/gallery', {
                limit: 100,
                offset: 0,
                sortBy: { column: 'name', order: 'asc' }
            });

        if (error) {
            console.error('Error fetching images:', error);
            return;
        }

        const imageUrls = data
            .filter(file => file.id !== null)
            .sort((a, b) => {
                const numA = parseInt(a.name.match(/\d+/)?.[0] || 0);
                const numB = parseInt(b.name.match(/\d+/)?.[0] || 0);
                return numA - numB;
            })
            .map(file => {
                const { data: urlData } = supabase.storage
                    .from('Media')
                    .getPublicUrl(`images/gallery/${file.name}`);
                return urlData.publicUrl;
            });

        setAllImages(imageUrls);
    }

    fetchImages();
}, []);
    
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
        // console.log('Image View Tracked:', trackingData);
        // console.log('Total views:', viewHistory.length + 1);
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

    const goToNext = () => {
        if (!allImages.length) return;
        const newIndex = (currentImageIndex + 1) % allImages.length;
        setCurrentImageIndex(newIndex);
        trackImageView(newIndex, 'modal', 'next-button');
    };

    const goToPrev = () => {
        if (!allImages.length) return;
        const newIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
        setCurrentImageIndex(newIndex);
        trackImageView(newIndex, 'modal', 'prev-button');
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

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    return (
        <section className="flex items-center justify-center pt-8 pb-4 relative">
        <div className="text-center z-10 max-w-md mx-auto pb-10">
            <AnimatedSection variant="fadeInDown" delay={0.1}>
                <div className='text-3xl md:text-3xl font-light text-gray-300 mb-3 tracking-wider font-serif'>
                    <h1 className='text-3xl md:text-3xl font-light text-gray-300 mb-3 tracking-wider font-serif'>Wedding Gallery</h1>
                </div>
            </AnimatedSection>
            <AnimatedSection variant="fadeIn" delay={0.2}>
                <p className='mb-2 text-sm text-gray-300 tracking-widest justify-center items-center '>Jejak kisah yang kami rajut, disaksikan dalam setiap senyum dan doa.</p>
            </AnimatedSection>
            <StaggerContainer className="grid grid-cols-3 gap-4 max-w-4xl mx-auto" staggerDelay={0.1}>
                {displayedImages.map((img, index) => (
                <StaggerItem key={index} variant="scaleUp">
                    <motion.img 
                        src={img} 
                        alt={`Galeri ${index + 1}`} 
                        className="w-full h-48 object-cover rounded-lg cursor-pointer" 
                        onClick={() => openImage(index)}
                        whileHover={{ scale: 1.05, opacity: 0.9 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    />
                </StaggerItem>
                ))}
            </StaggerContainer>
            <AnimatedSection variant="fadeInUp" delay={0.3}>
                <div className="mt-6">
                    <motion.button 
                        className="bg-white/40 p-2 rounded-lg hover:bg-white/60 transition-colors"
                        onClick={openSeeMore}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Lihat Selengkapnya
                    </motion.button>
                </div>
            </AnimatedSection>
            
            <AnimatedSection variant="fadeIn" delay={0.4}>
                <div className="mb-2 text-sm text-gray-300 tracking-widest justify-center items-center flex flex-col">
                    <motion.div 
                        className="my-6 h-px w-24 bg-white/80"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    ></motion.div>
                    <p>Koleksi momen yang kami syukuri bersama orang terkasih.</p>
                </div>
            </AnimatedSection>
        </div>

        {/* Modal */}
        <AnimatePresence>
        {isModalOpen && (
            <motion.div 
                className="fixed inset-0 bg-black/60 z-50 flex flex-col items-center justify-center "
                onClick={closeModal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
            <motion.div 
                className="flex flex-col items-center justify-center w-full h-full max-w-6xl"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                {/* Overlay navigation buttons */}
                <button
                    className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        goToPrev();
                    }}
                    aria-label="Foto sebelumnya"
                >
                    ‹
                </button>
                <button
                    className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        goToNext();
                    }}
                    aria-label="Foto berikutnya"
                >
                    ›
                </button>

                {/* Top bar with counter and close button */}
                <div className="flex items-center justify-between w-full mb-4 absolute top-4 right-2 md:left-0 md:right-0">
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

                {/* Main image display - centered */}
                <div 
                    className="flex items-center justify-center flex-1 w-full"
                >
                    <motion.img 
                        key={currentImageIndex}
                        src={allImages[currentImageIndex]} 
                        alt={`Galeri ${currentImageIndex + 1}`}
                        className="max-w-full max-h-[70vh] object-contain rounded-lg select-none"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                </div>

                {/* Fixed Thumbnail slider at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm w-full">
                    <div className="flex items-center gap-2 overflow-x-auto px-4 py-4 scroll-smooth">
                        {allImages.map((img, index) => (
                        <motion.img
                            key={index}
                            ref={(el) => (thumbnailRefs.current[index] = el)}
                            src={img}
                            alt={`Pratinjau ${index + 1}`}
                            className={`h-16 w-20 object-cover rounded cursor-pointer transition-all flex-shrink-0 ${
                            currentImageIndex === index
                                ? 'border-4 border-white/60 opacity-100 scale-120'
                                : 'border-2 border-gray-500 opacity-60 hover:opacity-100'
                            }`}
                            onClick={() => {
                                setCurrentImageIndex(index);
                                trackImageView(index, 'modal', 'thumbnail-click');
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        />
                        ))}
                    </div>
                </div>
            </motion.div>
            </motion.div>
        )}
        </AnimatePresence>

        </section>
    );
};

export default GallerySection;
