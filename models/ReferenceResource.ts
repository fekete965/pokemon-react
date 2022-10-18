import { EntityResponse } from './EntityResponse'

export type ReferenceResource = {
  name: string
  url: string
}

export type ReferenceResourceResponse = EntityResponse<ReferenceResource>
