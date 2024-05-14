import "tailwindcss/tailwind.css";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Span from "@/components/headers/Span";
import { useRouter } from "next/router";
import MenuAppBar from "@/components/headers/MenuAppBar";
import MiniDrawer from "@/components/drawer/MiniDrawer";

const MeusTestes = () => {
  const [testes, setTestes] = useState([]);
  const [user, setUser] = useState()

  const getTestes = async () => {
    if (user != null) {
      try {
        const response = await axios.get(`https://localhost:7019/api/Auth/${user.email}`);
        if (response.status == 200) {
          setTestes(response.data.testes);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  getTestes()

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);

  }, []); // Executa o efeito apenas quando id mudar


  return (
    <div className='w-full h-screen  bg-slate-200'>
      <MiniDrawer />
    </div>
  );
}

export default MeusTestes;
