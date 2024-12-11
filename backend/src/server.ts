import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import router from './routes';

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configuração CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://registro-de-ponto-six.vercel.app'], // Adicione todas as origens permitidas
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

// Rotas
app.use(router);

// Middleware de tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ error: err.message });
});

// Inicialização do servidor
const port = process.env.PORT || 4000;

app.listen(port, () => console.log("Servidor Online"));