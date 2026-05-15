import React from 'react';

export default function StickyFooterCTA() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-400/90 backdrop-blur-sm py-4 px-6 border-t border-gray-300 z-80 shadow-[0_-5px_15px_rgba(0,0,0,0.1)] transition-all duration-300">
      <div className="max-w-6xl mx-auto flex justify-center items-center">
        <a
          href="/special-offer"
          className="w-full md:w-auto bg-gray-500 hover:bg-gray-600 text-white font-bold text-lg md:text-xl py-4 px-12 rounded-md shadow-lg transition-transform active:scale-95 uppercase tracking-tight"
        >
          Get 30% OFF Mushroom Coffee Labs Pro Now
        </a>
      </div>
    </div>
  );
}
