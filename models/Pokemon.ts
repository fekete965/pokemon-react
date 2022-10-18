import { GameIndex } from './GameIndex'
import { HeldItem } from './HeldItem'
import { Move } from './Move'
import { PPastType } from './PPastType'
import { PType } from './PType'
import { PokemonAbility } from './PokemonAbility'
import { ReferenceResource } from './ReferenceResource'
import { Sprites } from './Sprites'
import { Stat } from './Stat'

export type Pokemon = {
  id: number
  name: string
  base_experience: number
  height: number
  is_default: true
  order: number
  weight: number
  abilities: PokemonAbility[]
  forms: ReferenceResource[]
  game_indices: GameIndex[]
  held_items: HeldItem[]
  location_area_encounters: string
  moves: Move[]
  species: ReferenceResource
  sprites: Sprites
  stats: Stat[]
  types: PType[]
  past_types: PPastType[]
}
