import React, { useRef, useState } from 'react';
import { capitalizeEachWord, capitalizeFirstLetter, cropIdealDescription } from '../../../utils/Constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PredictionCarousel({ prediction }) {
  const items = prediction.predicted || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const distance = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (distance > threshold) {
      next(); 
    } else if (distance < -threshold) {
      prev();
    }
  };

  return (
    <div>
      <p className="text-sm text-gray-600">
        Tanaman yang cocok untuk ditanam periode ini adalah{" "}
        <strong>{items[currentIndex]?.nama}</strong>. Silahkan mempertimbangkan untuk menanam
        tanaman tersebut. Anda juga harus melakukan pengecekan kondisi tanah terlebih
        dahulu sebelum menanam.
      </p>

      <div className="relative mt-4" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className="p-4 bg-gray-50 rounded-xl transition-all duration-300 ease-in-out">
          <div className="flex items-center">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-[#6C7D41] font-medium">
                  {capitalizeFirstLetter(items[currentIndex]?.nama)}
                </h4>
                <span className="text-sm">
                  {capitalizeEachWord(items[currentIndex]?.kategori)}
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {cropIdealDescription(items[currentIndex]?.kategori)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <button
            onClick={prev}
            className="text-sm px-2 py-2 bg-gray-50 rounded hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-1">
            {items.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === currentIndex ? 'bg-[#6C7D41]' : 'bg-gray-300'
                }`}
              ></span>
            ))}
          </div>

          <button
            onClick={next}
            className="text-sm px-2 py-2 bg-gray-50 rounded hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
