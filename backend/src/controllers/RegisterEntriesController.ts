import { Request,Response } from "express";
import RegisterEntriesServices from "../services/RegisterEntriesServices";

class RegisterEntriesController{
    async handle(req: Request, res: Response){
        const { codigo } = req.body;
        const createUser = new RegisterEntriesServices;
        const register = await createUser.execute({codigo})

        return res.json(register);

    }
}

export default RegisterEntriesController;