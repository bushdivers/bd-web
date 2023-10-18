import React from 'react'
import { Flex, Tag, Heading } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const AirportSummary = ({ airport }) => {
  return (
        <Flex alignItems="center" gap={3}>
            <Tag borderRadius="full">{airport.size}</Tag>
            <Heading size="md">{airport.identifier} - {airport.name}</Heading>
        </Flex>
  )
}

AirportSummary.propTypes = {
  airport: PropTypes.object
}

export default AirportSummary
