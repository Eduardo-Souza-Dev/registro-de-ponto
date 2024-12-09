import { Request,Response } from "express";
import RegisterUserService from "../services/RegisterUserService";

class RegisterUserController{
    async handle(req: Request, res: Response){
        const { name, email } = req.body;
        const createUser = new RegisterUserService;
        const register = await createUser.execute({name, email})

        return res.json(register);

    }
}


