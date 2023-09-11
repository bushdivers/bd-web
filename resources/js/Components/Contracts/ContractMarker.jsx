import React from 'react'
import PropTypes from 'prop-types'
import { Tag } from '@chakra-ui/react'

const ContractMarker = ({ identifier, color = 'orange' }) => {
  return (
    <Tag colorScheme={color} fontSize="lg">{identifier}</Tag>
  )
}

ContractMarker.propTypes = {
  identifier: PropTypes.string,
  color: PropTypes.string
}

export default ContractMarker
