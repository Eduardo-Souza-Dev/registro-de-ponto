import RegisterUserService from "../../services/RegisterUserService";
import ConsultUserService from "../../services/ConsultUserService";
import RegisterEntriesService from "../../services/RegisterEntriesServices";
import RegisterExitService from "../../services/RegisterExitService";
import AllPointsServices from "../../services/AllPointsServices";
import VerifyPointServices from "../../services/VerifyPointServices";
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
    findMany: jest.fn()
  },
}));

interface MockUsuario {
  email: string;
}

describe("API_services", () => {
    const serviceRegister = new RegisterUserService();
    const serviceConsult  = new ConsultUserService();
    const serviceRegisterEntries = new RegisterEntriesService();
    const serviceRegisterExit = new RegisterExitService();
    const serviceAllPoints = new AllPointsServices();
    const verifyPoints = new VerifyPointServices();
  
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
      await expect(verifyPoints.execute({ id_turno: undefined as unknown as number })).rejects.toThrow('ID inválido!');
    })

    it("Deve me dar o return se tem data de inicio já registrada", async ()=>{
           // Simula que o e-mail já existe (retorno de findUnique)
      const id_turno = 1;

      (prismaClient.usuario.findFirst as jest.Mock<never>).mockResolvedValueOnce({
        id_turno:1,
        inicio: null,
        fim: new Date(),
      });// Aqui estamos forçando o tipo como um Partial de Usuario

      // Testa se o serviço lança o erro correto
      await expect(verifyPoints.execute({ id_turno: id_turno})).toBe("Data fim já registrada")
    })

    it("Deve me dar o return se tem data fim já está registrada", async ()=>{
            // Simula que o e-mail já existe (retorno de findUnique)
      const id_turno = 1;

      (prismaClient.usuario.findFirst as jest.Mock<never>).mockResolvedValueOnce({
        id_turno:1,
        inicio: new Date(),
        fim: null,
      });// Aqui estamos forçando o tipo como um Partial de Usuario

      // Testa se o serviço lança o erro correto
      await expect(verifyPoints.execute({ id_turno: id_turno})).toBe("Data fim já registrada")
      })


      it("Deve me dar o return ambas as datas já estão registradas", async ()=>{
        // Simula que o e-mail já existe (retorno de findUnique)
        const id_turno = 1;

        (prismaClient.usuario.findFirst as jest.Mock<never>).mockResolvedValueOnce({
          id_turno:1,
          inicio: new Date(),
          fim: new Date(),
        });// Aqui estamos forçando o tipo como um Partial de Usuario

        // Testa se o serviço lança o erro correto
        await expect(verifyPoints.execute({ id_turno: id_turno})).toBe("Data fim já registrada")
      })



    
  });

