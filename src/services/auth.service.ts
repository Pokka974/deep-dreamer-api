import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET as string;

interface AuthPayload {
    email: string;
    password: string;
}

interface RegisterPayload extends AuthPayload {
    provider: string;
}

export const register = async ({
    email,
    password,
    provider = 'local',
}: RegisterPayload) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            provider,
        },
    });

    const token = jwt.sign(
        { userId: user.id, email: user.email, provider: user.provider },
        JWT_SECRET,
        { expiresIn: '1h' },
    );
    return { user, token };
};

export const login = async ({ email, password }: AuthPayload) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (
        !user?.password ||
        user.provider !== 'local' ||
        !(await bcrypt.compare(password, user.password))
    ) {
        throw new Error('Incorrect email or password');
    }
    const token = jwt.sign(
        { userId: user.id, email: user.email, provider: user.provider },
        JWT_SECRET,
        { expiresIn: '1h' },
    );
    return { user, token };
};
