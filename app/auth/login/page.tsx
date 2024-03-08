'use client'

import { loginIn } from "@/actions/login"
import { FormEvent } from "react"

const LoginPage = () => {

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    await loginIn({
      token: 'callback_token'
    })
  }

  return <div>
    <form onSubmit={onSubmit}>
      <label>Email:</label>
      <input type="email" name="email" />
      <button>Submit</button>
    </form>
  </div>
}

export default LoginPage
