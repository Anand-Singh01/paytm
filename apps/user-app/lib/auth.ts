import { prisma } from '@repo/db/client';
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInSchema } from "./zod/validation";

export const options = {
    providers:[
        CredentialsProvider({
            name:'Credentials',
            credentials:{
                phone:{label:'Phone Number', type:'text', placeholder:'xxx-xxx-xxxx'},
                password:{label:'Password', type:'password', placeholder:'password'}
            },
            async authorize(credentials: any)
            {
                const { password, phone } = credentials;
                const obj = { phone, password };
                const result = signInSchema.safeParse(obj);
                if (!result.success) {
                    return null;
                }
                try {
                    const existingUser = await prisma.user.findFirst({
                        where: {
                            number: phone
                        }
                    });
                    if (!existingUser) {
                        return null;
                    }
                    const passwordMatch = await compare(password, existingUser.password);
                    if (passwordMatch) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.email
                        };
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error("Error during user authentication:", error);
                    return null;
                }
            }
        })
    ],
    pages:{
        signIn:'/pages/auth/signin'
    },
    secret: process.env.JWT_SECRET || "686e8810-c15a-469e-825a-5ad90bf1879a",
    callbacks:{
        async session({ token, session } : any){
            session.user.id = token.sub; 
            return session;
        }
    }
};
