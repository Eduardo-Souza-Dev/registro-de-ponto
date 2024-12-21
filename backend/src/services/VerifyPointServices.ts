import prismaClient from "../prisma_connection";

interface IdTurno {
    usuarioId: number;
    date: Date;
}

class VerifyPointServices{
    async execute({usuarioId, date}: IdTurno){
        if(!usuarioId){
            throw new Error('ID inválido!');
        }

        const startOfDay = new Date(date.getFullYear(),date.getMonth(), date.getDate())
        const dateString = startOfDay.toISOString().split('T')[0]

        const verifyPoint = await prismaClient.turno.findFirst({
                where: {
                    usuarioId: usuarioId,
                        OR: [
                            {
                                fim: {
                                    gte: dateString
                                }
                            },
                            {
                                inicio: {
                                    gte: dateString
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

            console.log('Value verifyPoint: ' + verifyPoint);


            if(verifyPoint?.inicio){
                return "Data de inicio já registrada"
            }

            if(verifyPoint?.fim){
                return  "Data fim já registrada";
            }
            
            if(verifyPoint?.inicio && verifyPoint?.fim){
                return "Ambas as datas registradas" 
            }

            return verifyPoint;
    }

}

export default VerifyPointServices;