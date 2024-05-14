import "tailwindcss/tailwind.css";

import React, { useEffect, useState } from 'react';
import MiniDrawer from '@/components/drawer/MiniDrawer';
import { useRouter } from 'next/router';
import axios from 'axios'; // Importe o axios

const Teste = () => {
  const router = useRouter()
  const  id  = router.query.Recorrigir
  const [teste, setTeste] = useState(null)
  const letras = ['A', 'B', 'C', 'D', 'E']

  useEffect(() => {
    const getTeste = async () => {
      try {
        if (id) { 
          const response = await axios.get(`https://localhost:7019/api/Teste/${id}`);
          if (response.status === 200) {
            setTeste(response.data)
          }
        }
      } catch (error) {
        console.error('Erro ao obter assuntos:', error)
      }
    }
    getTeste()
  }, [id]) 

  if (!teste) {
    return <div>Carregando...</div>;
  }

  return (
    <div className='w-full h-screen bg-slate-300'>
      <MiniDrawer />
      <div className="flex justify-center items-center mt-7 flex-col">
        <div className="bg-white w-[50%] rounded-2xl">
          {teste.questoes.map((questao, index) => (
            <div key={questao.id} className="ml-7 mt-7">
              <h3>{index + 1}. {questao.enunciado}</h3>
              <input type="text" className=" text-sky-600 cursor-pointer underline bg-white" value='Conferir resposta' disabled/>
              <ul>
                {questao.alternativas.map((alternativa, idx) => {
                  const respostaUsuario = teste.respostaUsuarios.find(resposta => resposta.alternativaId === alternativa.id);
                  const isRespostaCorreta = respostaUsuario !== undefined && respostaUsuario.acertou
                  const isChecked = respostaUsuario !== undefined;
                  return (
                    <li key={alternativa.id} className="mt-1">
                      {isRespostaCorreta ? (
                        <div className="border-2 border-green-500">
                          <input 
                            type="checkbox" 
                            checked={isChecked}
                            name={`questao-${index}`} 
                            value={letras[idx]} 
                            id={alternativa.id} 
                          />
                         <label>{letras[idx]}) {alternativa.texto}</label>
                        </div>
                      ) : (
                        <div className={` ${alternativa.correta ? 'border-green-500 border-2 ' : ''}`}>
                           <input 
                            type="checkbox" 
                            checked={isChecked}
                            name={`questao-${index}`} 
                            value={letras[idx]} 
                            id={alternativa.id} 
                          />
                          <label>{letras[idx]}) {alternativa.texto}</label>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-3 font-bold text-2xl">
        <h1>Nota: {teste.pontuacaoUsuario}</h1>
      </div>
    </div>
  )  
}

export default Teste;
