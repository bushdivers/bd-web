import React from 'react'
import { Box, Card, CardBody, Flex, Heading, Tag } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const ContractFilters = ({ airport }) => {
  return (
    <Box position="absolute" z={1} top={16} right={4} width="25%">
      <Card>
        <CardBody>
          <Flex alignItems="center" gap={3}>
            <Tag borderRadius="full">{airport.size}</Tag>
            <Heading size="md">{airport.identifier} - {airport.name}</Heading>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  )
}

ContractFilters.propTypes = {
  airport: PropTypes.object
}

export default ContractFilters
