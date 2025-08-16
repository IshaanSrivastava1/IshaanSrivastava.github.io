const genreMap = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  music: 10402,
  mystery: 9648,
  romance: 10749,
  sciencefiction: 878,
  "sci-fi": 878,
  tvmovie: 10770,
  thriller: 53,
  war: 10752,
  western: 37
};

async function findMovies() {
  const input = document.getElementById('genre-input');
  const genreName = input.value.trim().toLowerCase();
  const key = genreName.replace(/\s+/g, '');
  const genreId = genreMap[key];
  const list = document.getElementById('movies-list');
  list.innerHTML = '';

  if (!genreId) {
    list.innerHTML = '<li>Unknown genre. Try action, comedy, drama, etc.</li>';
    return;
  }

  const apiKey = window.TMDB_API_KEY || 'YOUR_TMDB_API_KEY';
  if (!apiKey || apiKey === 'YOUR_TMDB_API_KEY') {
    list.innerHTML = '<li>Please set TMDB_API_KEY.</li>';
    return;
  }

  try {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const movies = data.results.slice(0, 10);
    if (movies.length === 0) {
      list.innerHTML = '<li>No movies found.</li>';
    } else {
      movies.forEach(movie => {
        const li = document.createElement('li');
        li.textContent = movie.title;
        list.appendChild(li);
      });
    }
  } catch (error) {
    list.innerHTML = `<li>Error fetching movies: ${error.message}</li>`;
  }
}

window.findMovies = findMovies;
