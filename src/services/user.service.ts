import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findUserById = async (id: number) => {
    return await prisma.user.findUnique({
        where: { id },
    });
};

export const findAllUsers = async () => {
    return await prisma.user.findMany();
};

export const updateUserById = async (
    id: number,
    email: string,
    provider: string,
    providerId?: string,
) => {
    return await prisma.user.update({
        where: { id },
        data: { email, provider, providerId },
    });
};

export const deleteUserById = async (id: number) => {
    return await prisma.user.delete({
        where: { id },
    });
};
