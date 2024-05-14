import "tailwindcss/tailwind.css";
import MenuAppBar from '@/components/headers/MenuAppBar'
import React, { useEffect, useState } from 'react'
import Span from "@/components/headers/Span";
import axios from "axios";
import MiniDrawer from "@/components/drawer/MiniDrawer";
import { useRouter } from "next/navigation";
import Button from '@mui/material/Button';

const TelaUsuario = () => {
  const router = useRouter()
  const [imageUser, setImageUser] = useState(null)
  const [user, setUser] = useState({
    login: "",
    nome: "",
    sobrenome: '',
    nomeCompleto: "",
    email: "",
    senha: "",
    idade: 0,
    imagemUrl: null,
    testes: [],
    id: ''
  })
  const [testes, setTestes] = useState([])


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  
    const getTestes = async () => {
      if (storedUser != null) {
        try {
          const response = await axios.get(`https://localhost:7019/api/Auth/${storedUser.email}`);
          if (response.status == 200) {
            setTestes(response.data.testes);
            setImageUser(`https://localhost:7019/api/Auth/ObterImagem/${storedUser.imagemUrl}`)
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    getTestes()

  }, [])
  
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            await axios.put(`https://localhost:7019/api/Auth/upload/${user.email}`, formData);
            console.log('Imagem enviada com sucesso');
        } catch (error) {
            console.error('Erro ao enviar imagem:', error);
        }
    } else {
        console.error('Nenhum arquivo selecionado.');
    }
  }

  const corrigirTeste = (id) => {
    router.push(`/teste/${id}`)
  }
  
  return (
    <div className="w-full h-screen  bg-slate-200">
      <MiniDrawer />
      <div className="flex flex-row align-center justify-center items-center mt-7">
      <div className="w-[33%] h-[550px] mr-7 flex flex-col items-center  shadow-sm shadow-gray-600 bg-custom-3 rounded-3xl">
        <h1 className="text-3xl text-white font-bold mb-7 mt-7">Informações</h1>
        {user ? (
          <div className="flex items-center flex-col">
            <img className="w-[150px] rounded-3xl mb-7 " src={imageUser}/>
            <div className="flex flex-col ">
              <span className="text-1xl text-white font-bold mb-7 text-left">Nome: {user.nomeCompleto}</span>
              <span className="text-1xl text-white font-bold mb-7 text-left">E-mail: {user.email}</span>
              <span className="text-1xl text-white font-bold mb-7 text-left">Idade: {user.idade} anos</span>
              <label htmlFor="fileInput" className="rounded-3xl bg-custom-9 hover:bg-green-500 font-bold cursor-pointer text-white text-center" variant="contained">
                Mudar foto
              </label>
              <input
                  type="file"
                  id="fileInput"
                  className="hidden "
                  onChange={handleFileInputChange}
              />
            </div>
          </div>
        ) : (
          <div>
            <Span>Usuário não logado</Span>
          </div>
        )}

      </div>
      <div className="w-[33%] h-[550px] ml-7 flex flex-col items-center shadow-sm shadow-gray-600 bg-custom-3 rounded-3xl overflow-y-auto">
          <h1 className="text-3xl text-white font-bold mb-7 mt-7">Minhas Avaliações</h1>
          <ul>
            {testes.map(teste => (
              <li key={teste.id} className="bg-custom-5 rounded-2xl hover:bg-custom-6 mb-3 cursor-pointer">
                <span className="text-1xl text-white font-bold mb-7" onClick={() => corrigirTeste(teste.id)}>{teste.nome}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TelaUsuario
