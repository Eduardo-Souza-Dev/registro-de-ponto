import prismaClient from "../prisma_connection";

interface UserRequestBody {
    name: string;
    email: string;
}
 
class RegisterUserService{
    async execute({name,email}: UserRequestBody){

        if(name === '' || email === ''){
            throw new Error('Nome/E-mail é obrigatório');
        }

        const userAlreadyExists = await prismaClient.usuario.findUnique({
            where: {
                email
            }
        });

        if(userAlreadyExists){
            throw new Error('Usuário já existe');
        }

       const register =  await prismaClient.usuario.create({
            data: {
                nome: name,
                email: email
            },
            select:{
                nome: true,
                email: true,
                id: true
            }
        });


        return register;

    }
}

export default RegisterUserService;