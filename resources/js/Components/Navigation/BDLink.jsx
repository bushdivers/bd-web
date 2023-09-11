import React from 'react'
import { Link } from '@inertiajs/react'
import PropTypes from 'prop-types'
import { Link as ChakraLink } from '@chakra-ui/react'

const BdLink = ({ location, children }) => {
  return (
    <ChakraLink color="orange.500" as={Link} href={location}>{children}</ChakraLink>
  )
}

BdLink.propTypes = {
  location: PropTypes.string,
  children: PropTypes.element
}

export default BdLink
