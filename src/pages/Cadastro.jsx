'use client'
import "tailwindcss/tailwind.css";
import React, { useState } from 'react'
import InputText from "@/components/inputs/InputText";
import Button from '@mui/material/Button';
import axios from "axios";
import InputTextCadastro from "@/components/inputs/InputTestCadastro";

const Cadastro = () => {
    const [registerModel, setRegisterModel] = useState({
        login: '',
        nome: '',
        sobrenome: '',
        email: '',
        idade: '',
        senha: '',
        confirmarSenha: ''

    })

    const handleEmailChange = (event) => {
        setRegisterModel({ ...registerModel, email: event.target.value })
      }

    const handleLoginChange = (event) => {
        setRegisterModel({ ...registerModel, login: event.target.value })
    }

    const handleNomeChange = (event) => {
        setRegisterModel({ ...registerModel, nome: event.target.value })
    }

    const handleSobrenomeChange = (event) => {
        setRegisterModel({ ...registerModel, sobrenome: event.target.value })
    }

    const handleIdadeChange = (event) => {
        setRegisterModel({ ...registerModel, idade: event.target.value })
    }

    const handleSenhaChange = (event) => {
        setRegisterModel({ ...registerModel, senha: event.target.value })
    }

    const handleConfirmarSenhaChange = (event) => {
        setRegisterModel({ ...registerModel, confirmarSenha: event.target.value })
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post("https://localhost:7019/api/Auth/cadastro", registerModel)
            localStorage.setItem('user', JSON.stringify(response.data))

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-full h-screen flex justify-center items-start bg-slate-200'>
          <div className="flex flex-col shadow-3xl rounded-2xl bg-custom-3 mt-10">
            <h1 className="text-white font-bold text-3xl ml-36 mt-10">Cadastro</h1>
            <div className="flex flex-row mt-7 ml-36 mr-36">
              <div className="flex flex-col mr-4  w-[300px] ">
                <InputTextCadastro label='Login' type='text' placeholder='Digite o seu login' onChange={handleLoginChange}/>
                <InputTextCadastro label='E-mail' type='text' placeholder='Digite o seu e-mail' onChange={handleEmailChange}/>
                <InputTextCadastro label='Senha' type='password' placeholder='Digite a sua senha' onChange={handleSenhaChange}/>
                <InputTextCadastro label='Confirmar senha' type='password' placeholder='Digite a sua senha' onChange={handleConfirmarSenhaChange}/>
              </div>
              <div className="flex flex-col mr-4  w-[300px] ">
                <InputTextCadastro label='Nome' type='text' placeholder='Digite o seu nome' onChange={handleNomeChange}/>
                <InputTextCadastro label='Sobrenome' type='text' placeholder='Digite o seu sobrenome' onChange={handleSobrenomeChange}/>
                <InputTextCadastro label='Idade' type='text' placeholder='Digite a sua idade' onChange={handleIdadeChange}/>
              </div>
            </div>
            <div className="flex justify-center items-center mb-10 mt-10 ">
              <Button variant="contained" className="mt-7 font-bold bg-custom-9 h-[45px] hover:bg-green-500" onClick={handleSubmit}>Cadastrar</Button>
            </div>
          </div>
        </div>
      )      
}

export default Cadastro
