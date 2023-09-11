import React from 'react'
import { Input } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const BdInput = ({ placeholder, inputType, inputValue, onChangeFunc }) => {
  return (
    <Input focusBorderColor="orange.500" placeholder={placeholder} type={inputType}
           value={inputValue}
           onChange={onChangeFunc}/>
  )
}

BdInput.propTypes = {
  placeholder: PropTypes.string,
  inputType: PropTypes.string,
  inputValue: PropTypes.string,
  onChangeFunc: PropTypes.func
}

export default BdInput
