import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDb } from "@/utils/database";
import { User } from "@/models/User";

// Define a type for the User model
interface UserModel {
  _id: string;
  email: string;
  username: string;
  image?: string;
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async session({ session }: { session: any }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email }) as UserModel;
      
      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      }

      return session;
    },
    async signIn({ account, profile }: { 
      account: any, 
      profile?: any 
    }) {
      try {
        await connectToDb();

        if (!profile?.email) {
          return false;
        }

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email }) as UserModel | null;

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name?.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error: unknown) {
        console.log("Error checking if user exists: ", 
          error instanceof Error ? error.message : "Unknown error"
        );
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };