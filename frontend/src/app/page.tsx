import styles from '../app/css/Login.module.css';
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa";
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');

  const handleRegister = async (e:any) => {
    e.preventDefault();

    try {
      const response = await axios.post('/user/register', {
        email,
        password,
      });

      // Supondo que a API retorne um código de funcionário
      setEmployeeCode(response.data.employeeCode);
      alert('Funcionário registrado com sucesso!');
    } catch (error) {
      console.error('Erro ao registrar funcionário:', error);
      alert('Erro ao registrar funcionário. Tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <h1 className={styles.title}>Registro de Funcionário</h1>
        <form className={styles.form} onSubmit={handleRegister}>
          {/* Campo de e-mail */}
          <div className={styles.inputContainer}>
            <input
              type="email"
              placeholder="E-mail"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Campo de senha */}
          <div className={styles.inputContainer}>
            <input
              type="password"
              placeholder="Senha"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Botão de registro */}
          <div className={styles.btnContainer}>
            <button type="submit" className={styles.registerButton}>Registrar</button>
          </div>
        </form>

        {/* Código do funcionário */}
        {employeeCode && (
          <div className={styles.codeContainer}>
            <p className={styles.codeText}>Código do funcionário:</p>
            <button className={styles.codeButton}>{employeeCode}</button>
          </div>
        )}
      </div>

      {/* Botão de navegação para a página de ponto */}
      <div className={styles.rightSide}>
        <Link href={"/ponto"}>
          <button className={styles.arrowButton}>
            <span className={styles.arrow}><FaArrowRight /></span>
          </button>
        </Link>
      </div>
    </div>
  );
}
