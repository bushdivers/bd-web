import React from 'react'
import { Box, Flex, Image } from '@chakra-ui/react'
import { usePage, router } from '@inertiajs/react'
import NavMenu from '@/Components/Navigation/NavMenu.jsx'
import PilotMenu from '@/Components/Navigation/PilotMenu.jsx'
import PilotStats from '@/Components/Navigation/PilotStats.jsx'

const NavBar = () => {
  const { auth } = usePage().props

  function logout () {
    router.post('/logout')
  }

  return (
    <Box zIndex={99} bgColor="white" position="fixed" top="0" right="0" left="0" p="2">
      <Flex justifyContent="space-between">
        <Flex gap={4} alignItems="center">
          <Box
            boxSize="40px"
          >
            <Image src="https://res.cloudinary.com/dji0yvkef/image/upload/v1628691598/BDLogo.png" alt="Dan Abramov"/>
          </Box>
        </Flex>
        <NavMenu/>
        <Flex gap={4} alignItems="center">
          <PilotStats pilot={auth?.user}/>
          <PilotMenu pilot={auth?.user} logout={logout}/>
        </Flex>
      </Flex>
    </Box>
  )
}

export default NavBar
