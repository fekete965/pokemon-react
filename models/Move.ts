import { ReferenceResource } from './ReferenceResource'
import { VersionGroupDetail } from './VersionGroupDetail'

export type Move = {
  move: ReferenceResource
  version_group_details: VersionGroupDetail[]
}
