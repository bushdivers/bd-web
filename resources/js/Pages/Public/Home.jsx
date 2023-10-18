// import Layout from './Layout'
import React from 'react'
import { Head, Link } from '@inertiajs/react'
import { Button } from '@chakra-ui/react'

export default function Home () {
  return (
        // <Layout>
        <>
            <Head title="Bushdivers"/>
            <h1>Welcome</h1>
            <p>Hello, welcome to your first Inertia app!</p>
            <Link href="/login"><Button>Login</Button></Link>
            <Link href="/register"><Button>Register</Button></Link>
        </>
        // </Layout>
  )
}
