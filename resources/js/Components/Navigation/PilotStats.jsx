import React from 'react'
import { Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const PilotStats = ({ pilot }) => {
  return (
    <Box>${pilot?.cash}</Box>
  )
}

PilotStats.propTypes = {
  pilot: PropTypes.object
}

export default PilotStats
