import { Request,Response } from "express";
import RegisterExitService from "../services/RegisterExitService";

class RegisterExitController{
    async handle(req: Request, res: Response): Promise<Response>{
        const { id } = req.body;
        const registerExit = new RegisterExitService;
        const exit = await registerExit.execute({id})

        return res.json(exit);

    }
}

export default RegisterExitController;