import Image from "next/image";
// import styles from "./page.module.css";
import styles from '../app/css/Login.module.css'

export default function Home() {
  return (
     <div className={styles.container}>
      <div className={styles.leftSide}>
        <h1 className={styles.title}>Registro de Funcionário</h1>
        <form className={styles.form}>
          <input type="email" placeholder="E-mail" className={styles.input} />
          <input type="password" placeholder="Senha" className={styles.input} />
        </form>
        <div className={styles.codeContainer}>
          <p className={styles.codeText}>Código do funcionário:</p>
          <button className={styles.codeButton}>CX3U</button>
        </div>
      </div>
      <div className={styles.rightSide}>
        <button className={styles.arrowButton}>
          <span className={styles.arrow}>&rarr;</span>
        </button>
      </div>
    </div>
  );
}
