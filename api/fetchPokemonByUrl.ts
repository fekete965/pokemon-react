import { Pokemon } from 'models/Pokemon'

import { request } from './requests'

export const fetchPokemonByUrl = (url: string) => {
  return request<Pokemon>(url)
}

export default fetchPokemonByUrl
