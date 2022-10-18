import { ReferenceResource } from './ReferenceResource'

export type PokemonAbility = {
  is_hidden: boolean
  slot: number
  ability: ReferenceResource
}
