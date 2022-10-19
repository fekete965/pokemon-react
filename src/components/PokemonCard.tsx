import { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { Pokemon } from 'models/Pokemon'

import fetchPokemonByUrl from 'api/fetchPokemonByUrl'

const PlaceholderPokemonCard = () => (
  <div className="animate-pulse flex flex-col w-full min-h-[10rem] max-h-[14rem] p-4 border-2 rounded-lg">
    <div className="h-2 mx-auto w-full max-w-[10rem] bg-gray-400 rounded"></div>
    <div className="mt-2 mx-auto rounded-lg bg-gray-400 h-full w-full max-w-[10rem] max-h-[10rem]"></div>
  </div>
)

type Props = {
  url: string
}

export const PokemonCard: FC<Props> = ({ url }) => {
  const { data, isLoading, mutate, error } = useMutation<Pokemon, Error, string>(fetchPokemonByUrl)

  useEffect(() => {
    mutate(url)
  }, [url])

  if (!data && isLoading) {
    return <PlaceholderPokemonCard />
  }

  if (error) {
    return <div className="pokemon-card-container">Something went wrong: {error.message}</div>
  }

  if (!data) {
    return <div className="pokemon-card-container">No data found :(</div>
  }

  return (
    <Link className="pokemon-card-link" to={`/pokemons/${data.id}`}>
      <h1 className="pokemon-card-title">{data.name}</h1>
      <img className="w-full" src={data.sprites.front_default} alt={data.name} />
    </Link>
  )
}

export default PokemonCard
