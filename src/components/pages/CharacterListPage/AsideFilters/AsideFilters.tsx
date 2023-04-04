import Form from 'react-bootstrap/Form'

import { AsideFilter } from '@sharedComponents/AsideFilter/AsideFilter'
import { genders, MapGenderToRussian } from '@app/shared/constants/Genders'
import { characterStatuses, MapCharacterStatusToRussian } from '@app/shared/constants/CharacterStatuses'


export const AsideFilters = () => (
  <Form>
    <AsideFilter
      items={characterStatuses}
      filterKey="status"
      label="Статус"
      getItemLabel={(item) => MapCharacterStatusToRussian[item]}
    />
    <AsideFilter
      items={genders}
      filterKey="gender"
      label="Пол"
      getItemLabel={(item) => MapGenderToRussian[item]}
    />
  </Form>
)
