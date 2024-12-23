import prismaClient from "../prisma_connection";

interface IdTurno {
    usuarioId: number;
    data_inicio: Date | null;
    data_fim: Date | null;
}

class VerifyPointServices{
    async execute({usuarioId, data_inicio, data_fim}: IdTurno){
        if(!usuarioId){
            throw new Error('ID inválido!');
        }

        let dateStringInicio;
        let dateStringFim;

        if(data_inicio !== null){
            const startOfDay = new Date(data_inicio.getFullYear(),data_inicio.getMonth(), data_inicio.getDate())
            dateStringInicio = startOfDay.toISOString().split('T')[0]
        }
        
        if(data_fim !== null){
            const endOfDay = new Date(data_fim.getFullYear(),data_fim.getMonth(), data_fim.getDate());
            dateStringFim = endOfDay.toISOString().split('T')[0]
        }
        
        
        const verifyPoint = await prismaClient.turno.findFirst({
                where: {
                    usuarioId: usuarioId,
                        OR: [

                            {
                                inicio: {
                                    gte: dateStringInicio
                                }
                            },
                            {
                                fim: {
                                    gte: dateStringFim
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

            console.log('Value verifyPoint: ' + verifyPoint?.id);


            if(verifyPoint?.inicio){
                return "Data inicio já registrada"
            }

            if(verifyPoint?.fim){
                return  "Data fim já registrada";
            }
            
            if(verifyPoint?.inicio && verifyPoint?.fim){
                return "Ambas as datas registradas" 
            }

            return "Nenhum valor registrado";
    }

}

export default VerifyPointServices;