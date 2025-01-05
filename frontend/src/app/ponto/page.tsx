'use client'
import React, { useState } from 'react';
import styles from '../css/CodPage.module.css'
import Link from 'next/link';
import axios from 'axios';  // Certifique-se de instalar axios com `npm install axios` ou `yarn add axios`
import { toast } from 'react-toastify';
import { format, formatDate } from 'date-fns';

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
      // Verifica o código do usuário
      const entriesPoint = await axios.post('https://registro-de-ponto.onrender.com/user/cod', {
        codigo: codigoUsuario, 
      });
  
      // Captura do código do mesmo para fazer o registro
      const id = entriesPoint.data.id;
      const now = new Date();
      const localDate = new Date(now.getTime() + -3 * 60 * 60 * 1000);
      const data_inicio = localDate.toISOString().replace("Z", "-03:00");
      const data_fim = localDate.toISOString().replace("Z", "-03:00");

      console.log(now.toISOString());

      // Vamos chamar a API de verificação de ponto, e com ela vamos fazer o controle se vai ser registrado uma entrada ou saída
      const verifyPoint = await axios.post('https://registro-de-ponto.onrender.com/verify/point', {
        id,
        data_inicio,
        data_fim,
      });

      const teste = verifyPoint;
      console.log(teste);
  
      // // Registro do ponto do usuário
      // const response = await axios.post('https://registro-de-ponto.onrender.com/entry/register', {
      //   id,
      // });
  
    } catch (error) {
      toast.error('Erro ao consultar usuário. Tente novamente.');
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <h1 className={styles.title}>
          Ponto <span className={styles.highlight}>Company</span>
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