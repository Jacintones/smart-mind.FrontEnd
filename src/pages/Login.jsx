'use client'
import "tailwindcss/tailwind.css";
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import InputText from '@/components/inputs/InputText'
import Button from '@mui/material/Button';

const Login = () => {
  const [loading, setLoading] = useState(false)
  const url = 'https://localhost:7019/api/Auth/login'
  const router = useRouter()
 
  const [loginData, setLoginData] = useState({
    email: '',
    senha: ''
  })

  const handleCadastro = () => {
    router.push('/Cadastro')
  }

  const handleLogin = async () => {
    setLoading(true)
    try {
      const response = await axios.post(url, loginData)
      if (response.status == 200) {
        try {
          const userResponse = await axios.get(`https://localhost:7019/api/Auth/${loginData.email}`)
          if (userResponse.status == 200) {
            console.log(userResponse.data)
            localStorage.setItem('user', JSON.stringify(userResponse.data))
          }
        } catch (error) {
          console.log(error)
        }
        try {
          localStorage.setItem('token', response.data)
          router.push('/TelaHome')
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  const handleEmailChange = (event) => {
    setLoginData({ ...loginData, email: event.target.value })
  }

  const handleSenhaChange = (event) => {
    setLoginData({ ...loginData, senha: event.target.value })
  }

  return (
    <div className='w-full h-screen flex justify-center items-center bg-gray-200	'>
      <div className='w-[33%] h-[500px] ml-4 flex flex-col items-center justify-center shadow-2xl rounded-1xl bg-custom-3'>
        <h1 className='text-center text-3xl font-bold text-white'>Não tem uma conta?</h1>
        <h1 className='text-center text-3xl font-bold text-white'>Cadastre agora</h1>
        <Button 
          className="mt-7 w-[250px] max-w-full rounded-3xl bg-custom-9 hover:bg-green-500 font-bold" 
          variant="contained" 
          onClick={handleCadastro}>
          Cadastro
        </Button>
      </div>
      <div className='w-[33%] h-[500px] mr-4 flex flex-col shadow-2xl	 rounded-1xl bg-custom-4'>
          <h1 className='text-center text-3xl font-bold text-white mt-8'>Login</h1>
          <div className='w-[70%] mt-6 m-auto h-[280px] flex flex-col justify-around '>
            <InputText label='E-mail' type='text' placeholder='Digite o seu e-mail' onChange={handleEmailChange}/>
            <InputText label="Senha" placeholder="Digite a sua Senha" type="password" onChange={handleSenhaChange}/>
            <Button className="relative top-14 rounded-3xl bg-custom-11 hover:bg-blue-900 font-bold" 
            variant="contained" 
            onClick={handleLogin}>Login</Button>
          </div>
        </div>

      </div>
  )
  
}

export default Login
