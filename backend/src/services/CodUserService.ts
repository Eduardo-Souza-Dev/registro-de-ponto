import prismaClient from "../prisma_connection";

interface Codigo {
    codigo: string;
}
  
class CodUserService{
    async execute({codigo}: Codigo){

        if(codigo === ''){
            throw new Error('Código é obrigatório');
        }

        const codigoUser = await prismaClient.usuario.findFirst({
            where: {
                codigo
            }
        })

        if(!codigoUser){
            throw new Error('Código inválido');
        }

        return codigoUser;


    }
}

export default CodUserService;