import { ReferenceResource } from './ReferenceResource'
import { VersionDetail } from './VersionDetail'

export type HeldItem = {
  item: ReferenceResource
  version_details: VersionDetail[]
}
