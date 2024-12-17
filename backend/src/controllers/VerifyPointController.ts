import { Request,Response } from "express";
import VerifyPointServices from "../services/VerifyPointServices";


class VerifyPointController{
    async handle(req: Request, res: Response){
        const { id_turno } = req.body;

        const verifyPoint = new VerifyPointServices;
        const verify = await verifyPoint.execute({id_turno})

        res.json(verify);
    }
    
    
}