import { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { Pokemon } from 'models/Pokemon'

import fetchPokemonByUrl from 'api/fetchPokemonByUrl'

import StarIcon from 'icons/StarIcon'
import StarIconSolid from 'icons/StarIconSolid'

import { useFavourites } from 'context/FavouritesContext'

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
  const { addToFavourites, isFavourite, removeFromFavourites } = useFavourites()
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

  const isFavouritePokemon = isFavourite(data.id)
  const handleAddFavourite = () => addToFavourites(data.id)

  const handleRemoveFavourite = () => removeFromFavourites(data.id)

  return (
    <div className="pokemon-card-link">
      <div className="flex">
        <h1 className="pokemon-card-title">{data.name}</h1>
        <div className="pokemon-card-icon-container">
          {isFavouritePokemon ? (
            <StarIconSolid onClick={handleRemoveFavourite} />
          ) : (
            <StarIcon onClick={handleAddFavourite} />
          )}
        </div>
      </div>
      <img className="w-full select-none" src={data.sprites.front_default} alt={data.name} />
      <Link className="button" to={`/pokemons/${data.id}`}>
        More info
      </Link>
    </div>
  )
}

export default PokemonCard
