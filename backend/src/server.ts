import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import router from './routes';


const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
const port = process.env.PORT || 4000;


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send({ error: err.message });
  });


app.use((err:Error, req: Request, res: Response, next:NextFunction) =>{
    res.header("Access-Control-Allow-Origin", "https://registro-de-ponto.onrender.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.listen(port, () => console.log("Servidor Online"));