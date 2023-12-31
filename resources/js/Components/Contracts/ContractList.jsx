import React from 'react'
import {
  Box,
  Card,
  CardBody,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import ContractCard from './ContractCard'
import AirportInfo from '../Airport/AirportInfo'
import AirportWeather from '../Airport/AirportWeather'

const ContractList = ({ contracts, airport, metar }) => {
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
                    <ContractCard key={contract.id} contract={contract} />
                  ))}
                </Box>
              </TabPanel>
              <TabPanel>
                <AirportInfo airport={airport} />
              </TabPanel>
              <TabPanel>
                <AirportWeather metar={metar} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </Box>
  )
}

ContractList.propTypes = {
  contracts: PropTypes.array,
  // filteredContracts: PropTypes.array
  airport: PropTypes.object,
  metar: PropTypes.object
}

export default ContractList
