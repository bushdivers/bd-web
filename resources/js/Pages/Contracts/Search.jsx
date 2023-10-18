import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import AppLayout from '@/Layouts/AppLayout.jsx'
import Map, { Layer, MapProvider, Marker, Source } from 'react-map-gl'
import { mapboxToken, parseMapStyle, transformRequest } from '@/Helpers/map.helpers.js'
import ContractMarker from '@/Components/Contracts/ContractMarker.jsx'
import ContractFilters from '@/Components/Contracts/ContractFilters.jsx'
import ContractList from '@/Components/Contracts/ContractList.jsx'
import { useAtomValue } from 'jotai'
import { selectedContractAtom } from '@/State/contracts.store.js'

const Search = ({ airport, contracts }) => {
  const selectedContract = useAtomValue(selectedContractAtom)
  // const [filteredContracts, setFilteredContracts] = useState(contracts)
  const [routeData, setRouteData] = useState()

  useEffect(() => {
    if (selectedContract) {
      const data = []
      selectedContract.contract_legs.forEach((leg) => {
        const depLngLat = [leg.dep_airport.lon, leg.dep_airport.lat]
        const arrLngLat = [leg.arr_airport.lon, leg.arr_airport.lat]
        data.push({ type: 'Feature', geometry: { type: 'LineString', coordinates: [depLngLat, arrLngLat] } })
      })

      const geojson = {
        type: 'FeatureCollection',
        features: data
      }
      setRouteData(geojson)
    }
  }, [selectedContract])

  return (
    <>
      <MapProvider>
        <Map
          id="contractMap"
          mapboxAccessToken={mapboxToken}
          initialViewState={{
            longitude: airport.lon,
            latitude: airport.lat,
            zoom: 8
          }}
          style={{ height: '95.5vh' }}
          mapStyle={parseMapStyle('dark')}
          transformRequest={transformRequest}
        >
          <Marker longitude={airport.lon} latitude={airport.lat}>
            <ContractMarker color="gray" identifier={airport.identifier}/>
          </Marker>
          {contracts.map(contract => (
            contract.contract_legs.map(leg => (
              <Marker key={leg.id} longitude={leg.arr_airport.lon} latitude={leg.arr_airport.lat}>
                <ContractMarker identifier={leg.arr_airport.identifier}/>
              </Marker>
            ))
          ))}
          <Source id="routeData" type="geojson" data={routeData}>
            <Layer
              id="lineLayer"
              type="line"
              source="my-data"
              layout={{
                'line-join': 'round',
                'line-cap': 'round'
              }}
              paint={{
                'line-color': '#F97316',
                'line-width': 1
              }}
            />
          </Source>
        </Map>
        <ContractList contracts={contracts} filteredContracts={contracts} airport={airport} />
        <ContractFilters airport={airport}/>
      </MapProvider>
    </>
  )
}

Search.propTypes = {
  airport: PropTypes.object,
  contracts: PropTypes.array
}

Search.layout = page => <AppLayout title="Contracts" isFullSize>{page}</AppLayout>
export default Search
