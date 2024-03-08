import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  providers: [Credentials({
    name: 'Auth using magic link',
    credentials: {
      token: { label: "Token", type: "text" }
    },
    async authorize(credentials, req) {
      console.log('cred: ', credentials)

      const user = { id: "1", name: "user", email: "user@email.com", token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzcmluZXNoYUBvcmxpLnRlY2giLCJpYXQiOjE3MDk3ODg2MjIsImV4cCI6MTcwOTk2MTQyMiwiaXNzIjoic3JpbmVzaGFAb3JsaS50ZWNoIn0.2HMlv5oRAQOP1O8h2OqAXuENKoDGV6CvQ-3yNylqyYI' }

      if (user) {
        return user
      }

      return null;
    }
  })],
  session: { strategy: 'jwt' }
})
