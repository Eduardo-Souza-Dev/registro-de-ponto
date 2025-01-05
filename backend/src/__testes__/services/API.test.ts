import RegisterUserService from "../../services/RegisterUserService";
import ConsultUserService from "../../services/ConsultUserService";
import RegisterEntriesService from "../../services/RegisterEntriesServices";
import RegisterExitService from "../../services/RegisterExitService";
import AllPointsServices from "../../services/AllPointsServices";
import VerifyPointServices from "../../services/VerifyPointServices";
import VerifiUserHourService from "../../services/VerifyUserHourServices";

import prismaClient from "../../prisma_connection";
import {describe, expect, test, it, jest, afterEach} from '@jest/globals';

jest.mock("../../prisma_connection", () => ({
  usuario: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
  },
  turno: {
    findFirst: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
}));


describe("API_services", () => {
    const serviceRegister = new RegisterUserService();
    const serviceConsult  = new ConsultUserService();
    const serviceRegisterEntries = new RegisterEntriesService();
    const serviceRegisterExit = new RegisterExitService();
    const serviceAllPoints = new AllPointsServices();
    const verifyPoints = new VerifyPointServices();
    const verifyUserHour = new VerifiUserHourService();
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  

    // Teste de registro de usuário
    it("Deve retornar um throw informando que o nome e e-mail são obrigatórios", async () => {
      await expect(serviceRegister.execute({ name: "", email: "" }))
        .rejects
        .toThrow("Nome/E-mail é obrigatório");
    });

    it("Deve retornar se um email já existe", async () => {
      // Simula que o e-mail já existe (retorno de findUnique)
      const email = "email@example.com";
      (prismaClient.usuario.findFirst as jest.Mock<never>).mockResolvedValueOnce({
        name:"Teste",
        email: email,
      });// Aqui estamos forçando o tipo como um Partial de Usuario

      // Testa se o serviço lança o erro correto
      await expect(serviceRegister.execute({ name: "Teste", email:email }))
        .rejects
        .toThrow("Usuário já existe");
    });

    
    // Teste de Consulta de email
    it("Deve retornar um throw informando que o campo e-mail não pode ser vazio", async () => {
      await expect(serviceConsult.execute({ email: "" }))
        .rejects
        .toThrow("E-mail não pode ser vazio");
    });

    // Teste de Consulta de código
    it('Testa se o Id fornecido é inválido', async () => {
      await expect(serviceRegisterEntries.execute({id: undefined as unknown as number })).rejects.toThrow('ID inválido!');
    });

    // Teste de ID 
    it("Deve lançar um erro se o ID do turno não for fornecido", async () => {
      await expect(serviceRegisterExit.execute({ id: undefined as unknown as number })).rejects.toThrow("ID inválido!");
    });


    it('Deve lançar um erro se o ID do usuário não for fornecido', async () => {
      await expect(serviceAllPoints.execute({ user_id: undefined as unknown as number })).rejects.toThrow('Usuário não informado/inválido!');
    });

    it('Deve retornar os pontos registrados pelo usuário', async () => {
      // Mockando o retorno do prismaClient
      const mockPoints = [
        { id: 1, usuarioId: 1, inicio: new Date(), fim: new Date(), usuario: { nome: 'Test User' } },
        { id: 2, usuarioId: 1, inicio: new Date(), fim: new Date(), usuario: { nome: 'Test User' } },
      ];
  
      (prismaClient.turno.findMany as jest.Mock<never>).mockResolvedValueOnce(mockPoints);
  
      const result = await serviceAllPoints.execute({ user_id: 1 });
  
      expect(result).toEqual(mockPoints); // Verifica se o retorno é igual ao mock
      expect(prismaClient.turno.findMany).toHaveBeenCalledWith({
        where: { usuarioId: 1 },
        include: { usuario: true },
        take: 10,
      });
    });


    it('Deve me retornar se que o id do usuário é inválido',async () =>{
      await expect(verifyPoints.execute({ id: undefined as unknown as number, data_inicio:new Date(), data_fim: new Date() })).rejects.toThrow('ID inválido!');
    });

    it("Deve me dar o return se tem data inicio já está registrada e data fim esta nulla", async ()=>{
      const date = new Date(2024,11,16)

        const mockQuery = {
          usuarioId: 3,
          data_inicio: date,
          data_fim: new Date(9999,11,12),
        };
      
        (prismaClient.turno.findFirst as jest.Mock<never>).mockResolvedValueOnce({
          usuarioId: mockQuery.usuarioId,
          inicio: date,
          fim: new Date(9999,11,12),
        });

        const resultado = await verifyPoints.execute({ id: mockQuery.usuarioId, data_inicio: mockQuery.data_inicio, data_fim: null });

        expect(resultado).toBe("Data inicio já registrada");

        expect(prismaClient.turno.findFirst).toHaveBeenCalledWith({
          where: {
            usuarioId: mockQuery.usuarioId,
            OR: [
              {
                inicio: {
                  gte: mockQuery.data_inicio
                }
              },
              {
                fim: {
                  gte: mockQuery.data_fim
                }
              },
            ]
          },
          select: {
            id: true,
            usuarioId: true,
            fim: true,
            inicio: true,
          }
        });


      });


      it("Deve me dar o return se tem data fim já está registrada e data inicio esta nulla", async ()=>{
        const date = new Date(2024,11,16)
  
          const mockQuery = {
            usuarioId: 3,
            data_inicio: new Date(9999,11,12),
            data_fim: date,
          };
        
          (prismaClient.turno.findFirst as jest.Mock<never>).mockResolvedValueOnce({
            usuarioId: mockQuery.usuarioId,
            inicio: new Date(9999,11,12),
            fim: date,
          });
  
          const resultado = await verifyPoints.execute({ id: mockQuery.usuarioId, data_inicio: null, data_fim: mockQuery.data_fim });
  
          expect(resultado).toBe("Data fim já registrada");
  
          expect(prismaClient.turno.findFirst).toHaveBeenCalledWith({
            where: {
              usuarioId: mockQuery.usuarioId,
              OR: [
                {
                  inicio: {
                    gte: mockQuery.data_inicio
                  }
                },
                {
                  fim: {
                    gte: mockQuery.data_fim
                  }
                },
              ]
            },
            select: {
              id: true,
              usuarioId: true,
              fim: true,
              inicio: true,
            }
          });
  
  
        });

        it("Deve me dar o return se tem data fim e a data inicio já registradas", async ()=>{
          const date = new Date(2024,11,16)
    
            const mockQuery = {
              usuarioId: 3,
              data_inicio: date,
              data_fim: date,
            };
          
            (prismaClient.turno.findFirst as jest.Mock<never>).mockResolvedValueOnce({
              usuarioId: mockQuery.usuarioId,
              inicio: date,
              fim: date,
            });
    
            const resultado = await verifyPoints.execute({ id: mockQuery.usuarioId, data_inicio: mockQuery.data_fim, data_fim: mockQuery.data_fim });
    
            expect(resultado).toBe("Ambas as datas registradas");
    
            expect(prismaClient.turno.findFirst).toHaveBeenCalledWith({
              where: {
                usuarioId: mockQuery.usuarioId,
                OR: [
                  {
                    inicio: {
                      gte: mockQuery.data_inicio
                    }
                  },
                  {
                    fim: {
                      gte: mockQuery.data_fim
                    }
                  },
                ]
              },
              select: {
                id: true,
                usuarioId: true,
                fim: true,
                inicio: true,
              }
            });
    
    
          });

          it("Deve me dar o return que nenhuma data foi informada", async ()=>{      
              const mockQuery = {
                usuarioId: 3,
                data_inicio: new Date(9999,11,12),
                data_fim: new Date(9999,11,12),
              };
            
              (prismaClient.turno.findFirst as jest.Mock<never>).mockResolvedValueOnce({
                usuarioId: mockQuery.usuarioId,
                inicio: new Date(9999,11,12),
                fim: new Date(9999,11,12),
              });
      
              const resultado = await verifyPoints.execute({ id: mockQuery.usuarioId, data_inicio: mockQuery.data_fim, data_fim: mockQuery.data_fim });
      
              expect(resultado).toBe("Nenhuma data registrada");
      
              expect(prismaClient.turno.findFirst).toHaveBeenCalledWith({
                where: {
                  usuarioId: mockQuery.usuarioId,
                  OR: [
                    {
                      inicio: {
                        gte: mockQuery.data_inicio
                      }
                    },
                    {
                      fim: {
                        gte: mockQuery.data_fim
                      }
                    },
                  ]
                },
                select: {
                  id: true,
                  usuarioId: true,
                  fim: true,
                  inicio: true,
                }
              });
      
      
            })


            it("Deve me retornar que o Update de duração de horas do turno do usuário foi atualizado com sucesso", async ()=>{
              const dataInicio = new Date("December 26, 2024 08:02:00");
              const dataFim = new Date("December 26, 2024 17:05:00");
              let minutes = 1000 * 60;
              let hours = minutes * 60;

              (prismaClient.turno.findFirst as jest.Mock<never>).mockResolvedValueOnce({
                id: 7,
                inicio: dataInicio,
                fim: dataFim,
              });

              (prismaClient.turno.update as jest.Mock<never>).mockResolvedValueOnce({
                id: 7,
                usuarioId: 3,
                inicio: dataInicio,
                fim: dataFim,
                duracaoHoras: Math.round(dataFim.getTime() / hours) - Math.round(dataInicio.getTime() / hours),
              });

              const resultado = await verifyUserHour.execute({ id: 7 });

              expect(resultado).toBe("Duração de horas atualizada com sucesso!");

            })
    
  });

