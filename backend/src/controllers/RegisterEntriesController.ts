import { Request,Response } from "express";
import RegisterEntriesServices from "../services/RegisterEntriesServices";

class RegisterEntriesController{
    async handle(req: Request, res: Response){
        const { id } = req.body;
        const registerEntries = new RegisterEntriesServices;
        const entries = await registerEntries.execute({id})

        return res.json(entries);

    }
}

export default RegisterEntriesController;