'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProductCard from '../cards/productcard';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image_url?: string;
  category_id?: string;
};

interface ProductSliderProps {
  products: Product[];
  categoryName: string;
}

export default function ProductSlider({ products, categoryName }: ProductSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [spacing, setSpacing] = useState(16);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate actual items per view based on container width
  const calculateItemsPerView = useCallback(() => {
    if (typeof window === 'undefined' || !containerRef.current) {
      return { perView: 1, spacing: 16 };
    }
    
    const containerWidth = containerRef.current.offsetWidth;
    const minCardWidth = 280; // Minimum card width to ensure readability
    
    // Breakpoints with actual width calculations
    let perView = 1;
    let spacing = 16;
    
    if (containerWidth >= 1024) {
      // Calculate how many cards can fit with 24px spacing
      spacing = 24;
      const cardsWithSpacing = Math.floor((containerWidth + spacing) / (minCardWidth + spacing));
      perView = Math.min(cardsWithSpacing, 4); // Max 4 at 1024px+
    } else if (containerWidth >= 768) {
      spacing = 20;
      const cardsWithSpacing = Math.floor((containerWidth + spacing) / (minCardWidth + spacing));
      perView = Math.min(cardsWithSpacing, 3); // Max 3 at 768px+
    } else if (containerWidth >= 640) {
      spacing = 16;
      const cardsWithSpacing = Math.floor((containerWidth + spacing) / (minCardWidth + spacing));
      perView = Math.min(cardsWithSpacing, 2); // Max 2 at 640px+
    } else {
      spacing = 16;
      perView = 1; // Mobile: always 1
    }
    
    // Ensure at least 1 card is shown
    return { perView: Math.max(1, perView), spacing };
  }, []);

  useEffect(() => {
    const updateBreakpoint = () => {
      // Small delay to ensure container is measured correctly
      setTimeout(() => {
        const config = calculateItemsPerView();
        setItemsPerView(config.perView);
        setSpacing(config.spacing);
        // Reset index if needed
        const newMaxIndex = Math.max(0, products.length - config.perView);
        if (currentIndex > newMaxIndex) {
          setCurrentIndex(Math.max(0, newMaxIndex));
        }
      }, 10);
    };

    // Initial calculation
    updateBreakpoint();

    // Use ResizeObserver for better accuracy
    const resizeObserver = new ResizeObserver(() => {
      updateBreakpoint();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Fallback to window resize
    window.addEventListener('resize', updateBreakpoint);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateBreakpoint);
    };
  }, [calculateItemsPerView, products.length, currentIndex]);

  const maxIndex = Math.max(0, products.length - itemsPerView);

  useEffect(() => {
    // Reset index if it's out of bounds
    if (currentIndex > maxIndex) {
      setCurrentIndex(Math.max(0, maxIndex));
    }
  }, [maxIndex, currentIndex]);

  useEffect(() => {
    if (isAutoPlaying && products.length > itemsPerView && maxIndex > 0) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }, 4000); // Auto-slide every 4 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, maxIndex, products.length, itemsPerView]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className="relative group w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Navigation Buttons */}
      {products.length > itemsPerView && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 rounded-full bg-[#111] border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#fa4616] hover:border-[#fa4616] shadow-lg"
            aria-label="Previous products"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 rounded-full bg-[#111] border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#fa4616] hover:border-[#fa4616] shadow-lg"
            aria-label="Next products"
          >
            <FiChevronRight size={20} />
          </button>
        </>
      )}

      {/* Slider Container */}
      <div className="overflow-hidden rounded-xl w-full" style={{ overflowX: 'hidden', position: 'relative' }}>
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-in-out items-stretch"
          style={{
            gap: `${spacing}px`,
            willChange: 'transform',
            transform: `translateX(calc(-${currentIndex} * ((100% - ${(itemsPerView - 1) * spacing}px) / ${itemsPerView} + ${spacing}px)))`,
          }}
        >
          {products.map((product) => {
            // Calculate width accounting for gaps between cards
            // Formula: (100% - (number of gaps * gap size)) / number of cards
            const gapCount = itemsPerView > 1 ? itemsPerView - 1 : 0;
            const totalGapWidth = gapCount * spacing;
            const cardWidth = itemsPerView === 1 
              ? '100%' 
              : `calc((100% - ${totalGapWidth}px) / ${itemsPerView})`;
            
            return (
              <div
                key={product.id}
                className="flex-shrink-0 h-full"
                style={{ 
                  width: cardWidth,
                  minWidth: cardWidth,
                  maxWidth: cardWidth,
                }}
              >
                <ProductCard
                  title={product.name}
                  description={product.description}
                  price={`$${product.price.toFixed(2)}`}
                  imageUrl={product.image_url}
                  onClick={() => {
                    // Handle product click - could open modal or navigate to product page
                    console.log('Product clicked:', product.id);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots Indicator */}
      {products.length > itemsPerView && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-[#fa4616]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
