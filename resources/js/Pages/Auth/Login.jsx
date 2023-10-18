import React from 'react'
import {
  Box,
  Button,
  Card,
  CardBody, Flex,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Text
} from '@chakra-ui/react'
import { useForm } from '@inertiajs/react'
import AuthLayout from '../../Layouts/AuthLayout'
import CustomFormError from '@/Components/Forms/CustomFormError.jsx'
import BDLink from '@/Components/Navigation/BDLink.jsx'
import BDInput from '@/Components/Forms/BDInput.jsx'

function Login () {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: ''
  })

  const submit = (e) => {
    e.preventDefault()
    post('/login')
  }
  return (
    <Box>
      <Card>
        <CardBody>
          <Heading>Login</Heading>
          <Box mt="4">
            <form onSubmit={submit}>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <BDInput placeholder="john@doe.com" inputType="text" inputValue={data.email}
                           onChangeFunc={e => setData('email', e.target.value)}/>
                  <CustomFormError>{errors?.email}</CustomFormError>
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <BDInput placeholder="password" inputType="password" inputValue={data.password}
                           onChangeFunc={e => setData('password', e.target.value)}/>
                  <CustomFormError>{errors?.password}</CustomFormError>
                </FormControl>
                <Flex justifyContent="right"><BDLink location="/"><Text>Forgotten password?</Text></BDLink></Flex>
                <Button type="submit" isLoading={processing} loadingText="Submitting">Login</Button>
                <BDLink location="/register"><Text>New to Bush Divers?</Text></BDLink>
              </Stack>
            </form>
          </Box>
        </CardBody>
      </Card>
    </Box>
  )
}

Login.layout = page => <AuthLayout title="Login">{page}</AuthLayout>

export default Login
