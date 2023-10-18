import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Tag,
  Flex,
  Link,
  Heading
} from '@chakra-ui/react'
import AirportSummary from '../Airport/AirportSummary'
import { displayNumber } from '../../Helpers/number.helpers'
import { renderRunwayText } from '../../Helpers/airport.helpers'

const AirportInfo = ({ airport }) => {
  return (
        <Box>
            {airport.is_hub && <Flex justifyContent="space-between"><Box>{displayNumber(airport.altitude)}ft</Box><Tag>Hub</Tag></Flex>}
            <Flex mt={4} justifyContent="space-between" alignItems="center">
            <AirportSummary airport={airport} />
            <Link color="orange.500" target="_blank" href={`https://skyvector.com/airport/${airport.identifier}`}>More info</Link>
            </Flex>
            <Box mt={3}>
            Lat/Lon: {airport.lat} {airport.lon}
            </Box>
            <Heading mt={4} size="sm">Runway Info</Heading>
            <Box>{renderRunwayText(airport.longest_runway_surface)} {airport.longest_runway_length}ft x {airport.longest_runway_width}ft</Box>
        </Box>
  )
}

AirportInfo.propTypes = {
  airport: PropTypes.object
}

export default AirportInfo
