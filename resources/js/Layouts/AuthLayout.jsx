import React from 'react'
import { Head, usePage } from '@inertiajs/react'
import { Box, Flex, Image } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import BDAlert from '@/Components/BDAlert.jsx'

export default function AuthLayout ({ children, title }) {
  const { flash } = usePage().props

  return (
    <>
      <Head title={`${title} - Bush Divers`}/>
      <Flex justifyContent="center" alignItems="center">
        <Box mt="12" width={{ lg: '30%', sm: '90%' }}>
          <Flex justifyContent="center">
            <Box my={4}
                 boxSize="150px"
                 objectFit="cover">
              <Image src="https://res.cloudinary.com/dji0yvkef/image/upload/v1628691598/BDLogo.png" alt="Bush Divers"/>
            </Box>
          </Flex>
          <Box my={2}>
            {flash.success && (
              <BDAlert alertType="success" description={flash.success} isVisible={true} isClosable={false}/>
            )}
            {flash.error && (
              <BDAlert alertType="error" description={flash.error} isVisible={true} isClosable={false}/>
            )}
          </Box>
          {children}
        </Box>
      </Flex>
    </>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string
}
