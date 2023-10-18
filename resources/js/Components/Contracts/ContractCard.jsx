import React from 'react'
import { displayNumber } from '@/Helpers/number.helpers.js'
import { Dumbbell, Milestone, Package, PersonStanding } from 'lucide-react'
import PropTypes from 'prop-types'
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Text
} from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { selectedContractAtom } from '@/State/contracts.store.js'
import { useMap } from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import ContractLeg from './ContractLeg'
import ContractFooter from './ContractFooter'

const ContractCard = ({ contract }) => {
  const [selectedContract, setSelectedContract] = useAtom(selectedContractAtom)
  const { contractMap } = useMap()
  const onSelect = (c) => {
    setSelectedContract(c)
    const coordinates = []
    c.contract_legs.forEach((leg) => {
      coordinates.push([leg.arr_airport.lon, leg.arr_airport.lat])
    })
    coordinates.push([selectedContract.origin_airport.lon, selectedContract.origin_airport.lat])

    const bounds = new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])

    for (const coord of coordinates) {
      bounds.extend(coord)
    }

    contractMap.fitBounds(bounds, { padding: { top: 200, bottom: 200, left: 700, right: 100 } })
  }
  return (
        <Card onClick={() => onSelect(contract)} my={2} key={contract.id}
                backgroundColor={contract.id === selectedContract?.id ? 'orange.100' : ''}>
            <CardBody>
            <Flex justifyContent="space-between" alignItems="center">
                <Heading size="md">{displayNumber(contract.contract_value, false, true)}</Heading>
                <Box>
                <Flex alignItems="center" gap={2}>
                    <Dumbbell size={16}/>
                    <Text fontSize="md">{displayNumber(contract.total_payload, false)} lbs</Text>
                </Flex>
                </Box>
                <Box>
                <Flex alignItems="center" gap={2}>
                    <PersonStanding size={16}/>
                    <Text fontSize="md">{contract.total_pax}</Text>
                </Flex>
                </Box>
                <Box>
                <Flex alignItems="center" gap={2}>
                    <Milestone size={16}/>
                    <Text fontSize="md">{displayNumber(contract.total_distance, false)} nm</Text>
                </Flex>
                </Box>
                <Box>
                <Flex alignItems="center" gap={2}>
                    <Package size={16}/>
                    <Text fontSize="md">{contract.legs}</Text>
                </Flex>
                </Box>
            </Flex>
            <Box mt={3}>
                {contract.contract_legs.map(leg => (
                    <ContractLeg key={leg.id} leg={leg} />
                ))}
            </Box>
            <ContractFooter contract={contract} buttonText="Add to Dispatch" buttonAction={() => window.alert('hello')} />
            </CardBody>
        </Card>
  )
}

ContractCard.propTypes = {
  contract: PropTypes.object
}

export default ContractCard
