import { createBrowserRouter } from 'react-router-dom'

import Home from './screens/Home'
import NotFound from './screens/NotFound'
import Pokemon from './screens/Pokemon'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'pokemons/:pokemonId',
    element: <Pokemon />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
