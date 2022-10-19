import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { Pokemon } from 'models/Pokemon'

import { getPokemonBy } from 'api/index'

import FavouriteMarker from './FavouriteMarker'

const PokemonEntity = () => {
  const { pokemonId } = useParams()

  const { data, isLoading, error, mutate } = useMutation<Pokemon, Error, string>([pokemonId], getPokemonBy)

  useEffect(() => {
    if (pokemonId) {
      mutate(pokemonId)
    }
  }, [pokemonId])

  if (!data && isLoading) {
    return <div className="loading-container">💿 Loading...</div>
  }

  if (error) {
    return <div className="error-container">❗ Something went wrong: {error.message}</div>
  }

  if (!data) {
    return <div className="no-data-container">😞 No data found</div>
  }

  return (
    <div className="pokemon-entity-container">
      <div className="pokemon-entity-image-container relative">
        <img className="pokemon-entity-image" src={data.sprites.front_default} alt={data.name} />
        <img className="pokemon-entity-image" src={data.sprites.back_default} alt={data.name} />
        <div className="absolute right-1 top-1">
          <FavouriteMarker id={data.id} />
        </div>
      </div>
      <div className="pokemon-entity-info-container">
        <div className="pokemon-entity-basic-info">
          <label className="label underline">Basic Info:</label>
          <ul>
            <li>
              <label className="label">Name:</label> {data.name}
            </li>
            <li>
              <label className="label">Height:</label> {data.height}
            </li>
            <li>
              <label className="label">Width:</label> {data.weight}
            </li>
            <li>
              <label className="label">Base Experience:</label> {data.base_experience}
            </li>
            <li>
              <label className="label">Abilities:</label> {data.abilities.map(_ => _.ability.name).join(', ')}
            </li>
          </ul>
        </div>
        <div className="px-4 py-2">
          <label className="label underline">Stats:</label>
          <ul>
            {data.stats.map(s => (
              <li key={s.stat.name}>
                <label className="label">{s.stat.name}:</label> {s.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PokemonEntity
