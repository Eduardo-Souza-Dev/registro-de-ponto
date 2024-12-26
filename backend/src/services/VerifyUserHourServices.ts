import prismaClient from "../prisma_connection";

interface idTurno{
    id_turno: number;
}

class VerifiUserHourService{
    async execute( { id_turno }: idTurno ){

        if(!id_turno){
            throw new Error('ID inválido!');
        }

        const verifyUserHour = await prismaClient.turno.findFirst({
            where: {
                id: id_turno
            },
            select: {
                id: true,
                usuarioId: true,
                inicio: true,
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
                        id: id_turno
                    },
                    data:{
                        duracaoHoras: Math.round(timeInicio / hours) - Math.round(timeFim / hours),
                    }

                })

                if(updateUserHour){
                    return "Duração de horas atualizada com sucesso!";
                }
            }

        }


    }
}

export default VerifiUserHourService