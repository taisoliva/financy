import { create } from "zustand"
import { persist } from "zustand/middleware"
import { apolloClient } from "@/lib/graphql/apollo"
import type { LoginInput, RegisterInput, User } from "@/shared/types"
import { LOGIN } from "@/lib/graphql/mutations/login"
import { REGISTER } from "@/lib/graphql/mutations/register"

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  signup: (data: RegisterInput) => Promise<boolean>
  login: (data: LoginInput) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>() (
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        login: async (loginData: LoginInput) => {
          try{
              const { data } = await apolloClient.mutate({
                mutation: LOGIN,
                variables: {
                  data: {
                    email: loginData.email,
                    password: loginData.password
                  }
                }
              })

              if(data?.login?.access_token){
                set({
                  token: data.login.access_token,
                  isAuthenticated: true
                  // user info might need a separate query since the new schema only returns access_token in Auth response
                })
                return true
              }
              return false
          }catch(error){
            console.log("Erro ao fazer o login")
            throw error
          }
        },
        signup: async (registerData: RegisterInput) => {
          try{
              const { data } = await apolloClient.mutate({
                mutation: REGISTER,
                variables: {
                  data: {
                      fullName: registerData.name,
                      email: registerData.email,
                      password: registerData.password
                  }
                }
              })
              if(data?.createUser){
                const user = data.createUser
                set({
                  user: {
                    id: user.id,
                    name: user.fullName,
                    email: user.email,
                    role: 'USER', // default role
                    createdAt: new Date().toISOString(), // Mocking date since it's missing in new schema output temporarily
                    updatedAt: new Date().toISOString()
                  },
                  // no token available on signup in new schema, maybe user has to login next
                  isAuthenticated: false
                })
                return true
              }
              return false
          }catch(error){
            console.log("Erro ao fazer o cadastro")
            throw error
          }
        },
        logout: () => {
          set({
            user:null,
            token: null,
            isAuthenticated: false
          })
          apolloClient.clearStore()
        },
      }),
      {
        name: 'auth-storage'
      }
    )
)