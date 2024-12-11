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

        const userAlreadyExists = await prismaClient.usuario.findFirst({
            where: {
                email
            }
        });

        if(userAlreadyExists){
            throw new Error('Usuário já existe');
        }

        
        //Gerador de código (4XB1)
       const codigo_random = function makeid(length: any) {

        let result = '';
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const allCharacters = letters + numbers;
        const allCharactersLength = allCharacters.length;
      
        result += numbers.charAt(Math.floor(Math.random() * numbers.length));
      
        for (let i = 1; i < length; i++) {
          result += allCharacters.charAt(Math.floor(Math.random() * allCharactersLength));
        }
        result = result.split('').sort(() => Math.random() - 0.5).join('');
      
        return result;
      }
      

       const register =  await prismaClient.usuario.create({
            data: {
                nome: name,
                email: email,
                codigo: codigo_random(4)
            },
            select:{
                nome: true,
                email: true,
                codigo:true,
                id: true
            }
        });


        return register;

    }
}

export default RegisterUserService;