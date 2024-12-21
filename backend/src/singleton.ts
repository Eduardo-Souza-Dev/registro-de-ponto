import prismaClient from "./prisma_connection";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import { PrismaClient } from "@prisma/client";

jest.mock('./prisma_connection', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),

}))

beforeAll(() =>{
    mockReset(prismaMock);
})

export const prismaMock = prismaClient as unknown as DeepMockProxy<PrismaClient>;