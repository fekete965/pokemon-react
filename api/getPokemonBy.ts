import { Pokemon } from 'models/Pokemon'

export const getPokemonBy = (nameOrId: string): Promise<Pokemon> => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`).then(resp => resp.json())
}

export default getPokemonBy
