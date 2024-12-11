'use client'
import React, { useState } from 'react';
import styles from '../css/CodPage.module.css'
import Link from 'next/link';
import axios from 'axios';  // Certifique-se de instalar axios com `npm install axios` ou `yarn add axios`
import { toast } from 'react-toastify';

const Ponto: React.FC = () => {
  const [codigoUsuario, setCodigoUsuario] = useState('');
  const [email, setEmail] = useState('');
  // const [responseMessage, setResponseMessage] = useState<string>('');

  // Função para lidar com a consulta
  const handleConsultarClick = async () => {
    try {
      const response = await axios.post('https://registro-de-ponto.onrender.com/user/consult', {
        email,  // Envia o email para a API
      });

      toast.info("Seu código de registro de ponto: " + response.data.codigo, {
        autoClose: 5000,
      });
    } catch (error) {
      console.error('Erro ao consultar usuário:', error);
      toast.error('Erro ao consultar usuário. Tente novamente.');
    }
  };


  const handlePonto = async () => {
    try {
      const entriesPoint = await axios.post('https://registro-de-ponto.onrender.com/user/cod', {
        codigoUsuario, 
      });

      const id_usuario = entriesPoint.data.id;
      console.log(id_usuario);
      
      const response = await axios.post('https://registro-de-ponto.onrender.com/entry/register', {
        id_usuario
      });

      console.log(response);
      
    } catch (error) {
      console.error('Erro ao consultar usuário:', error);
      toast.error('Erro ao consultar usuário. Tente novamente.');
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <h1 className={styles.title}>
          Ponto <span className={styles.highlight}>Ilumeo</span>
        </h1>
        <div className={styles.formGroup}>
          <input
            type="text"
            value={codigoUsuario}
            onChange={(e) => setCodigoUsuario(e.target.value)}
            className={styles.input}
            placeholder="Código do usuário"
          />
          <button onClick={handlePonto} className={styles.button}>Confirmar</button>
        </div>
        <Link href={"/"}>
          <p className={styles.footerLink}>Registrar funcionário</p>
        </Link>
      </div>

      <div className={styles.rightSection}>
        <h2 className={styles.subtitle}>Consultar meu código:</h2>
        <div className={styles.formGroup}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            placeholder="Digite seu e-mail..."
          />
          <button className={styles.buttonSecondary} onClick={handleConsultarClick}>
            Consultar
          </button>
        </div>

        <Link href={"/relogio-ponto"}>
          <p className={styles.footerLink}>Consultar meu relógio de pontos</p>
        </Link>
      </div>
    </div>
  );
};

export default Ponto;