const Index = () => import('@/components/pages')
const MovieDetails = () => import('@/components/pages/movie-details')
const GenreMovies = () => import('@/components/pages/genre-movies');

export const routes = [
  {
    path: '/',
    redirect: '/cinema/'
  },
  {
    path: '/cinema/',
    name: 'page-index',
    component: Index,
  },
  {
    path: '/cinema/movie/:id',
    name: 'page-movie-details',
    component: MovieDetails,
  },
  {
    path: '/cinema/genre/:genre',
    name: 'page-genre-movies',
    component: GenreMovies,
  }
]
