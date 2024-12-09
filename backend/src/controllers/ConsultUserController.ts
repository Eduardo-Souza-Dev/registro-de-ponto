import { Request,Response } from "express";
import ConsultUserService from "../services/ConsultUserService";

class ConsultUserController{
    async handle(req: Request, res: Response){
        const { email } = req.body;
        const createUser = new ConsultUserService;
        const register = await createUser.execute({email})

        return res.json(register);

    }
}

export default ConsultUserController;