import React from 'react'
import { Box, Button, Flex, Image, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import PropTypes from 'prop-types'

const PilotMenu = ({ pilot, logout }) => {
  return (
    <Menu>
      <MenuButton variant="ghost" as={Button} rightIcon={<ChevronDownIcon/>}>
        <Flex gap={2}><Image w={50} src={pilot?.rank.image}/>{pilot?.name}</Flex>
      </MenuButton>
      <MenuList>
        <Box p={2}>
          <Flex alignItems="center" gap={4}>
            <Image w={50} src={pilot?.rank.image}/>
            <Box>
              <Text>{pilot?.name}</Text>
              <Text fontSize="xs">{pilot?.rank?.name}</Text>
            </Box>
          </Flex>
        </Box>
        <MenuDivider/>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Bank</MenuItem>
        <MenuItem>Logbook</MenuItem>
        <MenuItem>Aircraft</MenuItem>
        <MenuDivider/>
        <MenuItem onClick={() => logout()}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  )
}

PilotMenu.propTypes = {
  pilot: PropTypes.object,
  logout: PropTypes.func
}

export default PilotMenu
