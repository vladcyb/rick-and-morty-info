import clsx from 'clsx'
import CloseButton from 'react-bootstrap/CloseButton'
import Form from 'react-bootstrap/Form'

import { genders, MapGenderToRussian } from '@app/shared/constants/Genders'
import { characterStatuses, MapCharacterStatusToRussian } from '@app/shared/constants/CharacterStatuses'

import { ResetButton } from './ResetButton'
import { AsideFilter } from './AsideFilter'

import './AsideFilters.scss'

interface IAsideFiltersProps {
  close: () => void;
  className?: string;
}

export const AsideFilters = ({ close, className }: IAsideFiltersProps) => (
  <Form className={clsx('aside-filters border-end py-3 py-md-5 px-3', className)}>
    <div className="aside-filters__header">
      <CloseButton
        className="aside-filters__close ms-auto d-block mb-3"
        onClick={close}
      />
    </div>
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
    <ResetButton />
  </Form>
)
