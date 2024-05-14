'use client'
import "tailwindcss/tailwind.css"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import axios from 'axios';
import MenuAppBar from "@/components/headers/MenuAppBar";
import Button from '@mui/material/Button';
import MiniDrawer from "@/components/drawer/MiniDrawer";

const FazerTeste = () => {
  const router = useRouter()
  const id = router.query.FazerTeste
  const [nome, setNome] = useState("")
  const [questoes, setQuestoes] = useState([])
  const [nota, setNota] = useState(0);
  const [user, setUser] = useState()
  const [respostasAluno, setRespostasAluno] = useState([])
  const letras = ['A', 'B', 'C', 'D', 'E']

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser)

    if(storedUser == null){
      router.push('/Login')
    }

    const getQuestoes = async () => {
      try {
        if (id) {
          const response = await axios.get(`https://localhost:7019/api/Assunto/${id}`);
          if (response.status === 200) {
            const data = response.data;
            setQuestoes(data.questoes);
            setNome(data.nome)
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    getQuestoes();

  }, [id]);

  const handleSelecionarResposta = (alternativaId, alternativaSelecionada, correta) => {
    setRespostasAluno(prevState => [
      ...prevState,
      { alternativaId, alternativaSelecionada, correta }
    ])
  }
  

  const handleTeste = async () => {
    let notaAluno = 0;
  
    respostasAluno.forEach(resposta => {
      if (resposta.correta) {
        notaAluno++
      }
    })
  
    const quantidadeQuestoes = questoes.length;
    const notaFinal = (notaAluno / quantidadeQuestoes) * 10;
    
    try {
      const response = await axios.post('https://localhost:7019/api/Teste', {
        nome: `Avaliação ${nome}`,
        dataDaRealizacao: new Date().toISOString(),
        pontuacao: 10,
        pontuacaoUsuario: notaFinal,
        usuarioId: user.id,
        questoesId: questoes.map(questao => questao.id),
        respostaUsuarios: respostasAluno.map(resposta => ({
          usuarioId: user.id, 
          alternativaId: resposta.alternativaId,
          acertou: resposta.correta
        })) 
      })

      if (response.status == 201) {
        router.push('/User')
      }

    } catch (error) {
      console.log(error);
    }
    
  }
  

  return (
    <div className='w-full h-screen bg-slate-300'>
      <MiniDrawer />
      <div className="flex justify-center items-center mt-7 flex-col shadow-3xl bg-slate-300">
        <div className="bg-white w-[50%] rounded-2xl shadow-3xl border-2 ">
          {questoes.map((questao, index) => (
            <div key={questao.id} className="ml-7 mt-7">
              <h3>{index + 1}. {questao.enunciado}</h3>
              {questao && (
                <img className="items-center flex justify-center" src={questao.imagemUrl} alt="" />
              )}
              <ul>
                {questao.alternativas.map((alternativa, idx) => (
                  <li key={alternativa.id} className="mt-1">
                    <input 
                      type="radio" 
                      name={`questao-${index}`} 
                      value={letras[idx]} 
                      id={alternativa.id} 
                      onChange={() => handleSelecionarResposta(alternativa.id, alternativa.texto, alternativa.correta)} // Chamada da função para atualizar a resposta do aluno
                    />
                    <label >{letras[idx]}) {alternativa.texto}</label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Button onClick={handleTeste} variant="contained" className="mt-7 font-bold mb-7">Enviar</Button>
      </div>
        
    </div>
  )
}

export default FazerTeste;
