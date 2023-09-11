import React, { useEffect } from 'react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Flex,
  Spacer,
  useDisclosure
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { capitalised } from '@/Helpers/string.helpers.js'

const BdAlert = ({ alertType, description, isVisible = false, isClosable = true }) => {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure({ defaultIsOpen: true })

  useEffect(() => {
    onOpen()
  }, [isVisible])

  return isOpen && (
    <Alert status={alertType}>
      <Flex justifyContent="space-between" alignItems="center">
        <AlertIcon/>
        <AlertTitle>{capitalised(alertType)}!</AlertTitle>
        <AlertDescription>
          {description}
        </AlertDescription>
        <Spacer/>
        {isClosable && (
          <Box>
            <CloseButton
              onClick={onClose}
            />
          </Box>
        )}
      </Flex>
    </Alert>
  )
}

BdAlert.propTypes = {
  alertType: PropTypes.string,
  description: PropTypes.string,
  isVisible: PropTypes.bool,
  isClosable: PropTypes.bool
}

export default BdAlert
