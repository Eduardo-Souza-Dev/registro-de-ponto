import prismaClient from "../prisma_connection";

interface IdTurno {
    id_turno: number;
    date: Date;
}

class VerifyPointServices{
    async execute({id_turno, date}: IdTurno){
        if(!id_turno){
            throw new Error('ID inválido!');
        }

        // date = new Date();
        const startOfDay = new Date(date.getFullYear(),date.getMonth(), date.getDate())

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

            console.log(verifyPoint);


            if(verifyPoint?.inicio != null){
                return "Data de inicio já registrada"
            }

            if(verifyPoint?.usuarioId != null){
                return  "Data fim já registrada";
            }
            
            if(verifyPoint?.inicio != null && verifyPoint?.fim != null){
                return "Ambas as datas registradas" 
            }

            return date;
    }

}

export default VerifyPointServices;