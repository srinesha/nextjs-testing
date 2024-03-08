'use server'

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const loginIn = async (values: { token: string }) => {
  try {
    await signIn("credentials", {
      token: values.token,
      redirectTo: '/settings'
    })

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }

    throw error;
  }
}
