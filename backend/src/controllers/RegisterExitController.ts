import { Request,Response } from "express";
import RegisterExitService from "../services/RegisterExitService";

class RegisterExitController{
    async handle(req: Request, res: Response){
        const { id_turno } = req.body;
        const registerExit = new RegisterExitService;
        const exit = await registerExit.execute({id_turno})

        return res.json(exit);

    }
}

export default RegisterExitController;