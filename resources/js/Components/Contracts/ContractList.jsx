import React from 'react'
import {
  Box, Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useAtom } from 'jotai'
import { selectedContractAtom } from '@/State/contracts.store.js'
import { useMap } from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import { displayNumber } from '@/Helpers/number.helpers.js'
import { ArrowBigUp, Dumbbell, Milestone, Package, PersonStanding, Plane, TimerOff } from 'lucide-react'
import { formatDistanceToNow, parseISO } from 'date-fns'

const ContractList = ({ contracts }) => {
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
    <Box position="absolute" z={1} top={16} left={4} bottom={12} width="30%">
      <Card>
        <CardBody>
          <Tabs>
            <TabList>
              <Tab>Contracts</Tab>
              <Tab>Airport Info</Tab>
              <Tab>Weather</Tab>
            </TabList>
            <TabPanels>
              <TabPanel height="700px" overflowY="auto">
                <Box mt={2}>
                  {contracts?.map(contract => (
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
                          ))}
                        </Box>
                        <Box mt={2}>
                          <Flex justifyContent="space-between" alignItems="center" gap={2}>
                            <Button size="xs">Add To Dispatch</Button>
                            <Flex alignItems="center" gap={2}>
                              <TimerOff size={16}/>
                              <Text fontSize="md">{formatDistanceToNow(parseISO(contract.expires_at))}</Text>
                            </Flex>
                          </Flex>
                        </Box>
                      </CardBody>
                    </Card>
                  ))}
                </Box>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </Box>
  )
}

ContractList.propTypes = {
  contracts: PropTypes.array
  // filteredContracts: PropTypes.array
}

export default ContractList
