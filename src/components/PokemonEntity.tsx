import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { Pokemon } from 'models/Pokemon'

import { getPokemonBy } from 'api/index'

const PokemonEntity = () => {
  const { pokemonId } = useParams()

  const { data, isLoading, error, mutate } = useMutation<Pokemon, Error, string>([pokemonId], getPokemonBy)

  useEffect(() => {
    if (pokemonId) {
      mutate(pokemonId)
    }
  }, [pokemonId])

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
    <div className="grid grid-cols-3 mx-4 border-2 rounded-lg cursor-pointe">
      <div className="grid grid-cols-2 border-r-2">
        <img className="m-0 w-full max-w-[15rem] col-span-1" src={data.sprites.front_default} alt={data.name} />
        <img className="m-0 w-full max-w-[15rem] col-span-1" src={data.sprites.back_default} alt={data.name} />
      </div>
      <div className="grid grid-cols-2 col-span-2">
        <div className="border-r-2 px-4 py-2">
          <label className="underline text-sm md:text-base font-bold capitalize text-center">Basic Info:</label>
          <ul>
            <li>
              <label className="text-sm md:text-base font-bold capitalize text-center">Name:</label> {data.name}
            </li>
            <li>
              <label className="text-sm md:text-base font-bold capitalize text-center">Height:</label> {data.height}
            </li>
            <li>
              <label className="text-sm md:text-base font-bold capitalize text-center">Width:</label> {data.weight}
            </li>
            <li>
              <label className="text-sm md:text-base font-bold capitalize text-center">Base Experience:</label>{' '}
              {data.base_experience}
            </li>
            <li>
              <label className="text-sm md:text-base font-bold capitalize text-center">Abilities:</label>{' '}
              {data.abilities.map(_ => _.ability.name).join(', ')}
            </li>
          </ul>
        </div>
        <div className="px-4 py-2">
          <label className="underline text-sm md:text-base font-bold capitalize text-center">Stats:</label>
          <ul>
            {data.stats.map(s => (
              <li key={s.stat.name}>
                <label className="text-sm md:text-base font-bold capitalize text-center">{s.stat.name}:</label>{' '}
                {s.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PokemonEntity
