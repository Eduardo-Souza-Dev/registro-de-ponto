import { Request, Response } from "express";
import VerifiUserHourService from "../services/VerifyUserHourServices";

class VerifiUserHourController {
    async handle(req: Request, res: Response){
        const { id } = req.body;

        const verifyUserHourService = new VerifiUserHourService();
        const verify = await verifyUserHourService.execute({id});
        res.json(verify);

    }
}

export default VerifiUserHourController;