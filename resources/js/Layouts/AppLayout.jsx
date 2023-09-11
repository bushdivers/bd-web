import React from 'react'
import { Box, Container, Heading } from '@chakra-ui/react'
import NavBar from '@/Components/Navigation/NavBar.jsx'
import PropTypes from 'prop-types'
import { Head } from '@inertiajs/react'

const AppLayout = ({ children, title, heading = null, isFullSize = false }) => {
  return (
    <Box>
      <Head title={`${title} - Bush Divers`}/>
      <NavBar/>
      {!isFullSize
        ? (
          <Container maxW="container.xl">
            <Box position="relative" mt="16">
              <Heading>{heading && heading}</Heading>
            </Box>
            <Box mt="4">{children}</Box>
          </Container>
          )
        : (
          <Box mt={12}>{children}</Box>
          )
      }

    </Box>
  )
}

AppLayout.propTypes = {
  children: PropTypes.element,
  heading: PropTypes.string,
  title: PropTypes.string,
  isFullSize: PropTypes.bool
}

export default AppLayout
