import React, { useState, useEffect } from 'react';

function ImageLoader({ 
  src, 
  alt, 
  className = '', 
  skeletonClassName = '',
  showSpinner = false,
  fallbackSrc = null,
  onLoad = () => {},
  onError = () => {}
}) {
  const [imageState, setImageState] = useState('loading'); // loading, loaded, error
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    if (!src) {
      setImageState('error');
      return;
    }

    setImageState('loading');
    setCurrentSrc(src);

    const img = new Image();
    
    img.onload = () => {
      setImageState('loaded');
      onLoad();
    };
    
    img.onerror = () => {
      if (fallbackSrc && currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
        // Try loading fallback image
        const fallbackImg = new Image();
        fallbackImg.onload = () => {
          setImageState('loaded');
          onLoad();
        };
        fallbackImg.onerror = () => {
          setImageState('error');
          onError();
        };
        fallbackImg.src = fallbackSrc;
      } else {
        setImageState('error');
        onError();
      }
    };
    
    img.src = src;
  }, [src, fallbackSrc, currentSrc, onLoad, onError]);

  // Loading skeleton
  if (imageState === 'loading') {
    return (
      <div className={`${className} ${skeletonClassName || 'bg-gray-800'} flex items-center justify-center animate-pulse`}>
        {showSpinner && (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-netflix-red"></div>
        )}
        {!showSpinner && (
          <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    );
  }

  // Error state
  if (imageState === 'error') {
    return (
      <div className={`${className} ${skeletonClassName || 'bg-gray-800'} flex flex-col items-center justify-center`}>
        <svg className="w-12 h-12 text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-xs text-gray-500">Failed to load</span>
      </div>
    );
  }

  // Successfully loaded image
  return (
    <img
      src={currentSrc}
      alt={alt}
      className={`${className} transition-all duration-500 opacity-100 animate-fadeIn`}
      loading="lazy"
      style={{ 
        animation: 'fadeIn 0.5s ease-in-out'
      }}
    />
  );
}

export default ImageLoader;