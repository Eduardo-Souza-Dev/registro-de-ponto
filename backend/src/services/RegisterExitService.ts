import prismaClient from "../prisma_connection";


interface IdUser {
    id_turno: number;
}

class RegisterExitService{
    async execute({id_turno}: IdUser){
        if(!id_turno){
            throw new Error('ID inválido!');
        }

        const findTurno = await prismaClient.turno.findUnique({
            where: {
              id: id_turno,
            },
        });

        if(!findTurno){
            throw new Error('Registro não encontrado!');
        }

        const turnoUser = await prismaClient.turno.update({
            where: {
              id: id_turno,
            },
            data: {
              fim: new Date(),
            },
          });

        return turnoUser;

    }
}

export default RegisterExitService;