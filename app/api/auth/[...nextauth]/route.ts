import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handlerGoogle = NextAuth({
    providers: [
        GoogleProvider({
            clientId: 'process.env.GOOGLE_ID as string',
            clientSecret: 'process.env.GOOGLE_SECRET as string',
        })
    ]
})

export { handlerGoogle as GET, handlerGoogle as POST };