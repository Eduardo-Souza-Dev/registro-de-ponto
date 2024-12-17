import prismaClient from "../prisma_connection";

interface IdUser {
    id: number;
}
  
class RegisterEntriesService{
    async execute({id}: IdUser){

        if(!id){
            throw new Error('ID inválido!');
        }

        const now = new Date();
        const startOfDay = new Date(now.getFullYear(),now.getMonth(), now.getDate())

        const turnoUser = await prismaClient.turno.create({
            data: {
                usuarioId: id,
                inicio: new Date()
            },
            select:{
                id:true,
                inicio:true
            }
        })

        return turnoUser;


    }
}

export default RegisterEntriesService;