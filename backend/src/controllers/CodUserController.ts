import { Request,Response } from "express";
import CodUserService from "../services/CodUserService";

class CodUserController{
    async handle(req: Request, res: Response){
        const { codigo } = req.body;
        const verifyCod = new CodUserService;
        const cod = await verifyCod.execute({codigo})

        return res.json(cod);

    }
}

export default CodUserController;