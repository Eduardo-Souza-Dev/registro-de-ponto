import prismaClient from "../prisma_connection";

interface Codigo {
    codigo: string;
}
  
class RegisterEntriesService{
    async execute({codigo}: Codigo){

        if(codigo === ''){
            throw new Error('Código é obrigatório');
        }

        
    }
}

export default RegisterEntriesService;