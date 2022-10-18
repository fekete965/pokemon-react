import PokemonCard from './PokemonCard'
import { useQuery } from '@tanstack/react-query'

import getPokemons from 'api/getPokemons'

import { ReferenceResourceResponse } from 'models/ReferenceResource'

export const Pokemons = () => {
  const { data, isLoading, error } = useQuery<ReferenceResourceResponse, Error, ReferenceResourceResponse>(
    ['pokemons'],
    () => getPokemons(),
  )

  if (!data && isLoading) {
    return <div className="m-4">Loading...</div>
  }

  if (error) {
    return <div className="m-4">Something went wrong: {error.message}</div>
  }

  if (!data) {
    return <div className="m-4">No data found</div>
  }

  return (
    <ul className="m-4 grid gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
      {data?.results.map(d => (
        <PokemonCard key={d.name} url={d.url} />
      ))}
    </ul>
  )
}

export default Pokemons
