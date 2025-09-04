import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/apiService';
import { imageUrl } from '../../constants/constants';
import YouTube from 'react-youtube';
import ImageLoader from '../ImageLoader/ImageLoader';

function RowPost({ title, url, isSmall = false, category }) {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState('');
  const [loading, setLoading] = useState(true);
  const rowRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let data;
        
        if (category) {
          data = await apiService.getMoviesByCategory(category);
        } else if (title.toLowerCase().includes('netflix originals')) {
          data = await apiService.getNetflixOriginals();
        } else {
          data = await apiService.getTrending();
        }
        
        if (data && data.results) {
          setMovies(data.results);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url, category]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleMovie = async (movie, event) => {
    // If double-clicked, navigate to player
    if (event.detail === 2) {
      navigate('/player', { state: { movie } });
      return;
    }

    // Single click - show trailer
    if (urlId) {
      setUrlId('');
    } else {
      try {
        const data = await apiService.getMovieTrailer(movie.id);
        if (data.results && data.results.length > 0) {
          setUrlId(data.results[0]);
        } else {
          console.log('No trailer available');
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    }
  };

  const slide = (direction) => {
    const { scrollLeft, clientWidth } = rowRef.current;
    const scrollTo = direction === 'left' 
      ? scrollLeft - clientWidth 
      : scrollLeft + clientWidth;
    
    rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="text-white px-4 md:px-16 mb-8">
        <h2 className="text-lg md:text-xl font-bold mb-4">
          {title}
        </h2>
        <div className="flex space-x-2 md:space-x-4 py-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className={`${isSmall ? 'min-w-[150px] h-[84px] md:min-w-[200px] md:h-[112px]' : 'min-w-[250px] h-[140px] md:min-w-[400px] md:h-[225px]'} bg-gray-700 animate-pulse rounded-md`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="text-white px-4 md:px-12 mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-2xl font-bold hover:text-gray-300 cursor-pointer transition-colors duration-200 flex items-center">
          {title}
          <svg className="w-4 h-4 ml-2 opacity-70" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </h2>
        <button className="text-sm text-gray-400 hover:text-white transition-colors duration-200 hidden md:block">
          Explore All
        </button>
      </div>
      
      <div className="group relative">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg scale-90 hover:scale-100 -ml-6"
          onClick={() => slide('left')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div 
          ref={rowRef}
          className="flex overflow-x-scroll scrollbar-hide space-x-1 md:space-x-2 py-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies && movies.length > 0 ? movies.map((movie, index) => (
            <div
              key={movie.id}
              className={`
                ${isSmall ? 'min-w-[160px] h-[90px] md:min-w-[240px] md:h-[135px]' : 'min-w-[280px] h-[158px] md:min-w-[350px] md:h-[197px]'} 
                cursor-pointer transform hover:scale-110 hover:z-10 transition-all duration-300 group/movie relative rounded-lg overflow-hidden
                ${index === 0 ? 'ml-4 md:ml-0' : ''}
              `}
              onClick={(e) => handleMovie(movie, e)}
            >
              <ImageLoader
                className="w-full h-full object-cover"
                skeletonClassName="rounded-lg"
                src={`${imageUrl}${movie.backdrop_path}`}
                alt={movie?.title || movie?.name || movie?.original_name}
                fallbackSrc={movie.poster_path ? `${imageUrl}${movie.poster_path}` : null}
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/movie:opacity-100 transition-all duration-300" />
              
              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover/movie:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/movie:translate-y-0">
                <h3 className="text-white font-bold text-sm md:text-base mb-1 line-clamp-2">
                  {movie?.title || movie?.name || movie?.original_name}
                </h3>
                
                {/* Action buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition-colors duration-200">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600 transition-colors duration-200">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                    <button className="bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600 transition-colors duration-200">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-green-400 text-xs font-semibold">98% Match</span>
                    <span className="border border-gray-400 text-gray-300 px-1 text-xs">HD</span>
                  </div>
                </div>
                
                {/* Genres */}
                <div className="flex space-x-1 mt-2">
                  <span className="text-gray-300 text-xs">Action</span>
                  <span className="text-gray-500 text-xs">•</span>
                  <span className="text-gray-300 text-xs">Drama</span>
                  <span className="text-gray-500 text-xs">•</span>
                  <span className="text-gray-300 text-xs">Thriller</span>
                </div>
              </div>

              {/* Top-10 Badge for first 10 items */}
              {index < 10 && (
                <div className="absolute top-2 left-2 bg-netflix-red text-white text-xs font-bold px-2 py-1 rounded">
                  #{index + 1}
                </div>
              )}
            </div>
          )) : (
            <div className="flex items-center justify-center w-full py-12">
              <p className="text-gray-400">No content available at the moment</p>
            </div>
          )}
        </div>

        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg scale-90 hover:scale-100 -mr-6"
          onClick={() => slide('right')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {urlId && (
        <div className="mt-8 rounded-lg overflow-hidden shadow-2xl">
          <YouTube videoId={urlId.key} opts={opts} />
        </div>
      )}
    </div>
  );
}

export default RowPost;