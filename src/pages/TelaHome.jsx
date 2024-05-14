'use client'
import "tailwindcss/tailwind.css";
import MenuAppBar from '@/components/headers/MenuAppBar'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import MiniDrawer from "@/components/drawer/MiniDrawer";

const TelaHome = () => {
  const url = 'https://localhost:7019/api/Categoria/CategoriaComMateria'
  const [categorias, setCategorias] = useState([])
  const router = useRouter()

  const getCategorias = async () => {
    try {
      const response = await axios.get(url)
      if (response.status == 200) {
        setCategorias(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleMateriaClick = (id) => {
    // Navegando para uma rota dinâmica com um parâmetro
    router.push(`/materias/${id}`)
  }

  useEffect(() => {
    getCategorias()
    localStorage.getItem('user')
  }, [])

  return (
    <div className='bg-slate-200	'>
      <MiniDrawer />
      <div className=" mx-auto mt-7 flex flex-col w-max bg-transparent	 ">
        {categorias.map(categoria => (
          <div key={categoria.id} className=" mb-8 rounded-3xl  w-max">
            <h1 className=" text-2xl font-bold ml-8 mb-4  text-black">{categoria.nome}</h1>
            <div className=" flex flex-wrap ml-8">
              {categoria.materias.map(materia => (
                <div key={materia.id} className="container-materia-inicial hover:bg-gray-300 
                cursor-pointer w-64 h-48 mb-4 mr-8 
                bg-gray-100 rounded-lg flex 
                flex-col items-center 
                justify-center shadow-xl	" 
                onClick={() => handleMateriaClick(materia.id)}>
                  <img src={materia.imagemUrl} alt={materia.nome} className="w-auto h-20 mb-2" />
                  <h2 className="text-black font-bold">{materia.nome}</h2>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
    </div>
  )
  
}

export default TelaHome
