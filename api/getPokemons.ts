import { ReferenceResourceResponse } from 'models/ReferenceResource'

export const getPokemons = (nameOrId?: string): Promise<ReferenceResourceResponse> => {
  return fetch(`https://pokeapi.co/api/v2/pokemon${nameOrId ? '/' + nameOrId : ''}`).then(resp => resp.json())
}

export default getPokemons
