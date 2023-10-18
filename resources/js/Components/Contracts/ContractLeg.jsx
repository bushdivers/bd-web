import React from 'react'
import {
  Box,
  Divider,
  Flex,
  Text
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { ArrowBigUp, Plane } from 'lucide-react'
import { displayNumber } from '@/Helpers/number.helpers.js'

const ContractLeg = ({ leg }) => {
  return (
        <Box mt={2} key={leg.id}>
            <Flex justifyContent="space-between">
            <Box>
                <Flex alignItems="center" gap={2}>
                {leg.dep_airport_id}
                <Plane/>
                {leg.arr_airport_id}
                </Flex>
                <Box mt={2}>
                <Flex alignItems="center" gap={2}>
                    <Flex>
                    <Text fontSize="sm">{displayNumber(leg.distance, false)} nm</Text>
                    </Flex>
                    <Flex alignItems="center" gap={2}>
                    <ArrowBigUp size={16} style={{ transform: `rotate(${leg.heading}deg)` }}/>
                    <Text fontSize="sm">{leg.heading}&deg;</Text>
                    </Flex>
                </Flex>
                </Box>
            </Box>
            {leg.cargo_type === 1
              ? (
                <Flex alignItems="center" gap={2}>
                    <Text fontSize="sm">{displayNumber(leg.cargo_qty, false)} lbs</Text>
                    <Text fontSize="sm">{leg.cargo_desc}</Text>
                </Flex>
                )
              : (
                <Flex alignItems="center" gap={2}>
                    <Text fontSize="sm">{displayNumber(leg.cargo_qty, false)}</Text>
                    <Text fontSize="sm">{leg.cargo_desc}</Text>
                </Flex>
                )
            }
            </Flex>
            <Divider my={1}/>
        </Box>
  )
}

ContractLeg.propTypes = {
  leg: PropTypes.object
}

export default ContractLeg
