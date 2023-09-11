import React from 'react'
import AppLayout from '@/Layouts/AppLayout.jsx'

const Dashboard = () => {
  return (
        <div>
            The Dash
        </div>
  )
}

Dashboard.layout = page => <AppLayout heading="Dashboard" title="Dashboard">{page}</AppLayout>

export default Dashboard
