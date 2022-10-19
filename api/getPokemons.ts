import { ReferenceResourceResponse } from 'models/ReferenceResource'

export const getPokemons = (): Promise<ReferenceResourceResponse> => {
  return fetch('https://pokeapi.co/api/v2/pokemon').then(resp => resp.json())
}

export default getPokemons
