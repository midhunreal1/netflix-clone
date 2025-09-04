import React from 'react';
import { originals, action, romance, comedy, horror, documentaries } from '../../urls';
import Navbar from '../NavBar/Navbar';
import RowPost from '../RowPost/RowPost';
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';

function Home() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Banner />
      
      <main className="relative z-20 -mt-24 pb-12">
        {/* Continue Watching Section */}
        <div className="mb-8">
          <RowPost title='Continue Watching for John' isSmall category="trending" />
        </div>

        {/* Trending Section */}
        <div className="mb-8">
          <RowPost title='Trending Now' category="trending" />
        </div>

        {/* Top Picks */}
        <div className="mb-8">
          <RowPost title='Top Picks for You' isSmall category="action" />
        </div>

        {/* Netflix Originals */}
        <div className="mb-8">
          <RowPost title='Netflix Originals' url={originals} />
        </div>

        {/* Popular on Netflix */}
        <div className="mb-8">
          <RowPost title='Popular on Netflix' isSmall category="comedy" />
        </div>

        {/* Genre-based rows */}
        <div className="mb-8">
          <RowPost title='Action & Adventure' isSmall category="action" />
        </div>
        
        <div className="mb-8">
          <RowPost title='Comedies' isSmall category="comedy" />
        </div>
        
        <div className="mb-8">
          <RowPost title='Horror Movies' isSmall category="horror" />
        </div>
        
        <div className="mb-8">
          <RowPost title='Romantic Movies' isSmall category="romance" />
        </div>
        
        <div className="mb-8">
          <RowPost title='Documentaries' isSmall category="documentaries" />
        </div>

        {/* My List */}
        <div className="mb-8">
          <RowPost title='My List' isSmall category="trending" />
        </div>

        {/* Watch It Again */}
        <div className="mb-8">
          <RowPost title='Watch It Again' isSmall category="romance" />
        </div>

        {/* New Releases */}
        <div className="mb-8">
          <RowPost title='New Releases' isSmall category="action" />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default Home;