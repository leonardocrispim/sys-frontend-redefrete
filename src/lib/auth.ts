import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { getUserLogin } from "@lib/users/getUsers";

//

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await getUserLogin(
          credentials?.username as string,
          credentials?.password as string
        );

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const data = token.userdata;
      const { userdata, ...newSession } = session;

      return { userdata: token.userdata, ...newSession };
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        token.userdata = user;
      }
      return token;
    },
  },
};
