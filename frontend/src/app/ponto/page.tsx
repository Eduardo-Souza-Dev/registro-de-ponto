'use client'
import React, { useState } from 'react';
import styles from '../css/CodPage.module.css'
import Link from 'next/link';

const Ponto: React.FC = () => {
  const [codigoUsuario, setCodigoUsuario] = useState('');
  const [email, setEmail] = useState('');

//   const handleCodigoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCodigoUsuario(e.target.value);
//   };

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//   };

//   const handleConfirmarClick = () => {
//     // Aqui você pode adicionar a lógica para validar ou enviar o código do usuário
//     console.log('Código do usuário:', codigoUsuario);
//   };

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
        <button className={styles.button}>Confirmar</button>
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
        <button className={styles.buttonSecondary}>Confirmar</button>
      </div>
      <Link href={"/relogio-ponto"}>
      <p className={styles.footerLink}>Consultar meu relógio de pontos</p>
      </Link>
    </div>
  </div>
  );
};

export default Ponto;