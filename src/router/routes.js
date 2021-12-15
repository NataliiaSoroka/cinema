const Index = () => import('@/components/pages')
const MovieDetails = () => import('@/components/pages/movie-details')
const GenreMovies = () => import('@/components/pages/genre-movies');

export const routes = [
  {
    path: '/',
    name: 'page-index',
    component: Index,
  },
  {
    path: '/movie/:id',
    name: 'page-movie-details',
    component: MovieDetails,
  },
  {
    path: '/genre/:genre',
    name: 'page-genre-movies',
    component: GenreMovies,
  }
]
