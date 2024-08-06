/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Appbar } from '../components/Appbar'
import { Balance } from '../components/Balance'
import { Users } from '../components/UserComponent'

export const Dashboard = () => {
  // const [filter,setFilter]=useState("");
  // const handlefilterChange=(e)=>{
  //   setFilter(e.target.value);
  // }
  return (
    <div>
      <Appbar/>
      <Balance value={"10,000"}/>
      <Users />
    </div>
  )
}

