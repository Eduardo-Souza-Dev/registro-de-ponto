import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import 'express-async-erros';
import router from './routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);


app.use((err: Error,req:Request, res: Response) =>{
   
    if(err instanceof Error){
        return res.status(400).json({
            err: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    })

});


app.use((err:Error, req: Request, res: Response, next:NextFunction) =>{
    res.header("Access-Control-Allow-Origin", "http://localhost:3333");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.listen(3333, () => console.log("Servidor Online"));