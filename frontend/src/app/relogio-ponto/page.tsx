import styles from '../css/RelogioPonto.module.css';
import Link from 'next/link';

const RelogioPonto: React.FC = () => {

    const entries = [
        "03/11/23",
        "04/11/23",
        "05/11/23",
        "06/11/23",
        "09/11/23",
        "22/11/23",
        "24/11/23",
        "25/12/23",
        "25/12/23",
      ];

  return (
    <div className={styles.container}>
    <header className={styles.header}>
      <h1>Relógio de ponto</h1>
      <Link href={"/"}>
         <h3>Tela inicial</h3>
      </Link>
      <div className={styles.userInfo}>
        <span>#CX3U</span>
        <p>Usuário: Eduardo</p>
      </div>
    </header>

    <div className={styles.main}>
      <div className={styles.table}>
        <h2 className={styles.title}>Hora de entrada</h2>
        <div className={styles.list}>
          <p className={styles.subtitle}>Dias anteriores</p>
          {entries.map((date, index) => (
            <div className={styles.listItem} key={index}>
              <span>{date}</span>
              <span>7h 30m</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.table}>
        <h2 className={styles.title}>Hora de saída</h2>
        <div className={styles.list}>
          <p className={styles.subtitle}>Dias anteriores</p>
          {entries.map((date, index) => (
            <div className={styles.listItem} key={index}>
              <span>{date}</span>
              <span>7h 30m</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.table}>
        <h2 className={styles.title}>Total de Horas</h2>
        <div className={styles.list}>
          <p className={styles.subtitle}>Dias anteriores</p>
          {entries.map((date, index) => (
            <div className={styles.listItem} key={index}>
              <span>{date}</span>
              <span>7h</span>
            </div>
          ))}
        </div>
      </div>

      <aside className={styles.aside}>
        <h2 className={styles.time}>6h 13m</h2>
        <p>Horas de hoje</p>
      </aside>
    </div>
  </div>
  );
};

export default RelogioPonto;