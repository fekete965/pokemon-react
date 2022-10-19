import { Pokemon } from 'models/Pokemon'

import { request } from './requests'

export const getPokemonBy = (nameOrId: string) => {
  return request<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`)
}

export default getPokemonBy
