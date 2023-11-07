import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'

const AirportWeather = ({ metar }) => {
  return (
        <>
        {metar
          ? (
          <Box>
            {metar.raw_text}
          </Box>
            )
          : (
          <Box>No Metar Found</Box>
            )
      }
        </>
  )
}

AirportWeather.propTypes = {
  metar: PropTypes.object
}

export default AirportWeather
