import React from 'react'
import { Button, Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Link, usePage } from '@inertiajs/react'

const NavMenu = () => {
  const { auth } = usePage().props
  return (
    <Flex alignItems="center" gap={4}>
      <Button variant="ghost">Live Flights</Button>
      <Button variant="ghost">Dispatch</Button>
      <Menu>
        <MenuButton variant="ghost" as={Button} rightIcon={<ChevronDownIcon/>}>
          Bush Divers HQ
        </MenuButton>
        <MenuList>
          <MenuItem>Download</MenuItem>
          <MenuItem>Create a Copy</MenuItem>
          <MenuItem>Mark as Draft</MenuItem>
          <MenuItem>Delete</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem>
        </MenuList>
      </Menu>
      <Button variant="ghost"><Link href={`/contracts/${auth?.user?.current_airport_id}`}>Contracts</Link></Button>
      <Menu>
        <MenuButton variant="ghost" as={Button} rightIcon={<ChevronDownIcon/>}>
          Crew Area
        </MenuButton>
        <MenuList>
          <MenuItem>Download</MenuItem>
          <MenuItem>Create a Copy</MenuItem>
          <MenuItem>Mark as Draft</MenuItem>
          <MenuItem>Delete</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}

export default NavMenu
