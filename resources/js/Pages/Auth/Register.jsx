import React from 'react'
import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack, Text
} from '@chakra-ui/react'
import { useForm } from '@inertiajs/react'
import AuthLayout from '../../Layouts/AuthLayout'
import CustomFormError from '@/Components/Forms/CustomFormError.jsx'
import BDLink from '@/Components/Navigation/BDLink.jsx'
import BDInput from '@/Components/Forms/BDInput.jsx'

function Register () {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: ''
  })
  // const {errors} = usePage().props
  const submit = (e) => {
    e.preventDefault()
    post('/register')
  }
  return (
    <Box>
      {errors.length}
      <Card>
        <CardBody>
          <Heading>Register</Heading>
          <Box mt="4">
            <form onSubmit={submit}>
              <Stack spacing={4}>
                <FormControl mt="4">
                  <FormLabel>Name</FormLabel>
                  <BDInput placeholder="John Doe" inputType="text" inputValue={data.name}
                           onChangeFunc={e => setData('name', e.target.value)}/>
                  <CustomFormError>{errors?.name}</CustomFormError>
                </FormControl>
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
                <Button type="submit" isLoading={processing} loadingText="Submitting">Register</Button>
                <BDLink location="/login"><Text>Already a pilot?</Text></BDLink>
              </Stack>
            </form>
          </Box>
        </CardBody>
      </Card>
    </Box>
  )
}

Register.layout = page => <AuthLayout title="Register">{page}</AuthLayout>

export default Register
