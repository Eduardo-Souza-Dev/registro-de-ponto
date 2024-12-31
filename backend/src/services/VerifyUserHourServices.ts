import prismaClient from "../prisma_connection";

interface idTurno{
    id: number;
}

// Essa API faz o calculo da duração de horas do turno
class VerifiUserHourService{
    async execute( { id }: idTurno ){

        if(!id){
            throw new Error('ID inválido!');
        }

        const verifyUserHour = await prismaClient.turno.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                usuarioId: true,
                inicio: true,
                duracaoHoras: true,
                fim: true
            }
        })

        if(!verifyUserHour) throw new Error('Turno não encontrado!');

        if(verifyUserHour.id){

            if(verifyUserHour.fim){

                const timeFim = verifyUserHour.fim.getTime();
                const timeInicio = verifyUserHour.inicio.getTime();
                let minutes = 1000 * 60;
                let hours = minutes * 60;

                const updateUserHour = await prismaClient.turno.update({
                    where:{
                        id: id
                    },
                    data:{
                        duracaoHoras: Math.round(timeFim / hours) - Math.round(timeInicio / hours),
                    }

                })

                console.log("Valor de updateUserHour: " , updateUserHour?.duracaoHoras);

                if(updateUserHour?.duracaoHoras){
                    return "Duração de horas atualizada com sucesso!";
                }
            }

        }else{
            return "Id não identificado!";
        }
        


    }
}

export default VerifiUserHourService