import prismaClient from "../prisma_connection";

interface IdTurno {
    id_turno: number;
}

class VerifyPointServices{
    async execute({id_turno}: IdTurno){
        if(!id_turno){
            throw new Error('ID inválido!');
        }

        const now = new Date();
        const startOfDay = new Date(now.getFullYear(),now.getMonth(), now.getDate())

        const verifyPoint = await prismaClient.turno.findFirst({
                where: {
                    AND: [
                        {id: id_turno}, 
                    ], 
                    OR: [
                        {
                            fim: {
                                gte: startOfDay
                            }
                        },
                        {
                            inicio: {
                                gte: startOfDay
                            }
                        },
                    ]
                },
                select: {
                    id: true,
                    usuarioId: true,
                    fim: true,
                    inicio: true,
                }
            })


            if(verifyPoint?.inicio != null){
                return {
                    message: "Data de inicio já registrada"
                }
            }else if(verifyPoint?.usuarioId != null){
                return  "Data fim já registrada";
            }else if(verifyPoint?.inicio != null && verifyPoint?.fim != null){
                return {
                    message: "Ambas as datas registradas" 
                }
            }
    }

}

export default VerifyPointServices;