import prismaClient from "../prisma_connection";

interface IdTurno {
    id: number;
    data_inicio: Date | null;
    data_fim: Date | null;
}

// Essa API verifica se tem alguma data de inicio ou de fim já registrada
class VerifyPointServices{
    async execute({id, data_inicio, data_fim}: IdTurno){
        if(!id){
            throw new Error('ID inválido!');
        }

        let dateStringInicio;
        let dateStringFim;
        const error = new Date(9999,11,12);

        if(data_inicio !== null){
            const startOfDay = new Date(data_inicio.getFullYear(),data_inicio.getMonth(), data_inicio.getDate())
            dateStringInicio = startOfDay.toISOString().split('T')[0]
        }else{
            dateStringInicio = error;
        }
        
        if(data_fim !== null){
            const endOfDay = new Date(data_fim.getFullYear(),data_fim.getMonth(), data_fim.getDate());
            dateStringFim = endOfDay.toISOString().split('T')[0]
        }else{
            dateStringFim = error;
        }
        
        
        const verifyPoint = await prismaClient.turno.findFirst({
                where: {
                    usuarioId: id,
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

            if(verifyPoint?.inicio && verifyPoint?.fim){
                // Basicamente estou verificando se a data de inicio e fim existem
                // e se são diferentes da data erro, era pra ser null mas não foi aceito
                           
                if(new Date(verifyPoint?.inicio).getTime() !== error.getTime() && new Date(verifyPoint?.fim).getTime() !== error.getTime()){
                    return "Ambas as datas registradas";
                }

                if(new Date(verifyPoint?.inicio).getTime() !== error.getTime()){
                    return "Data inicio já registrada";
                }

                if(new Date(verifyPoint?.fim).getTime() !== error.getTime()){
                    return  "Data fim já registrada";
                }
     

            }

            return 'Nenhuma data informada!';
    }

}

export default VerifyPointServices;