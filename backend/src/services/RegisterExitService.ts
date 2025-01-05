import prismaClient from "../prisma_connection";


interface IdUser {
    id: number;
}

class RegisterExitService{
    async execute({id}: IdUser){
        if(!id){
            throw new Error('ID inválido!');
        }

        const findTurno = await prismaClient.turno.findUnique({
            where: {
              id: id,
            },
        });

        if(!findTurno){
            throw new Error('Registro não encontrado!');
        }

        const now = new Date();
        const dataDoBanco = "0000-00-00T00:00:00.000Z";

        const verifyDate = await prismaClient.turno.findFirst({
          where: {
            id: id,
          },
          select:{
            inicio: true,
          }
        })

        if(verifyDate?.inicio){
          console.log("Valor de data de inicio: " + verifyDate?.inicio.getTime());
          console.log("Valor de data sendo enviada agora: " + now.getTime());
          if((verifyDate?.inicio.getTime() > now.getTime())){
            const turnoUser = await prismaClient.turno.update({
              where: {
                id: id,
              },
              data: {
                fim: dataDoBanco
              },
            });

             return turnoUser;
          }else{
            
            const turnoUser = await prismaClient.turno.update({
              where: {
                id: id,
              },
              data: {
                fim: new Date(),
              },
            });

            return turnoUser;
          }
          
        }


    }
}

export default RegisterExitService;