import React from 'react'
import { Box, Card, CardBody } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import AirportSummary from '../Airport/AirportSummary'

const ContractFilters = ({ airport }) => {
  return (
    <Box position="absolute" z={1} top={16} right={4} width="25%">
      <Card>
        <CardBody>
          <AirportSummary airport={airport} />
        </CardBody>
      </Card>
    </Box>
  )
}

ContractFilters.propTypes = {
  airport: PropTypes.object
}

export default ContractFilters
