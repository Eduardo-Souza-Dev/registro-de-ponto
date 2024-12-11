import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import router from './routes';


const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
const port = process.env.PORT || 4000;

app.options('*', cors());

app.use(cors({
  origin: 'https://registro-de-ponto-six.vercel.app', // Origem permitida
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send({ error: err.message });
  });


app.listen(port, () => console.log("Servidor Online"));