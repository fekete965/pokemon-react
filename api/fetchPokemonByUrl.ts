import { Pokemon } from 'models/Pokemon'

export const fetchPokemonByUrl = (url: string): Promise<Pokemon> => fetch(url).then(resp => resp.json())

export default fetchPokemonByUrl
