/* eslint-disable no-unused-vars */
import React from 'react'
import { Appbar } from '../components/Appbar'
import { Balance } from '../components/Balance'
import { Users } from '../components/UserComponent'

export const Dashboard = () => {
  return (
    <div>
      <Appbar/>
      <Balance value={"10,000"}/>
      <Users/>
    </div>
  )
}

