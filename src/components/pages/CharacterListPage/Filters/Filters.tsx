import Form from 'react-bootstrap/Form'

import { GenderFilter } from './GenderFilter'
import { StatusFilter } from './StatusFilter'


export const Filters = () => (
  <Form>
    <StatusFilter />
    <GenderFilter />
  </Form>
)
