import React from 'react'
import { Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const CustomFormError = ({ children }) => {
  return (
    <Text color="red.500" fontSize="sm">{children}</Text>
  )
}

CustomFormError.propTypes = {
  children: PropTypes.string
}

export default CustomFormError
