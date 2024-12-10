import { Request,Response } from "express";
import ConsultUserService from "../services/ConsultUserService";

class ConsultUserController{
    async handle(req: Request, res: Response){
        const { email } = req.body;
        const verifyEmail = new ConsultUserService;
        const email_returned = await verifyEmail.execute({email})

        return res.json(email_returned);

    }
}

export default ConsultUserController;