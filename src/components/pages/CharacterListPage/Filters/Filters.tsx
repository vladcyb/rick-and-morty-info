import Form from 'react-bootstrap/Form'

import { genders, MapGenderToRussian } from '@app/shared/constants/Genders'
import { characterStatuses, MapCharacterStatusToRussian } from '@app/shared/constants/CharacterStatuses'
import { Filter } from '@sharedComponents/Filter'


export const Filters = () => (
  <Form>
    <Filter
      items={characterStatuses}
      filterKey="status"
      label="Статус"
      getItemLabel={(item) => MapCharacterStatusToRussian[item]}
    />
    <Filter
      items={genders}
      filterKey="gender"
      label="Пол"
      getItemLabel={(item) => MapGenderToRussian[item]}
    />
  </Form>
)
