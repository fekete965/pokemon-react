import { createBrowserRouter } from 'react-router-dom'

import Pokemon from './components/PokemonEntity'

import NotFound from './routes/notFound'
import Pokemons from './routes/pokemons'
import Root from './routes/root'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: 'pokemons',
    element: <Pokemons />,
    children: [
      {
        path: ':pokemonId',
        element: <Pokemon />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
