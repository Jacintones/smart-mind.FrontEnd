import "tailwindcss/tailwind.css";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Span from "@/components/headers/Span";
import { useRouter } from "next/router";
import MenuAppBar from "@/components/headers/MenuAppBar";
import MiniDrawer from "@/components/drawer/MiniDrawer";

const Materia = () => {
  const router = useRouter();
  const id = router.query.Materia;
  const [assuntos, setAssuntos] = useState([]);

  useEffect(() => {
    const getAssuntos = async () => {
      try {
        if (id) { // Verifica se id está definido
          const response = await axios.get(`https://localhost:7019/api/Materia/${id}`);
          if (response.status === 200) {
            setAssuntos(response.data.assuntos);
          }
        }
      } catch (error) {
        console.error('Erro ao obter assuntos:', error);
      }
    };

    getAssuntos();
  }, [id]); // Executa o efeito apenas quando id mudar


  const handleAssuntoClick = (id) => {
    router.push(`/questoes/${id}`)
  }

  return (
    <div className='w-full h-screen  bg-slate-200'>
      <MiniDrawer />
      <h1 className="text-center text-3xl font-bold text-black mt-7">Assuntos</h1>
      <div className="flex ml-28  flex-row  flex-wrap bg-slate-200">
        {assuntos.map(assunto => (
          <div key={assunto.id} className=" container-materia-inicial hover:bg-custom-5
          cursor-pointer w-[220px] h-[60px] mt-7
          bg-custom-3 shadow-2xl rounded-full
          flex flex-col items-center mr-7
          justify-center" onClick={() => handleAssuntoClick(assunto.id)}>
            <h2 className="text-white font-bold ml-7 mr-7">{assunto.nome}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Materia;
