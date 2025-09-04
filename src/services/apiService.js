import axios from '../axios';
import { API_KEY } from '../constants/constants';

// Fallback movie data in case API fails
const fallbackMovies = {
  trending: [
    {
      id: 1,
      title: "Stranger Things",
      name: "Stranger Things",
      backdrop_path: "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
      poster_path: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
      overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl."
    },
    {
      id: 2,
      title: "The Crown",
      name: "The Crown",
      backdrop_path: "/wHa6KOJAoNTFLFtp7wguUJKSnju.jpg",
      poster_path: "/1M876KQUEgAF8R4Q3bjzPBk7dvl.jpg",
      overview: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century."
    },
    {
      id: 3,
      title: "Wednesday",
      name: "Wednesday",
      backdrop_path: "/iHSwvRVsRyxpX7FE7GbviaDvgGZ.jpg",
      poster_path: "/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
      overview: "Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends — and foes — at Nevermore Academy."
    },
    {
      id: 4,
      title: "Money Heist",
      name: "Money Heist",
      backdrop_path: "/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
      poster_path: "/MoEKaPFHABtA1xKoOteirGaHl1.jpg",
      overview: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain."
    }
  ]
};

class ApiService {
  constructor() {
    this.cache = new Map();
  }

  async fetchWithFallback(url, fallbackData = []) {
    try {
      // Check cache first
      if (this.cache.has(url)) {
        return this.cache.get(url);
      }

      console.log('Fetching data from:', url);
      const response = await axios.get(url);
      
      if (response.data && response.data.results) {
        // Cache the results
        this.cache.set(url, response.data);
        return response.data;
      } else {
        throw new Error('No results in response');
      }
    } catch (error) {
      console.warn('API request failed, using fallback data:', error.message);
      return {
        results: fallbackData.length > 0 ? fallbackData : fallbackMovies.trending
      };
    }
  }

  // Get trending movies/TV shows
  async getTrending() {
    return this.fetchWithFallback(
      `/trending/all/week?api_key=${API_KEY}&language=en-US`,
      fallbackMovies.trending
    );
  }

  // Get movies by genre
  async getMoviesByGenre(genreId) {
    return this.fetchWithFallback(
      `/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=en-US`,
      fallbackMovies.trending
    );
  }

  // Get Netflix Originals
  async getNetflixOriginals() {
    return this.fetchWithFallback(
      `/discover/tv?api_key=${API_KEY}&with_networks=213&language=en-US`,
      fallbackMovies.trending
    );
  }

  // Get movies by category
  async getMoviesByCategory(category) {
    const endpoints = {
      trending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
      action: `/discover/movie?api_key=${API_KEY}&with_genres=28&language=en-US`,
      comedy: `/discover/movie?api_key=${API_KEY}&with_genres=35&language=en-US`,
      horror: `/discover/movie?api_key=${API_KEY}&with_genres=27&language=en-US`,
      romance: `/discover/movie?api_key=${API_KEY}&with_genres=10749&language=en-US`,
      documentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99&language=en-US`,
    };

    return this.fetchWithFallback(
      endpoints[category] || endpoints.trending,
      fallbackMovies.trending
    );
  }

  // Get movie trailer
  async getMovieTrailer(id) {
    try {
      const response = await axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
      return response.data;
    } catch (error) {
      console.warn('Failed to fetch trailer:', error);
      return { results: [] };
    }
  }
}

export default new ApiService();