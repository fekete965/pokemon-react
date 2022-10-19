import { ReferenceResourceResponse } from 'models/ReferenceResource'

export const getPokemons = (offset: number, limit: number): Promise<ReferenceResourceResponse> => {
  return fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`).then(resp => resp.json())
}

export default getPokemons
