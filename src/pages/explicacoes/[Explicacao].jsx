import "tailwindcss/tailwind.css";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Span from "@/components/headers/Span";
import { useRouter } from "next/router";
import MenuAppBar from "@/components/headers/MenuAppBar";
import MiniDrawer from "@/components/drawer/MiniDrawer";

const Explicacao = () => {
  const router = useRouter();
  const id = router.query.Explicacao;

  useEffect(() => {
    const getAssuntos = async () => {
      try {
        if (id) { // Verifica se id está definido
          const response = await axios.get(`https://localhost:7019/api/Questao/${id}`);
          if (response.status === 200) {
          }
        }
      } catch (error) {
        console.error('Erro ao obter assuntos:', error);
      }
    };

    getAssuntos();
  }, [id]); 

  return (
    <div className='w-full h-screen  bg-slate-200'>
      <MiniDrawer />
    </div>
  );
}

export default Explicacao;
