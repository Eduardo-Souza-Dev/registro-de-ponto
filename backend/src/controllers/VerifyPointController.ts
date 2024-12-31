import { Request,Response } from "express";
import VerifyPointServices from "../services/VerifyPointServices";


class VerifyPointController{
    async handle(req: Request, res: Response): Promise<any>{
        const { id, data_inicio, data_fim } = req.body;

        const verifyPoint = new VerifyPointServices;
        const verify = await verifyPoint.execute({id, data_inicio, data_fim})

        res.json(verify);
    }
    
    
}

export default VerifyPointController;