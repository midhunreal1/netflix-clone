import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../services/apiService';
import { imageUrl } from '../../constants/constants';
import ImageLoader from '../ImageLoader/ImageLoader';

function Landing() {
  const [email, setEmail] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    // Fetch trending movies for the preview section
    async function fetchTrendingMovies() {
      try {
        const data = await apiService.getTrending();
        if (data && data.results) {
          setTrendingMovies(data.results.slice(0, 6));
        }
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    }
    fetchTrendingMovies();
  }, []);

  const handleGetStarted = () => {
    // This would typically validate email and proceed to signup
    // For now, we'll redirect to home
    window.location.href = '/home';
  };

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 md:px-16 md:py-6">
        <img 
          className="h-6 md:h-8" 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" 
          alt="Netflix logo"
        />
        <div className="flex items-center space-x-4">
          <select className="bg-transparent border border-gray-400 text-white px-3 py-1 rounded text-sm">
            <option value="en" className="bg-black">English</option>
            <option value="hi" className="bg-black">हिन्दी</option>
          </select>
          <Link 
            to="/home" 
            className="bg-netflix-red hover:bg-red-700 text-white px-4 py-1 md:px-6 md:py-2 rounded text-sm font-medium transition-colors duration-200"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center text-center px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${trendingMovies[0] ? imageUrl + trendingMovies[0].backdrop_path : '/src/assets/netflix-bg.jpg'}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
            Unlimited movies, TV shows and more
          </h1>
          <h2 className="text-lg md:text-2xl font-normal mb-4">
            Starts at ₹149. Cancel at any time.
          </h2>
          <p className="text-base md:text-xl mb-6">
            Ready to watch? Enter your email to create or restart your membership.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full md:flex-1 px-4 py-3 md:py-4 bg-black/50 border border-gray-500 rounded text-white text-base focus:outline-none focus:border-white"
            />
            <button 
              onClick={handleGetStarted}
              className="bg-netflix-red hover:bg-red-700 text-white px-6 py-3 md:py-4 md:px-8 rounded text-lg md:text-xl font-medium transition-colors duration-200 flex items-center gap-2 min-w-fit"
            >
              Get Started
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Trending Now Section */}
      {trendingMovies.length > 0 && (
        <section className="py-12 px-4 md:px-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Trending Now</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {trendingMovies.map((movie, index) => (
                <div key={movie.id} className="relative group cursor-pointer">
                  <div className="absolute top-2 left-2 bg-netflix-red text-white text-xs font-bold px-2 py-1 rounded z-10">
                    {index + 1}
                  </div>
                  <ImageLoader
                    src={`${imageUrl}${movie.poster_path}`}
                    alt={movie.title || movie.name}
                    className="w-full h-auto rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
                    skeletonClassName="w-full h-64 md:h-80 rounded-lg"
                    fallbackSrc={movie.backdrop_path ? `${imageUrl}${movie.backdrop_path}` : null}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-semibold truncate">
                      {movie.title || movie.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section - Exact Netflix Design */}
      <section className="py-16 px-4 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">More reasons to join</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            
            {/* Enjoy on your TV */}
            <div className="bg-gradient-to-br from-red-600/10 to-red-700/20 p-6 rounded-2xl border border-red-600/30 hover:border-red-500/50 transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-red-600 rounded-xl mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Enjoy on your TV</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</p>
            </div>
            
            {/* Download shows */}
            <div className="bg-gradient-to-br from-purple-600/10 to-purple-700/20 p-6 rounded-2xl border border-purple-600/30 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-xl mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Download your shows to watch offline</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Save your favourites easily and always have something to watch.</p>
            </div>
            
            {/* Watch everywhere */}
            <div className="bg-gradient-to-br from-blue-600/10 to-blue-700/20 p-6 rounded-2xl border border-blue-600/30 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9a9 9 0 01-9-9m9 9c0-9-9-9-9-9" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Watch everywhere</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.</p>
            </div>
            
            {/* Create profiles for kids */}
            <div className="bg-gradient-to-br from-yellow-600/10 to-orange-700/20 p-6 rounded-2xl border border-yellow-600/30 hover:border-yellow-500/50 transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-600 rounded-xl mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Create profiles for kids</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Send children on adventures with their favourite characters in a space made just for them—free with your membership.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 md:px-16 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {[
              { q: "What is Netflix?", a: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies and more on thousands of internet-connected devices." },
              { q: "How much does Netflix cost?", a: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month." },
              { q: "Where can I watch?", a: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device." },
              { q: "How do I cancel?", a: "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks." },
              { q: "What can I watch on Netflix?", a: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more." },
              { q: "Is Netflix good for kids?", a: "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space." }
            ].map((faq, index) => (
              <details key={index} className="bg-gray-800 group">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-700 transition-colors duration-200">
                  <span className="text-lg md:text-xl font-medium">{faq.q}</span>
                  <svg className="w-6 h-6 transform group-open:rotate-45 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-300 text-lg leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
          
          {/* Second CTA */}
          <div className="text-center mt-12">
            <p className="text-base md:text-xl mb-6">
              Ready to watch? Enter your email to create or restart your membership.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Email address"
                className="w-full md:flex-1 px-4 py-3 md:py-4 bg-black/50 border border-gray-500 rounded text-white text-base focus:outline-none focus:border-white"
              />
              <button 
                onClick={handleGetStarted}
                className="bg-netflix-red hover:bg-red-700 text-white px-6 py-3 md:py-4 md:px-8 rounded text-lg md:text-xl font-medium transition-colors duration-200 flex items-center gap-2 min-w-fit"
              >
                Get Started
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 md:px-16 border-t border-gray-800 text-gray-400">
        <div className="max-w-6xl mx-auto">
          <p className="mb-8">Questions? Call 000-800-919-1694</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-8">
            <div className="space-y-3">
              <a href="#" className="block hover:underline">FAQ</a>
              <a href="#" className="block hover:underline">Investor Relations</a>
              <a href="#" className="block hover:underline">Privacy</a>
              <a href="#" className="block hover:underline">Speed Test</a>
            </div>
            <div className="space-y-3">
              <a href="#" className="block hover:underline">Help Centre</a>
              <a href="#" className="block hover:underline">Jobs</a>
              <a href="#" className="block hover:underline">Cookie Preferences</a>
              <a href="#" className="block hover:underline">Legal Notices</a>
            </div>
            <div className="space-y-3">
              <a href="#" className="block hover:underline">Account</a>
              <a href="#" className="block hover:underline">Ways to Watch</a>
              <a href="#" className="block hover:underline">Corporate Information</a>
              <a href="#" className="block hover:underline">Only on Netflix</a>
            </div>
            <div className="space-y-3">
              <a href="#" className="block hover:underline">Media Centre</a>
              <a href="#" className="block hover:underline">Terms of Use</a>
              <a href="#" className="block hover:underline">Contact Us</a>
            </div>
          </div>
          <select className="bg-transparent border border-gray-400 text-gray-400 px-3 py-2 rounded text-sm mb-8">
            <option value="en" className="bg-black">English</option>
            <option value="hi" className="bg-black">हिन्दी</option>
          </select>
          <p className="text-sm">Netflix India</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;