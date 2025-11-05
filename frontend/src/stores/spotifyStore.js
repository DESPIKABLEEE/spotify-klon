import { makeObservable, observable, action } from 'mobx';
import spotifyAPI from '../services/spotifyAPI';

class SpotifyStore {
  trendingSongs = [];
  popularArtists = [];
  popularAlbums = [];
  loading = false;
  error = null;

  constructor() {
    makeObservable(this, {
      trendingSongs: observable,
      popularArtists: observable,
      popularAlbums: observable,
      loading: observable,
      error: observable,
      fetchTrendingData: action,
      setLoading: action,
      setError: action
    });
  }

  setLoading(loading) {
    this.loading = loading;
  }

  setError(error) {
    this.error = error;
  }

  async fetchTrendingData() {
    try {
      this.setLoading(true);
      this.setError(null);

      const [tracksData, artistsData, albumsData] = await Promise.all([
        spotifyAPI.getPopularTracks(20),
        spotifyAPI.getPopularArtists(20),
        spotifyAPI.getNewReleases(20)
      ]);

      this.trendingSongs = tracksData.tracks?.items || [];
      this.popularArtists = artistsData.artists?.items || [];
      this.popularAlbums = albumsData.albums?.items || [];

    } catch (err) {
      console.error('Error fetching trending data:', err);
      this.setError('Failed to load trending data. Please check your Spotify API credentials.');
    } finally {
      this.setLoading(false);
    }
  }
}

export default new SpotifyStore();