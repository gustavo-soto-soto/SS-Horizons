import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { connectDB } from "@/db/mongodb"
import User from "@/db/models/user"
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  providers: [
    Credentials({
        name: 'credentials',
        credentials: {
          username: { label: 'username', type: 'string', placeholder: 'Username...' },
          password: { label: 'password', type: 'password', placeholder: 'Password...' }
        },
        async authorize(credentials, req) {
          await connectDB()
          
          const { username, password } = credentials

          const userFound = await User.findOne( { username: username } )

          if (!userFound) throw new Error("Invalid credentials")

          const passwordMatch = await bcrypt.compare(password, userFound.password)

          if (!passwordMatch) throw new Error("Invalid credentials")

          return userFound
        }
    })
  ] ,
  callbacks: {
    jwt ( { account, token, user, profile, session } ) { //BACKEND
      if (user) token.user = user //INCLUDES USER ATRIBUTES IN TOKEN 
      return token
    },
    session ( { session, token, user } ){ //FRONT END
      session.user = token.user //INCLUDES USER ATRIBUTES IN THE BROWSER FRONT END DATA
      return session
    },
  },
  pages: { //REWRITES NEXT AUTH PAGES FOR CUSTOM PAGE
    signIn: "/login",
    signOut: "/"
  }
})

export { handler as GET, handler as POST }