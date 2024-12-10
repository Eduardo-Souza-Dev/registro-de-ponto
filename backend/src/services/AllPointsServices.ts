import prismaClient from "../prisma_connection";

interface Client{
    user_id: number;
}

class AllPointsServices{
    async execute({user_id}: Client){

        if(!user_id){
            throw new Error('Usuário não informado/inválido!');
        } 

        const points = await prismaClient.turno.findMany({
            where: {
                usuarioId: user_id
            },
            include: {
                usuario: true
            },
            take: 10 
        });

        return points;
    }
}

export default AllPointsServices;