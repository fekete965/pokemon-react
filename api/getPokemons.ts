import { ReferenceResourceResponse } from 'models/ReferenceResource'

import { request } from './requests'

export const getPokemons = (offset: number, limit: number) => {
  return request<ReferenceResourceResponse>(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
}

export default getPokemons
