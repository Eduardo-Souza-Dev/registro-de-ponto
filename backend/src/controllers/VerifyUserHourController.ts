import { Request, Response } from "express";
import VerifiUserHourService from "../services/VerifyUserHourServices";

class VerifiUserHourController {
    async handle(req: Request, res: Response){
        const { id_turno } = req.body;

        const verifyUserHourService = new VerifiUserHourService();
        const verify = await verifyUserHourService.execute({id_turno});
        res.json(verify);

    }
}

export default VerifiUserHourController;