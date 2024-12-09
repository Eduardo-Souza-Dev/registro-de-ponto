import prismaClient from "../prisma_connection";

interface UserRequestBody {
    email: string;
}
 
class ConsultUserService{
    async execute({email}: UserRequestBody){
    
        if(email === ''){
            throw new Error('E-mail não pode ser vazio');
        }

        const UserFind = await prismaClient.usuario.findFirst({
            where: {
                email
            }
        })

        return UserFind;
    }

}

export default ConsultUserService