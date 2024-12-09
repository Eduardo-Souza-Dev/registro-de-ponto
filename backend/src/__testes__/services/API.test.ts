import RegisterUserService from "../../services/RegisterUserService";
import prismaClient from "../../prisma_connection";
import {describe, expect, test, it, jest, afterEach} from '@jest/globals';

jest.mock("../../prisma_connection", () => ({
  usuario: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}));

interface MockUsuario {
  email: string;
}

describe("API_services", () => {
    const service = new RegisterUserService();
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("Deve retornar um throw informando que o nome e e-mail são obrigatórios", async () => {
      await expect(service.execute({ name: "", email: "" }))
        .rejects
        .toThrow("Nome/E-mail é obrigatório");
    });

    // it("should throw an error if email already exists", async () => {
    //   // Simula que o e-mail já existe (retorno de findUnique)
    //   (prismaClient.usuario.findUnique as jest.Mock<Promise<MockUsuario>>).mockResolvedValueOnce({
    //     email: "test@example.com",
    //   });// Aqui estamos forçando o tipo como um Partial de Usuario
    
    //   // Testa se o serviço lança o erro correto
    //   await expect(service.execute("test@example.com"))
    //     .rejects
    //     .toThrow("Usuário já existe");
    // });

    // it("should create a new user if email does not exist", async () => {
    //   (prismaClient.usuario.findUnique as jest.Mock).mockResolvedValueOnce(null);
    //   (prismaClient.usuario.create as jest.Mock).mockResolvedValueOnce({
    //     id: 1,
    //     nome: "Test User",
    //     email: "test@example.com",
    //   });
  
    //   const result = await service.execute({ name: "Test User", email: "test@example.com" });
  
    //   expect(prismaClient.usuario.findUnique).toHaveBeenCalledWith({
    //     where: { email: "test@example.com" },
    //   });
    //   expect(prismaClient.usuario.create).toHaveBeenCalledWith({
    //     data: { nome: "Test User", email: "test@example.com" },
    //     select: { nome: true, email: true, id: true },
    //   });
    //   expect(result).toEqual({
    //     id: 1,
    //     nome: "Test User",
    //     email: "test@example.com",
    //   });
    // });
  });