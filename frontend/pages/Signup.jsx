/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { ButtomWarning } from '../components/ButtonWarning'
import axios from 'axios'

export const Signup = () => {
  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [userName,setUserName]=useState("");
  const [password,setPassword]=useState("");
  const handlefirstNameChange=(e)=>{
    setFirstName(e.target.value)
  }
  const handleLastNameChange=(e)=>{
    setLastName(e.target.value)
  }
  const handleUserNameChange=(e)=>{
    setUserName(e.target.value)
  }
  const handlePasswordChange=(e)=>{
    setPassword(e.target.value)
  }
  return (
   
    <div className='bg-slate-300 h-screen flex justify-center'>
     password is {password}
    <div className='flex flex-col justify-center'>
      <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
        <Heading label={"Sign up"}/>
        <SubHeading label={"Enter your information to create an account"}/>
        <InputBox onChange={handlefirstNameChange} placeholder="John" label={"First Name"}/>
        <InputBox onChange={handleLastNameChange} placeholder="Doe" label={"Last Name"}/>
        <InputBox onChange={handleUserNameChange} placeholder="zaid@gmail.com" label={"Email"}/>
        <InputBox onChange={handlePasswordChange} placeholder="123456" label={"Password"}/>
        <div className="pt-4">
            <Button onClick={async()=>{
            const response =  await  axios.post("http://localhost:3000/api/v1/user/signup",{
                userName,
                firstName,
                lastName,
                password
              });
              localStorage.setItem("token",response.data.token)
            }} label={"Sign up"}/>
        </div>
        <ButtomWarning label={"Alreaddy have an account"} buttonText={"Sign in"} to={"/signin"}/>
      </div>
    </div>
    </div>
  )
}

