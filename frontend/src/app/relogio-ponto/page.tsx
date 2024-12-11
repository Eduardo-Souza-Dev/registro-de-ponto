import styles from '../css/RelogioPonto.module.css';

interface Props {
  dados: {
    data: string;
    horaEntrada: string;
    horaSaida: string;
    totalHoras: string;
  }[];
}

const RelogioPonto: React.FC<Props> = ({ dados }) => {
  return (
    <div className={styles.container}>
      <h1>Relógio de ponto</h1>
      <h2>Horas de hoje: 6h 13m</h2>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>Hora de entrada</th>
            <th>Hora de saída</th>
            <th>Total de Horas</th>
          </tr>
        </thead>
        <tbody>
          {/* {dados.map((item) => (
            <tr key={item.data}>
              <td>{item.data} {item.horaEntrada}</td>
              <td>{item.data} {item.horaSaida}</td>
              <td>{item.totalHoras}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default RelogioPonto;