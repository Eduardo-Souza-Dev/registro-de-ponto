// import Image from "next/image";
// import styles from "./page.module.css";
import styles from '../app/css/Login.module.css'
import Link from 'next/link'
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
     <div className={styles.container}>
      <div className={styles.leftSide}>
        <h1 className={styles.title}>Registro de Funcionário</h1>
        <form className={styles.form}>
          <div className={styles.inputContainer}>
            <input type="email" placeholder="E-mail" className={styles.input} />
          </div>

          <div className={styles.inputContainer}>
            <input type="senha" placeholder="Senha" className={styles.input} />
          </div>

          <div className={styles.btnContainer}>
        <button className={styles.registerButton}>Registrar</button>
        </div>

        </form>

        

        <div className={styles.codeContainer}>
          <p className={styles.codeText}>Código do funcionário:</p>
          <button className={styles.codeButton}>CX3U</button>
        </div>
      </div>
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