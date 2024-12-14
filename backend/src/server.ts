import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import router from './routes';

const app = express();
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Configuração CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

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