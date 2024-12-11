import prismaClient from "../prisma_connection";

interface IdUser {
    id: number;
}
  
class RegisterEntriesService{
    async execute({id}: IdUser){

        // if(id === ''){
        //     throw new Error('ID inválido!');
        // }

        const turnoUser = await prismaClient.turno.create({
            data: {
                usuarioId: id,
                inicio: new Date()
            }
        })

        return turnoUser;


    }
}

export default RegisterEntriesService;