import React from 'react'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { TimerOff } from 'lucide-react'
import {
  Box,
  Button,
  Flex,
  Text
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

const ContractFooter = ({ contract, buttonText, buttonAction }) => {
  return (
        <Box mt={3}>
            <Flex justifyContent="space-between" alignItems="center" gap={2}>
            <Button onClick={buttonAction} size="xs">{buttonText}</Button>
            <Flex alignItems="center" gap={2}>
                <TimerOff size={16}/>
                <Text fontSize="md">{formatDistanceToNow(parseISO(contract.expires_at))}</Text>
            </Flex>
            </Flex>
        </Box>
  )
}

ContractFooter.propTypes = {
  contract: PropTypes.object,
  buttonText: PropTypes.string,
  buttonAction: PropTypes.func
}

export default ContractFooter
