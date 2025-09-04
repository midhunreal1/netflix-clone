import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/apiService';
import { imageUrl } from '../../constants/constants';
import ImageLoader from '../ImageLoader/ImageLoader';

function Banner() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await apiService.getTrending();
        if (data && data.results && data.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.results.length);
          setMovie(data.results[randomIndex]);
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + '...' : string;
  }

  if (loading) {
    return (
      <header className="relative h-screen flex items-center justify-center text-white bg-black">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-netflix-red mb-4"></div>
          <p className="text-lg">Loading Netflix content...</p>
        </div>
      </header>
    );
  }

  return (
    <header className="relative h-screen flex items-center justify-start text-white object-contain overflow-hidden">
      {/* Background Image with Loader */}
      <div className="absolute inset-0 z-0">
        {movie?.backdrop_path ? (
          <ImageLoader
            src={`${imageUrl}${movie.backdrop_path}`}
            alt="Background"
            className="w-full h-full object-cover"
            skeletonClassName="w-full h-full bg-gradient-to-r from-gray-900 to-black"
            showSpinner={true}
            onLoad={() => setImageLoaded(true)}
            fallbackSrc="/src/assets/netflix-bg.jpg"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-gray-900 to-black"></div>
        )}
      </div>
      <div className="ml-4 md:ml-16 max-w-lg md:max-w-2xl z-10">
        {/* Netflix Series/Movie Badge */}
        <div className="flex items-center space-x-4 mb-4">
          <img 
            className="h-6 md:h-8" 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" 
            alt="Netflix"
          />
          <span className="text-sm md:text-base text-gray-300 font-medium tracking-wide">SERIES</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-4 drop-shadow-2xl leading-tight">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        
        {/* Genre Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs md:text-sm bg-red-600 text-white px-2 py-1 rounded font-medium">Drama</span>
          <span className="text-xs md:text-sm bg-gray-800 text-white px-2 py-1 rounded font-medium">Thriller</span>
          <span className="text-xs md:text-sm bg-gray-800 text-white px-2 py-1 rounded font-medium">Action</span>
        </div>

        {/* Rating and Year */}
        <div className="flex items-center space-x-4 mb-6 text-sm md:text-base">
          <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">IMDB 8.5</span>
          <span className="text-gray-300">2024</span>
          <span className="border border-gray-400 text-gray-300 px-2 py-1 text-xs">16+</span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button 
            onClick={() => navigate('/player', { state: { movie } })}
            className="flex items-center justify-center bg-white text-black px-8 py-3 md:px-10 md:py-4 rounded-md font-bold text-base md:text-lg hover:bg-gray-200 transition-all duration-200 shadow-lg"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Play
          </button>
          
          <button className="flex items-center justify-center bg-gray-600/80 text-white px-8 py-3 md:px-10 md:py-4 rounded-md font-bold text-base md:text-lg hover:bg-gray-600 transition-all duration-200 backdrop-blur-sm">
            <svg className="w-5 h-5 md:w-6 md:h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            More Info
          </button>
        </div>

        <p className="max-w-md md:max-w-lg lg:max-w-2xl text-sm md:text-base leading-relaxed drop-shadow-xl text-gray-200">
          {truncate(movie?.overview, 180)}
        </p>
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/50 via-transparent to-transparent z-0" />
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
    </header>
  );
}

export default Banner;