import { Request, Response } from "express";
import AllPointsServices from "../services/AllPointsServices";

class AllPointsController {
    async handle(req: Request, res: Response) {
        const { user_id } = req.body;
        const allPoints = new AllPointsServices;
        const points = await allPoints.execute({user_id});

        return res.json(points);
    }
}

export default AllPointsController;